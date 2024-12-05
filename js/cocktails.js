// js/cocktails.js
const pb = new PocketBase('http://pocketbase-ygkooskkgw0kk0ow0ogc8cw8.209.182.239.56.sslip.io');

async function fetchCocktails() {
    try {
        const records = await pb.collection('Cocktails').getFullList({
            sort: '-created', // Sort by most recently created
        });
        return records; // Return records to caller
    } catch (error) {
        console.error("Failed to fetch cocktails:", error);
        throw error; // Rethrow error for handling in UI
    }
}

// Attach to the global scope
window.Cocktails = { fetchCocktails };
console.log("cocktails.js loaded");
