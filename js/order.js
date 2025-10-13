// ======================================== Подгрузка данных с сервера ========================================
// Замените объявление servicesData и инициализацию на:
let servicesData = [];

// Подгрузка данных через JSON
async function loadServicesData() {
    try {
        const response = await fetch('https://api-webtech.onrender.com/');
        
        if (!response.ok) {
            throw new Error('Ошибка загрузки данных');
        }
        
        servicesData = await response.json();
        console.log('Данные успешно загружены:', servicesData);
        return true;
    } catch (error) {
        console.error('Ошибка загрузки данных услуг:', error);
        servicesData = getFallbackData();
        return false;
    }
}

// Fallback данные на случай ошибки
function getFallbackData() {
    return [
        {
            section: "audit",
            title: "Аудит и оценка безопасности",
            services: [
                {
                    id: "pentest",
                    name: "Пентест внешней инфраструктуры",
                    description: "Тестирование на проникновение внешних сетевых периметров и веб-приложений",
                    price: "от 120 000 ₽",
                    image: "img/services/pentest.jpg"
                }
                // ... минимальный набор данных
            ]
        }
    ];
}

// Функция для показа индикатора загрузки
function showLoadingIndicator() {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = `
        <div class="loading" style="text-align: center; padding: 50px;">
            <div style="font-size: 18px; color: rgb(0,0,55);">Загрузка услуг...</div>
            <div style="margin-top: 20px;">⏳</div>
        </div>
    `;
}

// Функция для показа сообщения об ошибке
function showErrorMessage() {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = `
        <div class="error-message" style="text-align: center; padding: 50px;">
            <div style="font-size: 24px; color: #e74c3c;">⚠️</div>
            <h3 style="color: #c0392b;">Ошибка загрузки данных</h3>
            <p>Не удалось загрузить список услуг. Пожалуйста, попробуйте обновить страницу.</p>
            <button onclick="location.reload()" style="padding: 10px 20px; background: rgb(0,0,55); color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 15px;">
                Обновить страницу
            </button>
        </div>
    `;
}

// ======================================== Фильтрация ========================================
// Функция для рендеринга фильтров
function renderFilters() {
    const mainElement = document.querySelector('main');
    const filtersHTML = `
        <section id="filters">
        <div class="filters-container">
            <div class="filter-group">
                <label for="categoryFilter">Категория:</label>
                <select id="categoryFilter">
                    <option value="all">Все категории</option>
                    <option value="audit">Аудит и оценка безопасности</option>
                    <option value="monitoring">Мониторинг и реагирование</option>
                    <option value="defence">Защита инфраструктуры</option>
                    <option value="policy">Политики безопасности</option>
                    <option value="consultation">Консультационные услуги</option>
                </select>
            </div>
            
            <div class="filter-group">
                <label for="priceFilter">Цена:</label>
                <select id="priceFilter">
                    <option value="all">Любая цена</option>
                    <option value="0-50000">до 50 000 ₽</option>
                    <option value="50000-100000">50 000 - 100 000 ₽</option>
                    <option value="100000-150000">100 000 - 150 000 ₽</option>
                    <option value="150000-200000">150 000 - 200 000 ₽</option>
                    <option value="200000+">от 200 000 ₽</option>
                </select>
            </div>
            
            <div class="filter-group">
                <label for="sortFilter">Сортировка:</label>
                <select id="sortFilter">
                    <option value="name">По названию (А-Я)</option>
                    <option value="name-desc">По названию (Я-А)</option>
                    <option value="price">По цене (возрастание)</option>
                    <option value="price-desc">По цене (убывание)</option>
                </select>
            </div>
            
            <button id="resetFilters" class="reset-btn">Сбросить фильтры</button>
        </div>
    </section>

    <section id="offers">
        <h2>Выгодные предложения</h2>
        <div class="offer-container">
            <div class="offer-group">
                <button class="offer-btn" onclick="toggleOffer(this)">Полный аудит</button>
                <div class="offer-content">
                    <p>Закажите все виды аудита и получите скидку в 10%</p>
                </div>
            </div>
            <div class="offer-group">
                <button class="offer-btn" onclick="toggleOffer(this)">Ввод политик ИБ</button>
                <div class="offer-content">
                    <p>Только запускаете ИБ? Закажите разработку ИБ политики и обучение персонала и получите скидку в 15%</p>
                </div>
            </div>
            <div class="offer-group">
                <button class="offer-btn" onclick="toggleOffer(this)">Веб-защита</button>
                <div class="offer-content">
                    <p>При заказе круглосуточного SOC и защиты от DDoS-атак, получите услугу "Защита веб-приложений" бесплатно</p>
                </div>
            </div>
        </div>
    </section>
    `;
    
    mainElement.innerHTML = filtersHTML;
    
    // Добавляем обработчики событий для фильтров
    document.getElementById('categoryFilter').addEventListener('change', applyFilters);
    document.getElementById('priceFilter').addEventListener('change', applyFilters);
    document.getElementById('sortFilter').addEventListener('change', applyFilters);
    document.getElementById('resetFilters').addEventListener('click', resetFilters);
}

// Глобальные переменные для фильтров
let currentFilters = {
    category: 'all',
    price: 'all',
    sort: 'name'
};


// Функция для применения фильтров
function applyFilters() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    currentFilters = {
        category: categoryFilter,
        price: priceFilter,
        sort: sortFilter
    };
    
    renderFilteredServices();
}

// Функция для фильтрации услуг
function filterServices() {
    let filteredData = JSON.parse(JSON.stringify(servicesData)); // Глубокая копия
    
    // Фильтрация по категории
    if (currentFilters.category !== 'all') {
        filteredData = filteredData.filter(section => 
            section.section === currentFilters.category
        );
    }
    
    // Фильтрация по цене и сортировка внутри каждой секции
    filteredData.forEach(section => {
        // Фильтрация услуг по цене
        if (currentFilters.price !== 'all') {
            section.services = section.services.filter(service => {
                const price = extractPrice(service.price);
                
                switch (currentFilters.price) {
                    case '0-50000':
                        return price <= 50000;
                    case '50000-100000':
                        return price >= 50000 && price <= 100000;
                    case '100000-150000':
                        return price >= 100000 && price <= 150000;
                    case '150000-200000':
                        return price >= 150000 && price <= 200000;
                    case '200000+':
                        return price >= 200000;
                    default:
                        return true;
                }
            });
        }
        
        // Сортировка услуг
        section.services.sort((a, b) => {
            const priceA = extractPrice(a.price);
            const priceB = extractPrice(b.price);
            
            switch (currentFilters.sort) {
                case 'name':
                    return a.name.localeCompare(b.name, 'ru');
                case 'name-desc':
                    return b.name.localeCompare(a.name, 'ru');
                case 'price':
                    return priceA - priceB;
                case 'price-desc':
                    return priceB - priceA;
                default:
                    return a.name.localeCompare(b.name, 'ru');
            }
        });
    });
    
    return filteredData;
}


// Функция для отображения сообщения об отсутствии результатов
function showNoResultsMessage() {
    return `
        <div class="no-results">
            <h3>Услуги не найдены</h3>
            <p>Попробуйте изменить параметры фильтрации</p>
            <button onclick="resetFilters()" class="reset-btn" style="margin-top: 15px;">Сбросить фильтры</button>
        </div>
    `;
}

// Функция для рендеринга отфильтрованных услуг
function renderFilteredServices() {
    const mainElement = document.querySelector('main');
    const filteredData = filterServices();
    
    // Удаляем старые секции услуг (кроме фильтров)
    const existingSections = mainElement.querySelectorAll('.service-section, .no-results');
    existingSections.forEach(section => section.remove());
    
    // Вставляем отфильтрованные секции после фильтров
    const filtersSection = document.getElementById('offers');
    
    let hasResults = false;
    const allSectionsHTML = filteredData.map(sectionData => {
        if (sectionData.services.length > 0) {
            hasResults = true;
            return createServiceSection(sectionData);
        }
        return '';
    }).join('');
    
    if (!hasResults) {
        filtersSection.insertAdjacentHTML('afterend', showNoResultsMessage());
    } else {
        filtersSection.insertAdjacentHTML('afterend', allSectionsHTML);
    }
}

// Функция сброса фильтров
function resetFilters() {
    document.getElementById('categoryFilter').value = 'all';
    document.getElementById('priceFilter').value = 'all';
    document.getElementById('sortFilter').value = 'name';
    
    currentFilters = {
        category: 'all',
        price: 'all',
        sort: 'name'
    };
    
    renderFilteredServices();
}

// ======================================== Создание карточек ========================================

// Функция для создания секции с услугами
function createServiceSection(sectionData) {
    if (sectionData.services.length === 0) {
        return ''; // Не показываем секции без услуг
    }
    
    const servicesHTML = sectionData.services.map(service => 
        createServiceCard(service)
    ).join('');
    
    return `
        <section id="${sectionData.section}" class="service-section">
            <h1>${sectionData.title}</h1>
            <div class="services">
                ${servicesHTML}
            </div>
        </section>
    `;
}

// Функция для создания карточки услуги
function createServiceCard(service) {
    return `
        <div class="card" data-category="${service.section}" data-price="${extractPrice(service.price)}">
            <div class="img-holder">
                <img src="${service.image}" alt="${service.name}" onerror="this.src='img/services/defence_template.jpg'">
            </div>
            <h3>${service.name}</h3>
            <p class="descryption">${service.description}</p>
            <hr>
            <p class="price">${service.price}</p>
            <div class="center">
                <button class="order" onclick="openOrderForm('${service.name.replace(/'/g, "\\'")}', '${service.price.replace(/'/g, "\\'")}')">Заказать</button>
            </div>
        </div>
    `;
}


// Функция для рендеринга всех секций на странице
function renderServices() {
    const mainElement = document.querySelector('main');
    
    const allSectionsHTML = servicesData.map(sectionData => 
        createServiceSection(sectionData)
    ).join('');
    
    mainElement.innerHTML = allSectionsHTML;
}


// Функция для извлечения числовой цены из строки
function extractPrice(priceString) {
    const priceMatch = priceString.match(/(\d+[\s\d]*)/);
    return priceMatch ? parseInt(priceMatch[0].replace(/\s/g, '')) : 0;
}



// ======================================== Корзина ========================================

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

    // Сохраняем в localStorage
    saveCartToStorage();
    
    // Обновляем отображение корзины
    updateCartDisplay();
    
    // Показываем уведомление о добавлении
    showNotification(`Услуга "${name}" добавлена в корзину`);
}

// Функция удаления товара из корзины
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToStorage();
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

// ======================================== Форма для заказа ========================================

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
            z-index: 1001;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            transition: opacity 0.3s;
            pointer-events: none;
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

// Всплывающий список с инфой об офферах
function toggleOffer(button) {
    const offerGroup = button.parentElement;
    const content = offerGroup.querySelector('.offer-content');
    const isActive = content.classList.contains('active');
    
    // Закрываем все открытые блоки
    document.querySelectorAll('.offer-content').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.offer-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Если блок был закрыт, открываем его
    if (!isActive) {
        content.classList.add('active');
        button.classList.add('active');
    }
}

// Закрытие при клике вне блока (опционально)
document.addEventListener('click', function(event) {
    if (!event.target.closest('.offer-group')) {
        document.querySelectorAll('.offer-content').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll('.offer-btn').forEach(btn => {
            btn.classList.remove('active');
        });
    }
});


// Функция закрытия модального окна и отправки формы
function closeOfferModalAndSubmit() {
    console.log('Закрытие модального окна и отправка формы');
    closeOfferModal();
    // Вызываем фактическую отправку формы
    actuallySubmitOrderForm();
}

// Обновленная функция отправки формы заказа
function submitOrderForm(event) {
    event.preventDefault();
    
    console.log('Проверяем предложения для корзины:', cart);
    
    // Проверяем предложения перед отправкой
    const applicableOffers = checkOffers(cart);
    
    if (applicableOffers.length > 0) {
        console.log('Найдены предложения:', applicableOffers);
        // Показываем модальное окно с предложениями
        showOfferModal(applicableOffers);
    } else {
        console.log('Предложений не найдено');
        // Если предложений нет, отправляем форму сразу
        actuallySubmitOrderForm();
    }
}

// Функция фактической отправки формы (оригинальная логика)
function actuallySubmitOrderForm() {
    console.log('Фактическая отправка формы');

    // Создаем скрытые поля для добавления данных в форму
    const form = document.getElementById('orderForm');
    
    // Добавляем информацию об услуге как скрытое поле
    let serviceInput = form.querySelector('input[name="serviceInfo"]');
    if (!serviceInput) {
        serviceInput = document.createElement('input');
        serviceInput.type = 'hidden';
        serviceInput.name = 'serviceInfo';
        form.appendChild(serviceInput);
    }
    serviceInput.value = document.getElementById('selectedService').textContent + ' - ' + document.getElementById('selectedPrice').textContent;

    // Отправляем форму обычным способом
    form.submit();
    
    // Показываем уведомление об успешной отправке
    showNotification('Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.');
    
    // Закрываем модальное окно
    closeOrderForm();
    
    // Очищаем корзину
    clearCartFromStorage();
    cart = [];
    updateCartDisplay();
}

// Обновленная функция для обновления формы заказа из корзины
function updateOrderFormFromCart() {
    if (document.getElementById('orderModal') && document.getElementById('orderModal').style.display === 'block') {
        // Если форма заказа открыта, обновляем ее
        const descriptionField = document.getElementById('description');
        let cartText = "Заказанные услуги:\n";
        cart.forEach(item => {
            cartText += `- ${item.name} (${item.price}) × ${item.quantity}\n`;
        });
        descriptionField.value = cartText;
        
        document.getElementById('selectedService').textContent = cart.length === 1 ? cart[0].name : 'Комплекс услуг';
        document.getElementById('selectedPrice').textContent = cart.length === 1 ? cart[0].price : 'Рассчитывается индивидуально';
    }
}

// ======================================== Проверка акций ========================================

// Функция для проверки предложений и поиска недостающих услуг
function checkOffers(cartItems) {
    const offers = [
        {
            name: "Полный аудит",
            requiredServices: ["Пентест внешней инфраструктуры", "Аудит внутренней сети", "Аудит на соответствие 152-ФЗ"],
            discount: "10%",
            description: "Закажите все виды аудита и получите скидку в 10%",
            missingServices: []
        },
        {
            name: "Ввод политик ИБ", 
            requiredServices: ["Разработка политик ИБ", "Обучение сотрудников"],
            discount: "15%",
            description: "Только запускаете ИБ? Закажите разработку ИБ политики и обучение персонала и получите скидку в 15%",
            missingServices: []
        },
        {
            name: "Веб-защита",
            requiredServices: ["Круглосуточный SOC", "Защита от DDoS-атак", "Защита веб-приложений"],
            discount: "бесплатно",
            description: "При заказе круглосуточного SOC и защиты от DDoS-атак, получите услугу 'Защита веб-приложений' бесплатно",
            missingServices: []
        }
    ];

    // Проверяем каждое предложение
    const applicableOffers = offers.map(offer => {
        const cartServiceNames = cartItems.map(item => item.name);
        offer.missingServices = offer.requiredServices.filter(
            service => !cartServiceNames.includes(service)
        );
        
        // Предложение применимо, если есть хотя бы одна услуга из requiredServices
        // но не все (иначе предложение уже выполнено)
        const hasSomeServices = offer.requiredServices.some(
            service => cartServiceNames.includes(service)
        );
        const hasAllServices = offer.missingServices.length === 0;
        
        return {
            ...offer,
            isApplicable: hasSomeServices && !hasAllServices,
            progress: Math.round((1 - offer.missingServices.length / offer.requiredServices.length) * 100)
        };
    }).filter(offer => offer.isApplicable);

    return applicableOffers;
}

// Функция для показа модального окна с предложениями
function showOfferModal(offers) {
    // Сначала закрываем предыдущее модальное окно, если оно есть
    closeOfferModal();
    
    const modal = document.createElement('div');
    modal.id = 'offerModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1002;
    `;

    let offersHTML = '';
    
    if (offers.length > 0) {
        offersHTML = `
            <h3 style="color: rgb(0,0,55); margin-top: 0;">Специальные предложения для вас!</h3>
            <p>Добавьте недостающие услуги и получите выгоду:</p>
            ${offers.map(offer => `
                <div class="offer-suggestion" style="border: 2px solid rgb(0,0,55); border-radius: 15px; padding: 15px; margin: 15px 0; background: #f9f9f9;">
                    <h4 style="margin-top: 0; color: rgb(0,0,55);">${offer.name}</h4>
                    <p>${offer.description}</p>
                    <div style="background: #ecf0f1; padding: 10px; border-radius: 5px; margin: 10px 0;">
                        <strong>Недостающие услуги для получения скидки ${offer.discount}:</strong>
                        <ul style="margin: 10px 0; padding-left: 20px;">
                            ${offer.missingServices.map(service => 
                                `<li>${service}</li>`
                            ).join('')}
                        </ul>
                    </div>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        ${offer.missingServices.map(service => 
                            `<button onclick="addMissingService('${service.replace(/'/g, "\\'")}')" 
                                     style="padding: 8px 12px; background: rgb(0,0,55); color: white; border: none; border-radius: 20px; cursor: pointer; border: 1px solid rgb(60,60,95);">
                                Добавить "${service}"
                            </button>`
                        ).join('')}
                    </div>
                    <div style="margin-top: 10px; font-size: 12px; color: #7f8c8d;">
                        Прогресс: ${offer.progress}% (у вас ${offer.requiredServices.length - offer.missingServices.length} из ${offer.requiredServices.length})
                    </div>
                </div>
            `).join('')}
        `;
    }

    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 10px; max-width: 600px; max-height: 80vh; overflow-y: auto; margin: 20px; position: relative;">
            ${offersHTML}
            <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap;">
                <button onclick="closeOfferModalAndSubmit()" 
                        style="padding: 10px 20px; background: #2ecc71; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Отправить как есть
                </button>
                <button onclick="closeOfferModal()" 
                        style="padding: 10px 20px; background: #95a5a6; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Вернуться к редактированию
                </button>
            </div>
        </div>
    `;

    // Добавляем обработчик клика вне модального окна
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeOfferModal();
        }
    });

    document.body.appendChild(modal);
    
    // Блокируем прокрутку основного контента
    document.body.style.overflow = 'hidden';
}


// Функция для добавления недостающей услуги
function addMissingService(serviceName) {
    console.log('Добавление услуги:', serviceName);
    
    // Находим услугу в данных
    let serviceToAdd = null;
    
    servicesData.forEach(section => {
        const service = section.services.find(s => s.name === serviceName);
        if (service) {
            serviceToAdd = service;
        }
    });

    if (serviceToAdd) {
        // Добавляем услугу в корзину
        addToCart(serviceToAdd.name, serviceToAdd.price);
        
        // Показываем уведомление
        showNotification(`Услуга "${serviceName}" добавлена в корзину!`);
        
        // Закрываем модальное окно предложений
        closeOfferModal();
        
        // Обновляем форму заказа
        updateOrderFormFromCart();
    } else {
        console.warn('Услуга не найдена:', serviceName);
        showNotification('Ошибка: услуга не найдена');
    }
}

// Функция закрытия модального окна предложений
function closeOfferModal() {
    const modal = document.getElementById('offerModal');
    if (modal) {
        modal.remove();
        // Восстанавливаем прокрутку
        document.body.style.overflow = '';
        console.log('Модальное окно предложений закрыто');
    }
}

// Функция для скрытия индикатора загрузки
function hideLoadingIndicator() {
    // Автоматически скрывается при рендеринге контента
}

window.onclick = function(event) {
    const orderModal = document.getElementById('orderModal');
    const cartModal = document.getElementById('cartModal');
    const offerModal = document.getElementById('offerModal');
    
    if (event.target === orderModal) {
        closeOrderForm();
    }
    
    if (event.target === cartModal) {
        closeCart();
    }
    
    if (event.target === offerModal) {
        closeOfferModal();
    }
}

// ======================================== Сохранение данных локально ========================================

// Функция для сохранения корзины в localStorage
function saveCartToStorage() {
    localStorage.setItem('securityServicesCart', JSON.stringify(cart));
}

// Функция для загрузки корзины из localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('securityServicesCart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            // Проверяем, что загруженные данные имеют правильную структуру
            if (!Array.isArray(cart)) {
                cart = [];
            }
        } catch (error) {
            console.error('Ошибка при загрузке корзины из localStorage:', error);
            cart = [];
        }
    }
    updateCartDisplay();
}

// Функция для очистки корзины в localStorage
function clearCartFromStorage() {
    localStorage.removeItem('securityServicesCart');
}

// ======================================== DOM ========================================

document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM загружен, начинаем инициализацию...');
    
    // Загружаем корзину из localStorage
    loadCartFromStorage();
    console.log('Корзина загружена:', cart);

    // Показываем индикатор загрузки
    showLoadingIndicator();

    // Инициализация услуг
    renderServices();
    
    // Загружаем данные
    const success = await loadServicesData();
    console.log('Данные загружены успешно:', success, 'Данные:', servicesData);

    if (success && servicesData.length > 0) {
        // Рендерим фильтры и услуги
        renderFilters();
        renderFilteredServices();
        console.log('Услуги отрендерены');
    } else {
        // Показываем сообщение об ошибке
        showErrorMessage();
        console.error('Не удалось загрузить данные или данные пустые');
    }

    // Добавляем обработчик для формы заказа
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(event) {
            submitOrderForm(event);
        });
    }
});
