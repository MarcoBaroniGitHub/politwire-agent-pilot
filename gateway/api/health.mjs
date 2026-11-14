import { receiverReady } from '../lib/runtime.mjs';
export function GET(){return Response.json({receiver_ready:receiverReady(),mode:'public-pilot',executes_submitted_code:false},{headers:{'cache-control':'no-store'}});}
