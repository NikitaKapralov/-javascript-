        const addBtn = document.getElementById('addBtn');
        const removeBtn = document.getElementById('removeBtn');
        const dynamicList = document.getElementById('dynamicList');
        
        addBtn.addEventListener('click', function() {
            const newItem = document.createElement('li');
            newItem.textContent = 'Новый элемент списка';
            dynamicList.appendChild(newItem);
        });
        
        removeBtn.addEventListener('click', function() {
            const items = dynamicList.querySelectorAll('li');
            if (items.length > 0) {
                dynamicList.removeChild(items[items.length - 1]);
            }
        });