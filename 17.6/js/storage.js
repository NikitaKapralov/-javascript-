const STORAGE_KEY = 'warehouse_items';

export const getItems = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

export const saveItem = (item) => {
    const items = getItems();
    items.push({ ...item, id: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const deleteItem = (id) => {
    const items = getItems().filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};