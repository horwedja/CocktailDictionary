// auth.js
import PocketBase from 'https://cdnjs.cloudflare.com/ajax/libs/pocketbase/0.20.0/pocketbase.umd.js';

const pb = new PocketBase('http://pocketbase-ygkooskkgw0kk0ow0ogc8cw8.209.182.239.56.sslip.io');

export async function authenticate(email, password) {
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        console.log("Token:", pb.authStore.token); // Log the token for debugging
        return pb.authStore.token; // Return token to caller
    } catch (error) {
        console.error("Authentication failed:", error);
        throw error; // Rethrow error for handling in UI
    }
}

export function getToken() {
    return pb.authStore.token;
}
