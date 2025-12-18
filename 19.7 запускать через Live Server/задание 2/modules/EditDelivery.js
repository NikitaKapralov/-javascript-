import { Delivery } from './Delivery.js';

export class EditDelivery extends Delivery {
    constructor(name, address, distance, status = 'delivery') {
        super(name, address, distance);
        this._status = status;
    }

    get status() {
        return this._status;
    }

    set status(newStatus) {
        this._status = newStatus;
        this._updateCard();
        this._updateStatusStyle();
    }

    createCardElement() {
        const card = super.createCardElement();
        
        const statusDiv = document.createElement('div');
        statusDiv.className = 'delivery-status';
        statusDiv.textContent = this._getStatusText();
        card.querySelector('.delivery-body').appendChild(statusDiv);

        const editButton = document.createElement('button');
        editButton.className = 'edit-btn';
        editButton.textContent = 'Изменить';
        editButton.addEventListener('click', () => this._openEditModal());
        card.appendChild(editButton);

        this._cardElement = card;
        this._statusElement = statusDiv;
        
        this._updateStatusStyle();
        
        return card;
    }

    _getStatusText() {
        const statusMap = {
            'delivery': 'Доставляется',
            'delivered': 'Доставлен',
            'canceled': 'Отменён'
        };
        return statusMap[this._status] || this._status;
    }

    _updateStatusStyle() {
        if (!this._cardElement) return;
        
        this._cardElement.classList.remove('status-delivery', 'status-delivered', 'status-canceled');
        this._cardElement.classList.add(`status-${this._status}`);
        
        if (this._statusElement) {
            this._statusElement.textContent = this._getStatusText();
        }
    }

    _updateCard() {
        super._updateCard();
        if (this._statusElement) {
            this._statusElement.textContent = this._getStatusText();
        }
    }

    _openEditModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Редактировать доставку</h2>
                <form id="edit-form">
                    <label>Имя:</label>
                    <input type="text" id="edit-name" value="${this._name}" required>
                    
                    <label>Адрес:</label>
                    <input type="text" id="edit-address" value="${this._address}" required>
                    
                    <label>Расстояние (км):</label>
                    <input type="number" id="edit-distance" value="${this._distance}" min="1" required>
                    
                    <label>Статус:</label>
                    <select id="edit-status">
                        <option value="delivery" ${this._status === 'delivery' ? 'selected' : ''}>Доставляется</option>
                        <option value="delivered" ${this._status === 'delivered' ? 'selected' : ''}>Доставлен</option>
                        <option value="canceled" ${this._status === 'canceled' ? 'selected' : ''}>Отменён</option>
                    </select>
                    
                    <div class="modal-buttons">
                        <button type="submit" class="btn save-btn">Сохранить</button>
                        <button type="button" class="btn cancel-btn">Отмена</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        const form = modal.querySelector('#edit-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.name = document.getElementById('edit-name').value;
            this.address = document.getElementById('edit-address').value;
            this.distance = parseInt(document.getElementById('edit-distance').value);
            this.status = document.getElementById('edit-status').value;
            document.body.removeChild(modal);
        });

        modal.querySelector('.cancel-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
}