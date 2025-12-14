        document.addEventListener('DOMContentLoaded', function() {
            const promocodeObj = {
                promocode: "PROM50",
                gift: "Скидка 50%"
            };
            
            const promoForm = document.getElementById('promoForm');
            const promoInput = document.getElementById('promoInput');
            const promoCard = document.getElementById('promoCard');
            const submitButton = document.getElementById('submitButton');
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');
            const successMessageText = document.getElementById('successMessageText');
            
            function getCookie() {
                return document.cookie.split('; ').reduce((acc, item) => {
                    const [name, value] = item.split('=');
                    acc[name] = value;
                    return acc;
                }, {});
            }
            
            function setCookie(name, value, days) {
                const expires = new Date();
                expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
                document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
            }
            
            function deleteCookie(name) {
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            }
            
            function checkPromoCode(code) {
                return code.trim().toUpperCase() === promocodeObj.promocode;
            }
            
            function showSuccess() {
                errorMessage.style.display = 'none';
                
                successMessageText.textContent = promocodeObj.gift;
                successMessage.style.display = 'block';
                
                promoCard.classList.remove('error');
                promoCard.classList.add('active');
                submitButton.classList.add('success');
                submitButton.textContent = 'Промокод активирован';
                
                promoInput.disabled = true;
                promoInput.classList.add('valid');
                
                setCookie('activePromoCode', promocodeObj.promocode, 30);
                setCookie('activePromoGift', promocodeObj.gift, 30);
            }
            
            function showError() {
                successMessage.style.display = 'none';
                
                errorMessage.style.display = 'block';
                
                promoCard.classList.remove('active');
                promoCard.classList.add('error');
                
                submitButton.classList.remove('success');
                submitButton.textContent = 'Активировать промокод';
                
                promoInput.disabled = false;
                promoInput.classList.add('invalid');
                
                deleteCookie('activePromoCode');
                deleteCookie('activePromoGift');
            }
            
            function loadPromoFromCookie() {
                const cookie = getCookie();
                
                if (cookie.activePromoCode && cookie.activePromoGift) {
                    if (checkPromoCode(cookie.activePromoCode)) {
                        promoInput.value = cookie.activePromoCode;
                        
                        showSuccess();
                    } else {
                        deleteCookie('activePromoCode');
                        deleteCookie('activePromoGift');
                    }
                }
            }
            
            promoForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                const enteredCode = promoInput.value.trim();
                
                if (!enteredCode) {
                    promoInput.classList.add('invalid');
                    return;
                }
                
                if (checkPromoCode(enteredCode)) {
                    showSuccess();
                } else {
                    showError();
                }
            });
            
            promoInput.addEventListener('input', function() {
                this.classList.remove('invalid', 'valid');
                if (errorMessage.style.display === 'block') {
                    errorMessage.style.display = 'none';
                    promoCard.classList.remove('error');
                }
            });
            
            loadPromoFromCookie();
        });