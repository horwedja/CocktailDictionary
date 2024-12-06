import { searchCocktails } from './search.js';

export function loadFindCocktailsPage(content) {
    // Render the search interface
    content.innerHTML = `
        <h2 class="title">Find Cocktails</h2>
        <div class="rectangle-container">
            <div class="rectangle"><input type="text" id="ingredient1" placeholder="Ingredient 1"></div>
            <div class="rectangle"><input type="text" id="ingredient2" placeholder="Ingredient 2"></div>
            <div class="rectangle"><input type="text" id="garnish1" placeholder="Garnish 1"></div>
            <div class="rectangle"><input type="text" id="garnish2" placeholder="Garnish 2"></div>
            <div class="rectangle">
                <select id="category">
                    <option value="">Category</option>
                    <option value="Classic">Classic</option>
                    <option value="Signature">Signature</option>
                </select>
            </div>
            <div class="rectangle">
                <select id="alcoholic">
                    <option value="">Alcoholic</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div class="rectangle"><input type="text" id="tag" placeholder="Tag"></div>
        </div>
        <!-- Button Below Rectangle Container -->
        <div style="margin-top: 60px; text-align: center;">
            <button class="search-btn" id="search-btn">Search</button>
            <button class="search-btn" id="reset-btn">Reset Filters</button>
        </div>

        <!-- Hidden Results Div -->
        <div id="results" style="display: none; margin-top: 20px;">
            <h3>Search Results</h3>
            <div class="results-container"></div>
        </div>
    `;
// Add event listener for the Reset button
document.getElementById('reset-btn').addEventListener('click', () => {
    // Clear all inputs
    document.getElementById('ingredient1').value = '';
    document.getElementById('ingredient2').value = '';
    document.getElementById('garnish1').value = '';
    document.getElementById('garnish2').value = '';
    document.getElementById('category').value = '';
    document.getElementById('alcoholic').value = '';
    document.getElementById('tag').value = '';

    // Hide results if any are displayed
    document.getElementById('results').style.display = 'none';
});
    // Hook up the Search button
    document.getElementById('search-btn').addEventListener('click', async () => {
        const criteria = {
            ingredient1: document.getElementById('ingredient1').value.toLowerCase(),
            ingredient2: document.getElementById('ingredient2').value.toLowerCase(),
            garnish1: document.getElementById('garnish1').value.toLowerCase(),
            garnish2: document.getElementById('garnish2').value.toLowerCase(),
            category: document.getElementById('category').value,
            alcoholic: document.getElementById('alcoholic').value,
            tag: document.getElementById('tag').value.toLowerCase(),
        };

        const resultsDiv = document.getElementById('results');
        const resultsContainer = document.querySelector('.results-container');

        // Perform search
        const results = await searchCocktails(criteria);

        // Display results
        if (results.length > 0) {
            resultsContainer.innerHTML = results.map(cocktail => `
                <div class="card">
                    <h4>${cocktail.Name}</h4>
                    <p><strong>Ingredients:</strong> ${cocktail.Ingredients}</p>
                    <p><strong>Garnish:</strong> ${cocktail.Garnish}</p>
                    <p><strong>Category:</strong> ${cocktail.Category}</p>
                    <p><strong>Alcoholic:</strong> ${cocktail.Alcoholic ? 'Yes' : 'No'}</p>
                    <p><strong>Tags:</strong> ${cocktail.tags}</p>
                </div>
            `).join('');
        } else {
            resultsContainer.innerHTML = '<p>No results found</p>';
        }

        // Show results div
        resultsDiv.style.display = 'block';
        
    });
}
