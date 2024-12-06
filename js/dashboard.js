//import { loadAddCocktailPage } from './addCocktail.js';
import { loadWelcomePage } from './welcome.js';
import { loadFindCocktailsPage } from './finddisplay.js';

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content'); // Ensure #content exists in the HTML
    console.log('Dashboard initialized'); // Debug log
    loadWelcomePage(content); // Call to load the welcome page

   // Event Listener for "Find Cocktails" Button
   document.getElementById('find-cocktails-btn').addEventListener('click', () => {
    loadFindCocktailsPage(content); // Call the function from `finddisplay.js`
    });

    // Event listener for "Add Cocktail" button
    document.getElementById('add-cocktail-btn').addEventListener('click', () => {
        loadAddCocktailPage(content);
    });
});
 