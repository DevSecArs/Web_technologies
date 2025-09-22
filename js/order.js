// Функции для работы с модальным окном
function openOrderForm(service, price) {
    document.getElementById('selectedService').textContent = service;
    document.getElementById('selectedPrice').textContent = price;
    document.getElementById('orderModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeOrderForm() {
    document.getElementById('orderModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target == modal) {
        closeOrderForm();
    }
}