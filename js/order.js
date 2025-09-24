// Глобальная переменная для хранения товаров в корзине
let cart = [];

// Функция открытия формы заказа услуги
function openOrderForm(serviceName, servicePrice) {
    // Добавляем услугу в корзину
    addToCart(serviceName, servicePrice);
}

// Функция добавления товара в корзину
function addToCart(name, price) {
    // Проверяем, нет ли уже такой услуги в корзине
    const existingItemIndex = cart.findIndex(item => item.name === name);
    
    if (existingItemIndex !== -1) {
        // Если услуга уже есть, увеличиваем количество
        cart[existingItemIndex].quantity += 1;
    } else {
        // Если услуги нет, добавляем новую
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    // Обновляем отображение корзины
    updateCartDisplay();
    
    // Показываем уведомление о добавлении
    showNotification(`Услуга "${name}" добавлена в корзину`);
}

// Функция удаления товара из корзины
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Функция обновления отображения корзины
function updateCartDisplay() {
    // Обновляем счетчик товаров в иконке корзины
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalCount;
    
    // Обновляем содержимое модального окна корзины (если оно открыто)
    updateCartModal();
}

// Функция обновления модального окна корзины
function updateCartModal() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-message">Корзина пуста</div>';
        cartTotalElement.textContent = '0 ₽';
        document.getElementById('checkoutBtn').style.display = 'none';
        return;
    }
    
    document.getElementById('checkoutBtn').style.display = 'block';
    
    // Формируем HTML для каждого товара в корзине
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        
        // Извлекаем числовое значение цены (убираем "от ", "₽" и т.д.)
        const priceMatch = item.price.match(/(\d+[\s\d]*)/);
        const numericPrice = priceMatch ? parseInt(priceMatch[0].replace(/\s/g, '')) : 0;
        const itemTotal = numericPrice * item.quantity;
        total += itemTotal;
        
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price} × ${item.quantity}</div>
            </div>
            <div class="cart-item-total">${itemTotal.toLocaleString()} ₽</div>
            <button class="remove-item" onclick="removeFromCart(${index})">×</button>
        `;
        
        cartItemsContainer.appendChild(itemElement);
    });
    
    cartTotalElement.textContent = `${total.toLocaleString()} ₽`;
}

// Функция показа/скрытия корзины
function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (modal.style.display === 'block') {
        closeCart();
    } else {
        openCart();
    }
}

function openCart() {
    document.getElementById('cartModal').style.display = 'block';
    updateCartModal();
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Функция оформления заказа из корзины
function checkoutFromCart() {
    // Закрываем корзину
    closeCart();
    
    // Формируем текст для поля описания задачи
    let servicesText = "Заказанные услуги:\n";
    cart.forEach(item => {
        servicesText += `- ${item.name} (${item.price}) × ${item.quantity}\n`;
    });
    
    // Открываем форму заказа
    openOrderFormFromCart(servicesText);
}

// Функция открытия формы заказа с предзаполненным описанием
function openOrderFormFromCart(servicesText) {
    // Заполняем стандартными значениями или оставляем пустыми
    document.getElementById('selectedService').textContent = 'Комплекс услуг';
    document.getElementById('selectedPrice').textContent = 'Рассчитывается индивидуально';
    
    // Предзаполняем поле описания
    const descriptionField = document.getElementById('description');
    descriptionField.value = servicesText;
    
    // Показываем модальное окно заказа
    document.getElementById('orderModal').style.display = 'block';
}

// Функция закрытия формы заказа
function closeOrderForm() {
    document.getElementById('orderModal').style.display = 'none';
}

// Функция показа уведомления
function showNotification(message) {
    // Создаем элемент уведомления, если его еще нет
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #2c3e50;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1001; /* Убедимся, что это меньше чем у модальных окон */
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            transition: opacity 0.3s;
            pointer-events: none; /* Это ключевое свойство - уведомление не будет перехватывать клики */
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.opacity = '1';
    
    // Автоматически скрываем через 3 секунды
    setTimeout(() => {
        notification.style.opacity = '0';
        
        // Полностью удаляем элемент после анимации исчезновения
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 1000);
}

// Закрытие модальных окон при клике вне их области
window.onclick = function(event) {
    const orderModal = document.getElementById('orderModal');
    const cartModal = document.getElementById('cartModal');
    
    if (event.target === orderModal) {
        closeOrderForm();
    }
    
    if (event.target === cartModal) {
        closeCart();
    }
}