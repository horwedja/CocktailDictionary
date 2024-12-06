import PocketBase from 'https://cdnjs.cloudflare.com/ajax/libs/pocketbase/0.14.0/pocketbase.es.mjs';

const pb = new PocketBase('http://pocketbase-ygkooskkgw0kk0ow0ogc8cw8.209.182.239.56.sslip.io');
console.log("PocketBase instance initialized");
// Export the PocketBase instance
export default pb;
