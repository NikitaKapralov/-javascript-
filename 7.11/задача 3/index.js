let products = ["Яблоки", "Молоко", "Хлеб", "Сыр", "Банан"];

const displayProducts = () => {
    const sortedProducts = [...products].sort();
    const list = document.getElementById('product-list');
    
    list.innerHTML = sortedProducts
        .map((product, index) => `<div class="product-item">${index + 1}) ${product}</div>`)
        .join('');
};

const addProduct = () => {
    const productName = prompt('Введите название товара:');
    
    if (productName === null) return;
    
    if (!productName.trim()) {
        alert('Название товара не введено!');
        return;
    }
    
    products.push(productName);
    displayProducts();
};

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    document.getElementById('add-product').onclick = addProduct;
});