// Search bar functionality
const searchBar = document.getElementById('search-bar');
const suggestions = document.getElementById('suggestions');

searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.trim();
    if (searchTerm.length >= 3) {
        fetch(`search.php?productName=${encodeURIComponent(searchTerm)}`)
    .then(response => response.json())
    .then(data => {
        suggestions.innerHTML = ''; // Clear previous suggestions
        if (data.success) {
            const product = data.data;
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = `img/${product.image}`;
            img.alt = product.name;
            img.style.width = '50px'; // Adjust size as necessary
            li.appendChild(img);

            const text = document.createTextNode(` ${product.name} - ${product.description}`);
            li.appendChild(text);
            suggestions.appendChild(li);
        } else {
            const li = document.createElement('li');
            li.textContent = data.message;
            suggestions.appendChild(li);
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
    } else {
        suggestions.innerHTML = ''; // Clear if less than 3 characters
    }
});