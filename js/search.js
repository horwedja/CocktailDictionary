// js/search.js

export function loadSearchPage() {
    const content = document.getElementById('content');

    content.innerHTML = `
        <h2>Search Cocktails</h2>
        <form id="search-form">
            <label for="ingredient1">Ingredient 1:</label><br>
            <input type="text" id="ingredient1"><br>

            <label for="ingredient2">Ingredient 2:</label><br>
            <input type="text" id="ingredient2"><br>

            <label for="garnish1">Garnish 1:</label><br>
            <input type="text" id="garnish1"><br>

            <label for="garnish2">Garnish 2:</label><br>
            <input type="text" id="garnish2"><br>

            <label for="category">Category:</label><br>
            <select id="category">
                <option value="">--Any--</option>
                <option value="Classic">Classic</option>
                <option value="Signature">Signature</option>
            </select><br>

            <label for="alcoholic">Alcoholic:</label><br>
            <select id="alcoholic">
                <option value="">--Any--</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select><br>

            <label for="tag">Tag:</label><br>
            <input type="text" id="tag"><br><br>

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

        // Get search criteria
        const ingredient1 = document.getElementById('ingredient1').value.toLowerCase();
        const ingredient2 = document.getElementById('ingredient2').value.toLowerCase();
        const garnish1 = document.getElementById('garnish1').value.toLowerCase();
        const garnish2 = document.getElementById('garnish2').value.toLowerCase();
        const category = document.getElementById('category').value;
        const alcoholic = document.getElementById('alcoholic').value;
        const tag = document.getElementById('tag').value.toLowerCase();

        try {
            const records = await pb.collection('Cocktails').getFullList();

            // Filter records based on search criteria
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

            // Update results
            if (filtered.length > 0) {
                resultsDiv.innerHTML = `
                    <h3>Results</h3>
                    <ul>
                        ${filtered.map(cocktail => `
                            <li>
                                <strong>${cocktail.Name}</strong><br>
                                <em>Ingredients:</em> ${cocktail.Ingredients}<br>
                                <em>Garnish:</em> ${cocktail.Garnish}<br>
                                <em>Category:</em> ${cocktail.Category}<br>
                                <em>Alcoholic:</em> ${cocktail.Alcoholic ? 'Yes' : 'No'}<br>
                                <em>Tags:</em> ${cocktail.tags}
                            </li>
                        `).join('')}
                    </ul>
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
