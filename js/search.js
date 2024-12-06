// js/search.js

export async function searchCocktails() {
    const input1 = document.getElementById('input1').value.toLowerCase();
    const input2 = document.getElementById('input2').value.toLowerCase();
    const input3 = document.getElementById('input3').value.toLowerCase();
    const input4 = document.getElementById('input4').value.toLowerCase();
    const input5 = document.getElementById('input5').value.toLowerCase();

    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.style.display = 'none'; // Hide results initially

    try {
        // Fetch records from PocketBase
        const records = await pb.collection('Cocktails').getFullList();

        // Filter records based on input values
        const filtered = records.filter(record => {
            const matchInput1 = input1 ? record.Ingredients.toLowerCase().includes(input1) : true;
            const matchInput2 = input2 ? record.Ingredients.toLowerCase().includes(input2) : true;
            const matchInput3 = input3 ? record.Garnish.toLowerCase().includes(input3) : true;
            const matchInput4 = input4 ? record.Garnish.toLowerCase().includes(input4) : true;
            const matchInput5 = input5 ? record.tags.toLowerCase().includes(input5) : true;

            return matchInput1 && matchInput2 && matchInput3 && matchInput4 && matchInput5;
        });

        // Display results
        if (filtered.length > 0) {
            cardsContainer.innerHTML = ''; // Clear previous results
            filtered.forEach(record => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.style.backgroundImage = `url(${record.image || 'https://via.placeholder.com/150'})`;
                card.innerHTML = `
                    <div class="card-content">
                        <strong>${record.Name}</strong><br>
                        <em>Ingredients:</em> ${record.Ingredients}<br>
                        <em>Garnish:</em> ${record.Garnish}<br>
                        <em>Tags:</em> ${record.tags}
                    </div>
                `;
                cardsContainer.appendChild(card);
            });
            cardsContainer.style.display = 'grid'; // Show results
        } else {
            cardsContainer.innerHTML = '<p>No results found</p>';
            cardsContainer.style.display = 'block'; // Show "No results" message
        }
    } catch (error) {
        console.error('Error fetching records:', error);
        cardsContainer.innerHTML = '<p>Error loading results</p>';
        cardsContainer.style.display = 'block'; // Show error message
    }
}
