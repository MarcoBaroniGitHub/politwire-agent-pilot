import { createHash, createHmac, randomBytes } from 'node:crypto';
import { HttpError, readJson, validateContribution, fingerprint } from './contract.mjs';
const messages={400:'Résultat invalide.',403:'Origine non autorisée.',404:'Reçu introuvable.',409:'Ce code a déjà été reçu. Aucun second dépôt n’a été créé.',429:'Limite du pilote atteinte. Réessayez plus tard.',503:'Réception indisponible. Conservez votre résultat et réessayez.'};
const hash=s=>createHash('sha256').update(s).digest('hex');
const json=(value,status=200)=>Response.json(value,{status,headers:{'cache-control':'no-store','x-content-type-options':'nosniff','referrer-policy':'no-referrer'}});
export function createHandlers(db,secret,origin){
 function client(request){const ip=request.headers.get('x-forwarded-for')||'unknown';return createHmac('sha256',secret).update(new Date().toISOString().slice(0,10)+'|'+ip).digest('hex');}
 function check(request){if(request.method!=='POST')throw new HttpError(405,'Méthode non autorisée.');const from=request.headers.get('origin');if(from&&from!==origin)throw new HttpError(403,messages[403]);if(!secret)throw new Error('Missing config');}
 async function safe(run){try{return await run();}catch(e){if(e instanceof HttpError)return json({error:e.message},e.status);console.error('pilot_request_failed');return json({error:messages[503]},503);}}
 return {
  submit:request=>safe(async()=>{
   check(request);const value=validateContribution(await readJson(request));
   const token=randomBytes(32).toString('base64url');
   const result=await db.submit(value,fingerprint(value),hash(token),client(request));
   if(result.code!==201)return json({error:messages[result.code]||messages[400]},result.code);
   return json({id:result.id,status:'received',message:'Contribution reçue, en attente de vérification par le projet.',receipt_url:origin+'/receipt.html#'+token},201);
  }),
  status:request=>safe(async()=>{
   check(request);const value=await readJson(request,256);
   if(!value||Object.keys(value).length!==1||typeof value.token!=='string'||!/^[A-Za-z0-9_-]{43}$/.test(value.token))throw new HttpError(400,'Jeton de reçu invalide.');
   const result=await db.status(hash(value.token),client(request));
   if(result.code!==200)return json({error:messages[result.code]||messages[404]},result.code);
   return json({id:result.id,status:result.status,created_at:result.created_at,review_url:result.review_url});
  })
 };
}
