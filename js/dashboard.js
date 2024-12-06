// js/dashboard.js
document.addEventListener('DOMContentLoaded', async () => {
    const navLinks = document.getElementById('nav-links');
    const content = document.getElementById('content');

    try {
        // Fetch the current user
        const user = pb.authStore.model;
        console.log("Logged in user:", user);

        // Role-based navigation
        if (user.role === 'admin') {
            navLinks.innerHTML = `
                <a href="#" data-page="search">Search Cocktails</a>
                <a href="#" data-page="add">Add Cocktails</a>
            `;
        } else if (user.role === 'user') {
            navLinks.innerHTML = `
                <a href="#" data-page="search">Search Cocktails</a>
            `;
        } else {
            navLinks.innerHTML = '<p>No access</p>';
            return;
        }

        // Handle navigation clicks
        navLinks.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            if (page === 'search') {
                loadSearchPage();
            } else if (page === 'add') {
                loadAddPage();
            }
        });
    } catch (error) {
        console.error("Failed to load user data:", error);
    }

    // Load "Search Cocktails" page
    function loadSearchPage() {
        content.innerHTML = `
            <h2>Search Cocktails</h2>
            <input type="text" id="search" placeholder="Search cocktails..." />
            <div id="results"></div>
        `;

        const searchInput = document.getElementById('search');
        const resultsDiv = document.getElementById('results');

        searchInput.addEventListener('input', async (e) => {
            const query = e.target.value.toLowerCase();
            try {
                const records = await pb.collection('Cocktails').getFullList();
                const filtered = records.filter(record => record.Name.toLowerCase().includes(query));
                resultsDiv.innerHTML = filtered.map(cocktail => `<p>${cocktail.Name}</p>`).join('');
            } catch (error) {
                console.error("Failed to fetch cocktails:", error);
                resultsDiv.innerHTML = '<p>Error loading results</p>';
            }
        });
    }

    // Load "Add Cocktails" page
    function loadAddPage() {
        content.innerHTML = `
            <h2>Add Cocktail</h2>
            <form id="add-form">
                <label for="name">Name:</label><br>
                <input type="text" id="name" required><br>
                <label for="ingredients">Ingredients:</label><br>
                <textarea id="ingredients" required></textarea><br>
                <label for="instructions">Instructions:</label><br>
                <textarea id="instructions" required></textarea><br>
                <button type="submit">Add Cocktail</button>
            </form>
            <p id="status"></p>
        `;

        const form = document.getElementById('add-form');
        const status = document.getElementById('status');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const ingredients = document.getElementById('ingredients').value;
            const instructions = document.getElementById('instructions').value;

            try {
                await pb.collection('Cocktails').create({
                    Name: name,
                    Ingredients: ingredients,
                    Instructions: instructions,
                });
                status.textContent = "Cocktail added successfully!";
                form.reset();
            } catch (error) {
                console.error("Failed to add cocktail:", error);
                status.textContent = "Failed to add cocktail.";
            }
        });
    }
});
