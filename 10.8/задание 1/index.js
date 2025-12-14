        const thumbnails = document.querySelectorAll('.thumbnail');
        const fullContainer = document.getElementById('full-size-container');

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const imageUrl = this.getAttribute('data-full');
                
                fullContainer.innerHTML = '';
                const fullImage = document.createElement('img');
                fullImage.src = imageUrl;
                fullImage.style.maxWidth = '100%';
                fullImage.style.maxHeight = '100%';
                fullContainer.appendChild(fullImage);
            });
        });