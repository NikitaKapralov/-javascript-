        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('deliveryForm');
            const tableBody = document.getElementById('productsTableBody');
            
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                
                document.querySelectorAll('.error-message').forEach(el => {
                    el.style.display = 'none';
                });
                
                let isValid = true;
                
                const name = document.getElementById('productName').value.trim();
                if (name.length < 2 || name.length > 50) {
                    document.getElementById('productNameError').style.display = 'block';
                    isValid = false;
                }
                
                const weight = parseFloat(document.getElementById('productWeight').value);
                if (isNaN(weight) || weight <= 0) {
                    document.getElementById('productWeightError').style.display = 'block';
                    isValid = false;
                }
                
                const distance = parseFloat(document.getElementById('deliveryDistance').value);
                if (isNaN(distance) || distance <= 0) {
                    document.getElementById('deliveryDistanceError').style.display = 'block';
                    isValid = false;
                }
                
                if (isValid) {
                    addProductToTable(name, weight, distance);
                    form.reset(); 
                }
            });
            
            function addProductToTable(name, weight, distance) {
                const cost = (weight * distance) / 10;
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${name}</td>
                    <td>${weight.toFixed(1)}</td>
                    <td>${distance}</td>
                    <td>${cost.toFixed(2)} руб.</td>
                `;
                
                tableBody.appendChild(row);
            }
        });