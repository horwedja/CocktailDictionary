import pb from './pocketbase.js';

export async function searchCocktails(criteria) {
    try {
        // Fetch all cocktail records
        const records = await pb.collection('Cocktails').getFullList();

        // Filter records based on search criteria
        const filtered = records.filter(record => {
            const matchIngredient1 = criteria.ingredient1 ? record.Ingredients.toLowerCase().includes(criteria.ingredient1) : true;
            const matchIngredient2 = criteria.ingredient2 ? record.Ingredients.toLowerCase().includes(criteria.ingredient2) : true;
            const matchGarnish1 = criteria.garnish1 ? record.Garnish.toLowerCase().includes(criteria.garnish1) : true;
            const matchGarnish2 = criteria.garnish2 ? record.Garnish.toLowerCase().includes(criteria.garnish2) : true;
            const matchCategory = criteria.category ? record.Category === criteria.category : true;
            const matchAlcoholic = criteria.alcoholic ? record.Alcoholic.toString() === criteria.alcoholic : true;
            const matchTag = criteria.tag ? record.tags.toLowerCase().includes(criteria.tag) : true;

            return matchIngredient1 && matchIngredient2 && matchGarnish1 && matchGarnish2 && matchCategory && matchAlcoholic && matchTag;
        });

        return filtered;
    } catch (error) {
        console.error("Search failed:", error);
        return [];
    }
}
