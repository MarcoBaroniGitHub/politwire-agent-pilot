-- Dedicated pilot database only. No submitted code is executed.
CREATE SCHEMA IF NOT EXISTS pilot_private;
CREATE TABLE IF NOT EXISTS pilot_private.contributions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 fingerprint text NOT NULL UNIQUE CHECK(length(fingerprint)=64),
 receipt_hash text NOT NULL UNIQUE CHECK(length(receipt_hash)=64),
 payload jsonb NOT NULL CHECK(octet_length(payload::text)<=65536),
 status text NOT NULL DEFAULT 'received' CHECK(status IN ('received','reviewed','accepted','rejected')),
 created_at timestamptz NOT NULL DEFAULT now(),
 review_url text
);
CREATE TABLE IF NOT EXISTS pilot_private.buckets (
 key text NOT NULL, bucket_window text NOT NULL, hits integer NOT NULL,
 PRIMARY KEY(key,bucket_window)
);
CREATE OR REPLACE FUNCTION public.pilot_quota(k text,w text,ceiling integer)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = pg_catalog,pilot_private AS $$
DECLARE n integer;
BEGIN
 INSERT INTO pilot_private.buckets(key,bucket_window,hits) VALUES(k,w,1)
 ON CONFLICT(key,bucket_window) DO UPDATE SET hits=buckets.hits+1 WHERE buckets.hits<ceiling RETURNING hits INTO n;
 RETURN n IS NOT NULL;
END $$;
REVOKE ALL ON FUNCTION public.pilot_quota(text,text,integer) FROM PUBLIC;
CREATE OR REPLACE FUNCTION public.pilot_submit(p jsonb,f text,r text,client text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = pg_catalog,pilot_private AS $$
DECLARE contribution_id uuid;
BEGIN
 IF length(f)<>64 OR length(r)<>64 OR length(client)<>64 OR octet_length(p::text)>65536
 OR p->>'mission_id' IS DISTINCT FROM 'calculator-pct-v1'
 OR p->>'base_commit' IS DISTINCT FROM '8ae7ae8bef5708b621d058dc155c793aeb43bee6'
 OR jsonb_typeof(p->'files') IS DISTINCT FROM 'array'
 THEN RETURN jsonb_build_object('code',400); END IF;
 IF jsonb_array_length(p->'files') NOT BETWEEN 1 AND 4 OR EXISTS (
 SELECT 1 FROM jsonb_array_elements(p->'files') v
 WHERE (v->>'path') IS NULL OR v->>'path' NOT IN ('calculator.mjs','cli.mjs','calculator.test.mjs','README.md')
 OR jsonb_typeof(v->'content') IS DISTINCT FROM 'string' OR octet_length(v->>'content')>16384
 ) THEN RETURN jsonb_build_object('code',400); END IF;
 IF NOT public.pilot_quota('submit-global',to_char(now() AT TIME ZONE 'UTC','YYYY-MM-DD'),100)
 OR NOT public.pilot_quota('submit-'||client,to_char(now() AT TIME ZONE 'UTC','YYYY-MM-DD-HH24'),10)
 THEN RETURN jsonb_build_object('code',429); END IF;
 INSERT INTO pilot_private.contributions(fingerprint,receipt_hash,payload) VALUES(f,r,p)
 ON CONFLICT(fingerprint) DO NOTHING RETURNING id INTO contribution_id;
 IF contribution_id IS NULL THEN RETURN jsonb_build_object('code',409); END IF;
 RETURN jsonb_build_object('code',201,'id',contribution_id,'status','received');
END $$;
REVOKE ALL ON FUNCTION public.pilot_submit(jsonb,text,text,text) FROM PUBLIC;
CREATE OR REPLACE FUNCTION public.pilot_status(r text,client text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = pg_catalog,pilot_private AS $$
DECLARE result jsonb;
BEGIN
 IF length(r)<>64 OR length(client)<>64 THEN RETURN jsonb_build_object('code',404); END IF;
 IF NOT public.pilot_quota('status-global',to_char(now() AT TIME ZONE 'UTC','YYYY-MM-DD'),1000)
 OR NOT public.pilot_quota('status-'||client,to_char(now() AT TIME ZONE 'UTC','YYYY-MM-DD-HH24'),60)
 THEN RETURN jsonb_build_object('code',429); END IF;
 SELECT jsonb_build_object('code',200,'id',id,'status',status,'created_at',created_at,'review_url',review_url)
 INTO result FROM pilot_private.contributions WHERE receipt_hash=r;
 RETURN coalesce(result,jsonb_build_object('code',404));
END $$;
REVOKE ALL ON FUNCTION public.pilot_status(text,text) FROM PUBLIC;
-- Grant ONLY EXECUTE on pilot_submit and pilot_status to pilot_app.
