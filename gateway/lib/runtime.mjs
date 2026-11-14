import { createHandlers } from './http.mjs';
export const receiverReady=()=>Boolean(process.env.DATABASE_URL&&process.env.RATE_SECRET&&process.env.PUBLIC_ORIGIN&&process.env.RECEIVER_ENABLED==='true');
export async function handle(request,method){
 if(!receiverReady())return Response.json({error:'Réception en préparation. Conservez votre résultat ; aucun dépôt n’a été enregistré.'},{status:503,headers:{'cache-control':'no-store'}});
 try {const {database}=await import('./database.mjs');return await createHandlers(database(),process.env.RATE_SECRET,process.env.PUBLIC_ORIGIN)[method](request);}
 catch {console.error('pilot_config_failed');return Response.json({error:'Réception indisponible. Aucun dépôt confirmé.'},{status:503,headers:{'cache-control':'no-store'}});}
}
