// js/cocktails.js
console.log("cocktails.js is running...");

async function fetchCocktails() {
    try {
        const records = await pb.collection('Cocktails').getFullList({
            sort: '-created', // Sort by most recently created
        });
        console.log("Cocktails fetched:", records);
        return records; // Return records to caller
    } catch (error) {
        console.error("Failed to fetch cocktails:", error);
        throw error; // Rethrow error for handling in UI
    }
}

window.Cocktails = { fetchCocktails };
console.log("cocktails.js loaded, Cocktails object defined:", window.Cocktails);
