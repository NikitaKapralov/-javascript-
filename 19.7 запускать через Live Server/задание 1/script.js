import { Delivery } from './modules/Delivery.js';

const deliveryArr = [
    new Delivery("Ольга", "ул. Вымыслов, д. 12", 8),
    new Delivery("Дмитрий", "ул. Задачная, д. 7", 3),
    new Delivery("Оля", "ул. Ткачей, д. 43", 11)
];

const container = document.getElementById('deliveries-container');

deliveryArr.forEach(delivery => {
    const cardElement = delivery.createCardElement();
    container.appendChild(cardElement);
});

setTimeout(() => {
    deliveryArr[0].distance = 10;
    console.log('Обновили расстояние у Ольги на 10 км');
}, 3000);