import { EditDelivery } from './modules/EditDelivery.js';

const deliveryArr = [
    new EditDelivery("Ольга", "ул. Вымыслов, д. 12", 8, "delivery"),
    new EditDelivery("Дмитрий", "ул. Задачная, д. 7", 3, "delivered"),
    new EditDelivery("Оля", "ул. Ткачей, д. 43", 11, "canceled")
];

const container = document.getElementById('deliveries-container');

deliveryArr.forEach(delivery => {
    const cardElement = delivery.createCardElement();
    container.appendChild(cardElement);
});

function updateTotalDistance() {
    const total = deliveryArr.reduce((sum, delivery) => {
        return delivery.status !== 'canceled' ? sum + delivery.distance : sum;
    }, 0);
    
    let totalElement = document.getElementById('total-distance');
    if (!totalElement) {
        totalElement = document.createElement('div');
        totalElement.id = 'total-distance';
        totalElement.className = 'total-distance';
        container.parentNode.appendChild(totalElement);
    }
    totalElement.innerHTML = `<h3>Общее расстояние: ${total} км</h3>`;
}

updateTotalDistance();
