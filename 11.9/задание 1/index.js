
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('userSurveyForm');
            const ratingSlider = document.getElementById('serviceRating');
            const ratingValue = document.getElementById('ratingValue');
            const resultsDiv = document.getElementById('results');
            
            ratingSlider.addEventListener('input', function() {
                ratingValue.textContent = this.value;
            });
            
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                
                document.querySelectorAll('.error-message').forEach(el => {
                    el.style.display = 'none';
                });
                
                let isValid = true;
                
                const name = document.getElementById('userName').value.trim();
                if (!name) {
                    document.getElementById('userNameError').style.display = 'block';
                    isValid = false;
                }
                
                const email = document.getElementById('userEmail').value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email || !emailRegex.test(email)) {
                    document.getElementById('userEmailError').style.display = 'block';
                    isValid = false;
                }
                
                const genderSelected = document.querySelector('input[name="gender"]:checked');
                if (!genderSelected) {
                    document.getElementById('genderError').style.display = 'block';
                    isValid = false;
                }
                
                if (isValid) {
                    displayResults();
                }
            });
            
            function displayResults() {
                const name = document.getElementById('userName').value;
                const email = document.getElementById('userEmail').value;
                const gender = document.querySelector('input[name="gender"]:checked').value;
                const rating = ratingSlider.value;
                const comments = document.getElementById('userComments').value;
                
                const interestCheckboxes = document.querySelectorAll('input[name="interests"]:checked');
                const interests = Array.from(interestCheckboxes).map(cb => cb.value);
                
                document.getElementById('resultName').textContent = `Имя: ${name}`;
                document.getElementById('resultEmail').textContent = `Email: ${email}`;
                document.getElementById('resultGender').textContent = `Пол: ${gender}`;
                document.getElementById('resultRating').textContent = `Оценка сервиса: ${rating}/10`;
                document.getElementById('resultInterests').textContent = `Интересы: ${interests.join(', ') || 'не выбраны'}`;
                document.getElementById('resultComments').textContent = `Комментарии: ${comments || 'нет'}`;
                
                resultsDiv.style.display = 'block';
            }
        });