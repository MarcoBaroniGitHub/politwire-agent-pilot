const $=id=>document.getElementById(id);
let prompt='';let ready=false;
async function init(){
 try{const r=await fetch('/mission.txt');if(!r.ok)throw Error();prompt=await r.text();$('prompt').value=prompt;$('copy').disabled=false;$('copy').textContent='Copier la mission pour mon IA';}catch{$('copy-status').textContent='Mission indisponible. Rechargez la page.';}
 try{const r=await fetch('/api/health',{cache:'no-store'});const b=await r.json();ready=b.receiver_ready===true;$('send').disabled=!ready;$('availability').textContent=ready?'Réception ouverte · aucun compte ni email requis.':'Réception en préparation : vous pouvez déjà confier la mission à votre IA et conserver son résultat. Aucun envoi n’est encore enregistré.';$('availability').classList.toggle('ready',ready);}catch{$('availability').textContent='Réception indisponible. Conservez votre résultat et réessayez plus tard.';}
}
$('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(prompt);$('copy-status').textContent='Mission copiée. Collez-la maintenant dans votre conversation avec votre IA.';}catch{$('prompt').closest('details').open=true;$('prompt').focus();$('prompt').select();$('copy-status').textContent='Sélectionnez et copiez le texte ci-dessous.';}});
$('submit-form').addEventListener('submit',async e=>{e.preventDefault();if(!ready)return;$('send').disabled=true;$('receipt').hidden=true;
 try{let text=$('result').value.trim();text=text.replace(/^```(?:json)?\s*\n?/i,'').replace(/\n?```$/,'');const value=JSON.parse(text);if(new TextEncoder().encode(JSON.stringify(value)).length>65536)throw Error('Le résultat dépasse 64 Kio.');const r=await fetch('/api/contributions',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(value)});const b=await r.json();if(!r.ok)throw Error(b.error||'Envoi impossible.');$('send-status').textContent=b.message;$('receipt').href=b.receipt_url;$('receipt').hidden=false;$('result').value='';}
 catch(err){$('send-status').textContent=err instanceof SyntaxError?'Le résultat n’est pas un JSON valide. Demandez à votre IA le résultat complet au format indiqué.':err.message;}
 finally{$('send').disabled=!ready;}
});init();
