        document.addEventListener('DOMContentLoaded', function() {
            const cardTextInput = document.getElementById('cardText');
            const cardColorSelect = document.getElementById('cardColor');
            const cardElement = document.getElementById('card');
            
            cardTextInput.addEventListener('input', function() {
                const text = this.value.trim();
                cardElement.textContent = text || "Ваш текст здесь";
            });
            
            cardTextInput.addEventListener('focus', function() {
                this.style.borderColor = '#3498db';
                this.style.backgroundColor = '#f0f8ff';
            });
            
            cardTextInput.addEventListener('blur', function() {
                this.style.borderColor = '#ddd';
                this.style.backgroundColor = 'white';
            });
            
            cardColorSelect.addEventListener('change', function() {
                const selectedColor = this.value;
                cardElement.style.backgroundColor = selectedColor;
            });
        });