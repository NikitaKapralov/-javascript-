import { getItems, deleteItem } from '../storage.js';

export function renderListPage(navigate) {
    const app = document.getElementById('app');
    let items = getItems();

    const renderTable = (data) => {
        app.innerHTML = `
            <h1>Склад</h1>
            <button id="add-btn">Добавить запись</button>
            <table>
                <thead>
                    <tr>
                        <th data-sort="name">Название</th>
                        <th data-sort="shelf">Полка</th>
                        <th data-sort="weight">Вес (кг)</th>
                        <th data-sort="time">Время хранения</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.shelf}</td>
                            <td>${item.weight}</td>
                            <td>${item.time}</td>
                            <td><button class="delete" data-id="${item.id}">Удалить</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        document.getElementById('add-btn').onclick = () => navigate('form');
        
        document.querySelectorAll('.delete').forEach(btn => {
            btn.onclick = () => {
                deleteItem(Number(btn.dataset.id));
                renderTable(getItems());
            };
        });

        document.querySelectorAll('th[data-sort]').forEach(th => {
            th.onclick = () => {
                const key = th.dataset.sort;
                const sorted = [...data].sort((a, b) => a[key] > b[key] ? 1 : -1);
                renderTable(sorted);
            };
        });
    };

    renderTable(items);
}