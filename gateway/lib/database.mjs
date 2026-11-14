import { neon } from '@neondatabase/serverless';
// Parameterized, one-shot HTTPS queries. DB role can only execute these two functions.
export function database(){
 const sql=neon(process.env.DATABASE_URL);
 return {
  async submit(value,fingerprint,receipt,client){const rows=await sql`SELECT public.pilot_submit(${JSON.stringify(value)}::jsonb,${fingerprint},${receipt},${client}) AS result`;return rows[0].result;},
  async status(receipt,client){const rows=await sql`SELECT public.pilot_status(${receipt},${client}) AS result`;return rows[0].result;}
 };
}
