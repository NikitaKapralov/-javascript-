        let prices = [100, 500, 250, 750, 300];
        
        const priceList = document.getElementById('priceList');
        const sortAscBtn = document.getElementById('sortAscBtn');
        const sortDescBtn = document.getElementById('sortDescBtn');
        
        function displayPrices() {
            priceList.innerHTML = '';
            
            prices.forEach(price => {
                const listItem = document.createElement('li');
                listItem.textContent = `${price} руб.`;
                priceList.appendChild(listItem);
            });
        }
        
        function sortAscending() {
            prices.sort((a, b) => a - b);
            displayPrices();
        }
        
        function sortDescending() {
            prices.sort((a, b) => b - a);
            displayPrices();
        }
        
        sortAscBtn.addEventListener('click', sortAscending);
        sortDescBtn.addEventListener('click', sortDescending);
        
        displayPrices();