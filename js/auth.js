// js/auth.js
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

window.Auth = { authenticate, getToken };
