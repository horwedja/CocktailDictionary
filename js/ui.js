// ui.js
export function showCocktails(records, container) {
    container.innerHTML = ''; // Clear existing content
    records.forEach(record => {
        const div = document.createElement('div');
        div.className = 'cocktail';
        div.innerHTML = `
            <h3>${record.Name || 'Unnamed Cocktail'}</h3>
            <p><strong>Ingredients:</strong> ${record.Ingredients || 'N/A'}</p>
            <p><strong>Instructions:</strong> ${record.Instructions || 'N/A'}</p>
            <p><strong>Category:</strong> ${record.Category || 'N/A'}</p>
            <p><strong>Alcoholic:</strong> ${record.Alcoholic ? 'Yes' : 'No'}</p>
        `;
        container.appendChild(div);
    });
}

export function showError(message, container) {
    container.innerHTML = `<p class="error">${message}</p>`;
}
