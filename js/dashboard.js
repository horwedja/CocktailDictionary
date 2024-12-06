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
        const ingredient1 = document.getElementById('ingredient1').value.toLowerCase();
        const ingredient2 = document.getElementById('ingredient2').value.toLowerCase();

        try {
            const records = await pb.collection('Cocktails').getFullList();

            const filtered = records.filter(record =>
                (ingredient1 ? record.Ingredients.toLowerCase().includes(ingredient1) : true) &&
                (ingredient2 ? record.Ingredients.toLowerCase().includes(ingredient2) : true)
            );

            if (filtered.length > 0) {
                resultsDiv.innerHTML = `
                    <h3>Results</h3>
                    <ul class="results-list">
                        ${filtered.map(cocktail => `
                            <li>
                                <strong>${cocktail.Name}</strong>
                                <p>Ingredients: ${cocktail.Ingredients}</p>
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
