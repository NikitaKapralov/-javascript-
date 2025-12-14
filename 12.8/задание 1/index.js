        document.addEventListener('DOMContentLoaded', function() {
            const giftArr = [
                {
                    title: "Скидка 20% на первую покупку в нашем магазине!",
                    icon: "🎉"
                },
                {
                    title: "Скидка 10% на всё!",
                    icon: "💰"
                },
                {
                    title: "Подарок при первой покупке в нашем магазине!",
                    icon: "🎁"
                },
                {
                    title: "Бесплатная доставка для вас!",
                    icon: "🚚"
                },
                {
                    title: "Сегодня день больших скидок!",
                    icon: "🔥"
                }
            ];
            
            const popupOverlay = document.getElementById('popupOverlay');
            const popupTitle = document.getElementById('popupTitle');
            const popupIcon = document.getElementById('popupIcon');
            const popupButton = document.getElementById('popupButton');
            const popupClose = document.getElementById('popupClose');
            
            function getRandomGift() {
                const randomIndex = Math.floor(Math.random() * giftArr.length);
                return giftArr[randomIndex];
            }
            
            function createGiftPopup() {
                const randomGift = getRandomGift();
                
                popupTitle.textContent = randomGift.title;
                popupIcon.textContent = randomGift.icon;
                
                popupOverlay.style.display = 'flex';
            }
            
            function closeGiftPopup() {
                popupOverlay.style.display = 'none';
            }
            
            popupButton.addEventListener('click', closeGiftPopup);
            
            popupClose.addEventListener('click', closeGiftPopup);
            
            popupOverlay.addEventListener('click', function(event) {
                if (event.target === popupOverlay) {
                    closeGiftPopup();
                }
            });
            
            setTimeout(createGiftPopup, 3000);
        });