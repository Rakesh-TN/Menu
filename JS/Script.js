console.log("Fetching menu...");

fetch("Assets/menu.json")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) {
        console.error('Error: #menu-container not found in DOM.');
        return;
    }
    menuContainer.innerHTML = ''; // Clear previous content before appending new items

    data.menu.forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.classList.add("d-flex", "flex-column", 'm-5', 'rounded-3', 'p-4', 'bg-black', 'bg-opacity-50', 'tm-menu-category');

        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category.category;
        categoryTitle.classList.add('fs-3', "text-white", 'mb-4');
        categorySection.appendChild(categoryTitle);

        category.items.forEach(item => {
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('mb-6', 'text-center');

            // Image with fallback
            const itemImage = document.createElement('img');
            itemImage.src = item.image?.trim() ? item.image : 'img/default-placeholder.webp';
            itemImage.alt = item.name;
            itemImage.classList.add('rounded-md', 'menu');
            itemContainer.appendChild(itemImage);

            // Item Details
            const itemDetails = document.createElement('div');
            itemDetails.classList.add('ml-3', 'sm:ml-6');

            const itemName = document.createElement('h3');
            itemName.textContent = item.name;
            itemName.classList.add("text-white", 'text-lg', 'sm:text-xl', 'font-semibold', 'mb-1');
            itemDetails.appendChild(itemName);

            const itemPrice = document.createElement('p');
            itemPrice.textContent = `${item.currency}${item.price}`;
            itemPrice.classList.add('text-white', 'text-md', 'sm:text-lg', 'font-light', 'mb-1');
            itemDetails.appendChild(itemPrice);

            itemContainer.appendChild(itemDetails);
            categorySection.appendChild(itemContainer);
        });

        menuContainer.appendChild(categorySection);
    });
})
.catch(error => {
    console.error('Error fetching menu:', error);
});
