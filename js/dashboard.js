// js/dashboard.js
import { loadSearchPage } from './search.js';

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.getElementById('nav-links');
    const content = document.getElementById('content');

    // Set up navigation menu
    navLinks.innerHTML = `
        <a href="#" id="search-button">Search Cocktails</a>
    `;

    // Add event listener for "Search Cocktails" button
    document.getElementById('search-button').addEventListener('click', (e) => {
        e.preventDefault();
        loadSearchPage();
    });

    // Load the search page by default
    loadSearchPage();
});
