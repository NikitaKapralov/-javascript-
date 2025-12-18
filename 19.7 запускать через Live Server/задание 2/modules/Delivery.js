export class Delivery {
    constructor(name, address, distance) {
        this._name = name;
        this._address = address;
        this._distance = distance;
    }

    get name() { return this._name; }
    get address() { return this._address; }
    get distance() { return this._distance; }

    set name(newName) {
        this._name = newName;
        this._updateCard();
    }

    set address(newAddress) {
        this._address = newAddress;
        this._updateCard();
    }

    set distance(newDistance) {
        this._distance = newDistance;
        this._updateCard();
    }

    createCardElement() {
        const card = document.createElement('div');
        card.className = 'delivery-card';
        card.dataset.id = Date.now();

        card.innerHTML = `
            <div class="delivery-header">
                <h3 class="customer-name">${this._name}</h3>
            </div>
            <div class="delivery-body">
                <p><strong>Адрес:</strong> ${this._address}</p>
                <p><strong>Расстояние:</strong> <span class="distance-value">${this._distance}</span> км</p>
            </div>
        `;

        this._cardElement = card;
        this._distanceElement = card.querySelector('.distance-value');
        return card;
    }

    _updateCard() {
        if (this._cardElement) {
            this._cardElement.querySelector('.customer-name').textContent = this._name;
            this._cardElement.querySelector('p:nth-child(1)').innerHTML = `<strong>Адрес:</strong> ${this._address}`;
            this._distanceElement.textContent = this._distance;
        }
    }
}