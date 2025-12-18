import { saveItem } from '../storage.js';

export function renderFormPage(navigate) {
    const app = document.getElementById('app');
    app.innerHTML = `
        <h1>Добавить запись</h1>
        <form id="add-form">
            <input type="text" id="name" placeholder="Название" required>
            <input type="text" id="shelf" placeholder="Полка" required>
            <input type="number" id="weight" placeholder="Вес" required>
            <input type="text" id="time" placeholder="Время хранения (дней)" required>
            <button type="submit">Сохранить</button>
            <button type="button" id="back-btn" style="background: gray">Назад</button>
        </form>
    `;

    const form = document.getElementById('add-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        
        const newItem = {
            name: document.getElementById('name').value,
            shelf: document.getElementById('shelf').value,
            weight: document.getElementById('weight').value,
            time: document.getElementById('time').value,
        };

        saveItem(newItem);
        navigate('list');
    };

    document.getElementById('back-btn').onclick = () => navigate('list');
}