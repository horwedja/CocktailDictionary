// js/dashboard.js
document.addEventListener('DOMContentLoaded', async () => {
    const navLinks = document.getElementById('nav-links');
    const content = document.getElementById('content');

    try {
        // Check if the user is authenticated
        if (!pb.authStore.isValid) {
            throw new Error("User is not authenticated");
        }

        console.log("Authenticated user:", pb.authStore.model);

        // Display the navigation menu with "Search Cocktails"
        navLinks.innerHTML = `
            <a href="#" data-page="search">Search Cocktails</a>
        `;

        // Handle navigation clicks
        navLinks.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            if (page === 'search') {
                loadSearchPage();
            }
        });

        // Load the Search Cocktails page by default
        loadSearchPage();
    } catch (error) {
        console.error("Error loading dashboard:", error);
        navLinks.innerHTML = '<p>Error: Unable to access dashboard</p>';
    }

    // Function to load the Search Cocktails page
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
});
