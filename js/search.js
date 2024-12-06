import pb from './pocketbase.js';

export function loadSearchPage(content) {
    content.innerHTML = `
        <h2>Search Cocktails</h2>
        <form id="search-form" class="search-form">
            <input type="text" id="ingredient1" placeholder="Ingredient 1">
            <input type="text" id="ingredient2" placeholder="Ingredient 2">
            <input type="text" id="garnish1" placeholder="Garnish 1">
            <input type="text" id="garnish2" placeholder="Garnish 2">
            <select id="category">
                <option value="">Category</option>
                <option value="Classic">Classic</option>
                <option value="Signature">Signature</option>
            </select>
            <select id="alcoholic">
                <option value="">Alcoholic</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            <input type="text" id="tag" placeholder="Tag">
            <button type="submit">Search</button>
        </form>
        <div id="results">
            <h3>Results</h3>
            <p>No results to display</p>
        </div>
    `;

    const searchForm = document.getElementById('search-form');
    const resultsDiv = document.getElementById('results');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const ingredient1 = document.getElementById('ingredient1').value.toLowerCase();
        const ingredient2 = document.getElementById('ingredient2').value.toLowerCase();
        const garnish1 = document.getElementById('garnish1').value.toLowerCase();
        const garnish2 = document.getElementById('garnish2').value.toLowerCase();
        const category = document.getElementById('category').value;
        const alcoholic = document.getElementById('alcoholic').value;
        const tag = document.getElementById('tag').value.toLowerCase();

        try {
            const records = await pb.collection('Cocktails').getFullList(); // Fetch all cocktails

            const filtered = records.filter(record => {
                const matchIngredient1 = ingredient1 ? record.Ingredients.toLowerCase().includes(ingredient1) : true;
                const matchIngredient2 = ingredient2 ? record.Ingredients.toLowerCase().includes(ingredient2) : true;
                const matchGarnish1 = garnish1 ? record.Garnish.toLowerCase().includes(garnish1) : true;
                const matchGarnish2 = garnish2 ? record.Garnish.toLowerCase().includes(garnish2) : true;
                const matchCategory = category ? record.Category === category : true;
                const matchAlcoholic = alcoholic ? record.Alcoholic.toString() === alcoholic : true;
                const matchTag = tag ? record.tags.toLowerCase().includes(tag) : true;

                return (
                    matchIngredient1 &&
                    matchIngredient2 &&
                    matchGarnish1 &&
                    matchGarnish2 &&
                    matchCategory &&
                    matchAlcoholic &&
                    matchTag
                );
            });

            if (filtered.length > 0) {
                resultsDiv.innerHTML = `
                    <h3>Results</h3>
                    <div class="cards-container">
                        ${filtered.map(cocktail => `
                            <div class="card">
                                <h4>${cocktail.Name}</h4>
                                <p><strong>Ingredients:</strong> ${cocktail.Ingredients}</p>
                                <p><strong>Garnish:</strong> ${cocktail.Garnish}</p>
                                <p><strong>Category:</strong> ${cocktail.Category}</p>
                                <p><strong>Alcoholic:</strong> ${cocktail.Alcoholic ? 'Yes' : 'No'}</p>
                                <p><strong>Tags:</strong> ${cocktail.tags}</p>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else {
                resultsDiv.innerHTML = '<p>No results found</p>';
            }
        } catch (error) {
            console.error("Failed to fetch cocktails:", error);
            resultsDiv.innerHTML = '<p>Error loading results</p>';
        }
    });
}
