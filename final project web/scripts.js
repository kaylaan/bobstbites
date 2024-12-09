console.log('Food Truck Menu is ready!');

const possibleIngredients = [
    'Grilled Chicken', 'Basmati Rice', 'Tomato Sauce', 'Lettuce',
    'Tzatziki Sauce', 'Pita Bread', 'Lamb', 'Falafel', 'Hummus',
    'Cucumber', 'Onions', 'Pickles', 'Cheese', 'Garlic Sauce',
    'Mint', 'Parsley', 'Chickpeas', 'Yogurt', 'Carrots', 'Peppers'
];


function getRandomIngredients() {
    const ingredients = [];
    const numberOfIngredients = Math.floor(Math.random() * 4) + 3; 
    while (ingredients.length < numberOfIngredients) {
        const ingredient = possibleIngredients[Math.floor(Math.random() * possibleIngredients.length)];
        if (!ingredients.includes(ingredient)) {
            ingredients.push(ingredient);
        }
    }
    return ingredients;
}

const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    const ingredientsList = item.querySelector('.ingredients');
    const randomIngredients = getRandomIngredients();
    randomIngredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });
});

const goToCartButton = document.getElementById('goToCartButton');
goToCartButton.addEventListener('click', () => {
    window.location.href = 'foodcart.html'; 
});
