import { createHash } from 'node:crypto';
export const BASE_COMMIT = '8ae7ae8bef5708b621d058dc155c793aeb43bee6';
export const MISSION_ID = 'calculator-pct-v1';
export const PATHS = ['calculator.mjs','cli.mjs','calculator.test.mjs','README.md'];
export const MAX_BODY = 65536;
export class HttpError extends Error { constructor(status,message){super(message);this.status=status;} }
function requireThat(condition,message){if(!condition)throw new HttpError(400,message);}
function keys(obj,allowed){requireThat(obj && typeof obj==='object' && !Array.isArray(obj),'Objet JSON attendu.');requireThat(Object.keys(obj).every(k=>allowed.includes(k)),'Champ non autorisé.');}
export function validateContribution(value){
 keys(value,['mission_id','base_commit','files','tests']);
 requireThat(value.mission_id===MISSION_ID,'Mission inconnue.');
 requireThat(value.base_commit===BASE_COMMIT,'Version de départ incorrecte.');
 requireThat(Array.isArray(value.files)&&value.files.length>=1&&value.files.length<=4,'Entre 1 et 4 fichiers requis.');
 const used=new Set();
 const files=value.files.map(file=>{
  keys(file,['path','content']);
  requireThat(PATHS.includes(file.path)&&!used.has(file.path),'Chemin interdit ou dupliqué.'); used.add(file.path);
  requireThat(typeof file.content==='string'&&file.content.trim().length>0&&Buffer.byteLength(file.content)<=16384&&!file.content.includes('\0'),'Contenu vide, invalide ou supérieur à 16 Kio.');
  return {path:file.path,content:file.content};
 }).sort((a,b)=>a.path.localeCompare(b.path));
 keys(value.tests,['status','summary']);
 requireThat(['not_run','passed','failed'].includes(value.tests.status),'État des tests incorrect.');
 requireThat(typeof value.tests.summary==='string'&&value.tests.summary.length<=1500,'Résumé des tests trop long.');
 return {mission_id:MISSION_ID,base_commit:BASE_COMMIT,files,tests:{status:value.tests.status,summary:value.tests.summary}};
}
export function fingerprint(value){return createHash('sha256').update(JSON.stringify({mission_id:value.mission_id,base_commit:value.base_commit,files:value.files})).digest('hex');}
export async function readJson(request,limit=MAX_BODY){
 if(!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type')||''))throw new HttpError(415,'Envoyez du JSON.');
 const length=request.headers.get('content-length');
 if(length&&(!/^\d+$/.test(length)||Number(length)>limit))throw new HttpError(413,'Envoi trop volumineux.');
 const reader=request.body?.getReader();if(!reader)throw new HttpError(400,'Corps JSON requis.');
 let size=0;const chunks=[];
 try {while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>limit){await reader.cancel();throw new HttpError(413,'Envoi trop volumineux.');}chunks.push(Buffer.from(value));}}finally{reader.releaseLock();}
 try{return JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{throw new HttpError(400,'JSON illisible.');}
}
