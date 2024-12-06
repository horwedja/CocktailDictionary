// js/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.nav-button');
    const content = document.querySelector('.content');

    // Event listener for the Search button
    searchButton.addEventListener('click', () => {
        loadSearchPage(content);
    });

    // Load the default gallery view
    loadGallery(content);
});

function loadSearchPage(content) {
    content.innerHTML = `
        <h2 class="title">Search Cocktails</h2>
        <form id="search-form" class="search-form">
            <label for="ingredient1">Ingredient 1:</label>
            <input type="text" id="ingredient1" class="search-input"><br>

            <label for="ingredient2">Ingredient 2:</label>
            <input type="text" id="ingredient2" class="search-input"><br>

            <label for="garnish1">Garnish 1:</label>
            <input type="text" id="garnish1" class="search-input"><br>

            <label for="garnish2">Garnish 2:</label>
            <input type="text" id="garnish2" class="search-input"><br>

            <label for="category">Category:</label>
            <select id="category" class="search-input">
                <option value="">--Any--</option>
                <option value="Classic">Classic</option>
                <option value="Signature">Signature</option>
            </select><br>

            <label for="alcoholic">Alcoholic:</label>
            <select id="alcoholic" class="search-input">
                <option value="">--Any--</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select><br>

            <label for="tag">Tag:</label>
            <input type="text" id="tag" class="search-input"><br>

            <button type="submit" class="search-submit">Search</button>
        </form>
        <div id="results" class="results">
            <h3>Results</h3>
            <p>No results to display</p>
        </div>
    `;

    const searchForm = document.getElementById('search-form');
    const resultsDiv = document.getElementById('results');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get search inputs
        const ingredient1 = document.getElementById('ingredient1').value.toLowerCase();
        const ingredient2 = document.getElementById('ingredient2').value.toLowerCase();
        const garnish1 = document.getElementById('garnish1').value.toLowerCase();
        const garnish2 = document.getElementById('garnish2').value.toLowerCase();
        const category = document.getElementById('category').value;
        const alcoholic = document.getElementById('alcoholic').value;
        const tag = document.getElementById('tag').value.toLowerCase();

        try {
            // Fetch all records from PocketBase
            const records = await pb.collection('Cocktails').getFullList();

            // Filter records based on input values
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

            // Display results
            if (filtered.length > 0) {
                resultsDiv.innerHTML = `
                    <h3>Results</h3>
                    <div class="cards-container">
                        ${filtered.map(cocktail => `
                            <div class="card">
                                <div class="card-content">
                                    <strong>${cocktail.Name}</strong><br>
                                    <em>Ingredients:</em> ${cocktail.Ingredients}<br>
                                    <em>Garnish:</em> ${cocktail.Garnish}<br>
                                    <em>Tags:</em> ${cocktail.tags}
                                </div>
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

function loadGallery(content) {
    content.innerHTML = `
        <h1 class="title">Welcome to the Thirst Cocktail Dictionary</h1>
        <p class="subtitle">You can use the search tool to find what you are looking for.</p>
        <div class="cocktails-gallery">
            <img src="https://via.placeholder.com/150" alt="Cocktail 1">
            <img src="https://via.placeholder.com/150" alt="Cocktail 2">
            <img src="https://via.placeholder.com/150" alt="Cocktail 3">
        </div>
    `;
}
