export function loadWelcomePage(content) {
    // Debug log to verify that this function is called
    console.log('Loading Welcome Page');

    // Dynamically add content
    content.innerHTML = `
        <div class="welcome-container">
            <h1 class="welcome-title">Welcome to the Thirst Dashboard</h1>
            <p class="welcome-text">Use the navigation on the left to find or add cocktails.</p>
        </div>
    `;
}
