// js/auth.js
const pb = new PocketBase('http://pocketbase-ygkooskkgw0kk0ow0ogc8cw8.209.182.239.56.sslip.io');

async function authenticate(email, password) {
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        console.log("Token:", pb.authStore.token); // Log the token for debugging
        return pb.authStore.token; // Return token to caller
    } catch (error) {
        console.error("Authentication failed:", error);
        throw error; // Rethrow error for handling in UI
    }
}

function getToken() {
    return pb.authStore.token;
}

// Attach to the global scope
window.Auth = { authenticate, getToken };
