//import { loadAddCocktailPage } from './addCocktail.js';
import { loadWelcomePage } from './welcome.js';
import { loadSearchPage } from './search.js';

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content'); // Ensure #content exists in the HTML
    console.log('Dashboard initialized'); // Debug log
    loadWelcomePage(content); // Call to load the welcome page

    // Event listener for "Find Cocktails" button
    document.getElementById('find-cocktails-btn').addEventListener('click', () => {
        loadSearchPage(content);
    });

    // Event listener for "Add Cocktail" button
    document.getElementById('add-cocktail-btn').addEventListener('click', () => {
        loadAddCocktailPage(content);
    });
});
 