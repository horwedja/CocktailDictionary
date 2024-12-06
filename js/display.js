export function renderCocktailsResults(container, results) {
    if (results.length > 0) {
        container.innerHTML = `
            <div class="cards-container">
                ${results.map(cocktail => `
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
        container.innerHTML = '<p>No results found</p>';
    }
}
