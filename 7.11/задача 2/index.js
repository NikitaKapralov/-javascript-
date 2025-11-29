let heights = [165, 172, 158, 180, 170, 175];
let filteredHeights = [];

const displayHeights = () => {
    const list = document.getElementById('height-list');
    const data = filteredHeights.length > 0 ? filteredHeights : heights;
    
    list.innerHTML = data
        .map(height => `<div class="height-item">${height} см</div>`)
        .join('');
};

const addHeight = () => {
    const height = prompt('Введите рост ученика (см):');
    if (height === null) return;
    
    if (!height.trim()) {
        alert('Рост не введён!');
        return;
    }
    
    const numHeight = Number(height);
    if (isNaN(numHeight)) {
        alert('Пожалуйста, введите число!');
        return;
    }
    
    heights.push(numHeight);
    filteredHeights = [];
    displayHeights();
};

const filterHeights = () => {
    const minHeight = prompt('Введите минимальный рост для фильтрации:');
    if (minHeight === null) return;
    
    if (!minHeight.trim()) {
        filteredHeights = [];
        displayHeights();
        return;
    }
    
    const numMinHeight = Number(minHeight);
    if (isNaN(numMinHeight)) {
        alert('Пожалуйста, введите число!');
        return;
    }
    
    filteredHeights = heights.filter(height => height >= numMinHeight);
    displayHeights();
};

document.addEventListener('DOMContentLoaded', () => {
    displayHeights();
    document.getElementById('add-height').onclick = addHeight;
    document.getElementById('filter').onclick = filterHeights;
});