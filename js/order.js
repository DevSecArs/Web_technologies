// Данные услуг
const servicesData = [
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
            },
            {
                id: "audit-net",
                name: "Аудит внутренней сети",
                description: "Анализ защищенности внутренней инфраструктуры и выявление уязвимостей",
                price: "от 150 000 ₽",
                image: "img/services/audit-net.jpg"
            },
            {
                id: "audit-fz",
                name: "Аудит на соответствие 152-ФЗ",
                description: "Проверка соответствия требованиям законодательства о защите персональных данных",
                price: "от 90 000 ₽",
                image: "img/services/audit-fz.jpg"
            }
        ]
    },
    {
        section: "monitoring",
        title: "Мониторинг и реагирование",
        services: [
            {
                id: "soc",
                name: "Круглосуточный SOC",
                description: "Круглосуточный мониторинг событий информационной безопасности",
                price: "от 200 000 ₽/мес",
                image: "img/services/SOC.jpg"
            },
            {
                id: "incident",
                name: "Реагирование на инциденты",
                description: "Оперативное реагирование и расследование киберинцидентов",
                price: "от 80 000 ₽/инцидент",
                image: "img/services/incident.jpg"
            },
            {
                id: "vul-control",
                name: "Управление уязвимостями",
                description: "Постоянный мониторинг, оценка и устранение уязвимостей",
                price: "от 100 000 ₽/мес",
                image: "img/services/vul_control.png"
            }
        ]
    },
    {
        section: "defence",
        title: "Защита инфраструктуры",
        services: [
            {
                id: "ddos",
                name: "Защита от DDoS-атак",
                description: "Организация защиты от распределенных атак типа 'отказ в обслуживании'",
                price: "от 50 000 ₽/мес",
                image: "img/services/defence_template.jpg"
            },
            {
                id: "firewall",
                name: "Настройка межсетевых экранов",
                description: "Проектирование и настройка систем сетевой защиты",
                price: "от 70 000 ₽",
                image: "img/services/firewall.png"
            },
            {
                id: "web-defence",
                name: "Защита веб-приложений",
                description: "Внедрение WAF (Web Application Firewall) для защиты веб-приложений",
                price: "от 120 000 ₽",
                image: "img/services/defence_template.jpg"
            }
        ]
    },
    {
        section: "policy",
        title: "Создание и внедрение политик безопасности",
        services: [
            {
                id: "policy-dev",
                name: "Разработка политик ИБ",
                description: "Создание регламентов и политик информационной безопасности",
                price: "от 80 000 ₽",
                image: "img/services/defence_template.jpg"
            },
            {
                id: "training",
                name: "Обучение сотрудников",
                description: "Проведение тренингов по кибербезопасности для сотрудников",
                price: "от 40 000 ₽",
                image: "img/services/defence_template.jpg"
            },
            {
                id: "access-control",
                name: "Организация управления доступом",
                description: "Построение системы управления правами доступа пользователей",
                price: "от 100 000 ₽",
                image: "img/services/defence_template.jpg"
            }
        ]
    },
    {
        section: "consultation",
        title: "Консультационные услуги",
        services: [
            {
                id: "consult",
                name: "Консультации по ИБ",
                description: "Экспертные консультации по вопросам информационной безопасности",
                price: "от 5 000 ₽/час",
                image: "img/services/defence_template.jpg"
            },
            {
                id: "architecture",
                name: "Разработка архитектуры безопасности",
                description: "Проектирование безопасной ИТ-инфраструктуры предприятия",
                price: "от 180 000 ₽",
                image: "img/services/defence_template.jpg"
            },
            {
                id: "certification",
                name: "Подготовка к сертификации",
                description: "Подготовка предприятия к сертификации по стандартам ИБ",
                price: "от 150 000 ₽",
                image: "img/services/defence_template.jpg"
            }
        ]
    }
];

// Функция для создания карточки услуги
function createServiceCard(service) {
    return `
        <div class="card">
            <div class="img-holder">
                <img src="${service.image}" alt="${service.name}">
            </div>
            <h3>${service.name}</h3>
            <p class="descryption">${service.description}</p>
            <hr>
            <p class="price">${service.price}</p>
            <div class="center">
                <button class="order" onclick="openOrderForm('${service.name}', '${service.price}')">Заказать</button>
            </div>
        </div>
    `;
}

// Функция для создания секции с услугами
function createServiceSection(sectionData) {
    // Сортируем услуги в алфавитном порядке по названию
    const sortedServices = sectionData.services.sort((a, b) => 
        a.name.localeCompare(b.name, 'ru')
    );
    
    const servicesHTML = sortedServices.map(service => 
        createServiceCard(service)
    ).join('');
    
    return `
        <section id="${sectionData.section}">
            <h1>${sectionData.title}</h1>
            <div class="services">
                ${servicesHTML}
            </div>
        </section>
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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    renderServices();
});


// Глобальные переменные для фильтров
let currentFilters = {
    category: 'all',
    price: 'all',
    sort: 'name'
};

// Функция для извлечения числовой цены из строки
function extractPrice(priceString) {
    const priceMatch = priceString.match(/(\d+[\s\d]*)/);
    return priceMatch ? parseInt(priceMatch[0].replace(/\s/g, '')) : 0;
}

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

// Функция для создания карточки услуги (обновленная)
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

// Функция для создания секции с услугами (обновленная)
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

// Инициализация при загрузке страницы (обновленная)
document.addEventListener('DOMContentLoaded', function() {
    // Сначала рендерим фильтры
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
    
    // Затем рендерим услуги
    renderFilteredServices();
    
    // Добавляем обработчики событий для фильтров
    document.getElementById('categoryFilter').addEventListener('change', applyFilters);
    document.getElementById('priceFilter').addEventListener('change', applyFilters);
    document.getElementById('sortFilter').addEventListener('change', applyFilters);
    document.getElementById('resetFilters').addEventListener('click', resetFilters);
});

// Остальной код из вашего оригинального файла остается без изменений:
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