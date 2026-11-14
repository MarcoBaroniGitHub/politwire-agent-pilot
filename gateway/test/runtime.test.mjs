import test from 'node:test';
import assert from 'node:assert/strict';
import {handle,receiverReady} from '../lib/runtime.mjs';
test('fermeture explicite sans configuration : aucun faux reçu',async()=>{assert.equal(receiverReady(),false);const response=await handle(new Request('https://p.test',{method:'POST',body:'{}'}),'submit');assert.equal(response.status,503);assert.match((await response.json()).error,/aucun dépôt/);});
