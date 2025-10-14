// history.js
let allOrders = [];
let currentEditOrderId = null;

document.addEventListener('DOMContentLoaded', function() {
    loadOrders();
    initializeEventListeners();
});

function initializeEventListeners() {
    // Закрытие модальных окон при клике вне области
    window.addEventListener('click', function(event) {
        const editModal = document.getElementById('editOrderModal');
        if (event.target === editModal) {
            closeEditModal();
        }
    });
}

async function loadOrders() {
    try {
        showLoading();
        
        const response = await fetch('https://api-webtech.onrender.com/orders');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        allOrders = await response.json();
        
        if (allOrders.length === 0) {
            showNoOrdersMessage();
        } else {
            renderOrders(allOrders);
        }
        
    } catch (error) {
        console.error('Ошибка при загрузке заказов:', error);
        showError('Не удалось загрузить историю заказов. Пожалуйста, попробуйте позже.');
    }
}

function renderOrders(orders) {
    const mainElement = document.querySelector('main');
    
    const ordersHTML = `
        <div class="history-container">
            <h1 class="page-title">История заказов</h1>
            <div class="orders-list">
                ${orders.map(order => createOrderCard(order)).join('')}
            </div>
        </div>
    `;
    
    mainElement.innerHTML = ordersHTML;
}

function createOrderCard(order) {
    const orderDate = new Date(order.created_at).toLocaleString('ru-RU');
    
    return `
        <div class="order-card" data-order-id="${order.id}">
            <div class="order-header">
                <div>
                    <div class="order-id">Заказ #${order.id}</div>
                    <div class="order-date">${orderDate}</div>
                </div>
                <div class="order-actions">
                    <button class="btn btn-edit" onclick="openEditModal(${order.id})">
                        ✏️ Редактировать
                    </button>
                    <button class="btn btn-delete" onclick="deleteOrder(${order.id})">
                        🗑️ Удалить
                    </button>
                </div>
            </div>
            
            <div class="order-content">
                <div class="customer-info">
                    <div class="info-section">
                        <h3>Информация о клиенте</h3>
                        <div class="info-item">
                            <span class="info-label">Имя:</span>
                            <span class="info-value">${escapeHtml(order.customer_name)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Email:</span>
                            <span class="info-value">${escapeHtml(order.customer_email)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Телефон:</span>
                            <span class="info-value">${escapeHtml(order.customer_phone)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Компания:</span>
                            <span class="info-value">${order.company ? escapeHtml(order.company) : 'Не указана'}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Сотрудников:</span>
                            <span class="info-value">${order.employees ? escapeHtml(order.employees) : 'Не указано'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="order-details">
                    <div class="info-section">
                        <h3>Детали заказа</h3>
                        <div class="info-item">
                            <span class="info-label">Стоимость:</span>
                            <span class="info-value">${order.total_price ? escapeHtml(order.total_price) : 'Не указана'}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Описание:</span>
                        </div>
                        <div class="description-box">
                            ${escapeHtml(order.description).replace(/\n/g, '<br>')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function openEditModal(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;
    
    currentEditOrderId = orderId;
    
    // Создаем модальное окно если его нет
    let modal = document.getElementById('editOrderModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'editOrderModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">Редактировать заказ #${orderId}</h2>
                    <button class="close">&times;</button>
                </div>
                <form id="editOrderForm">
                    <div class="form-group">
                        <label for="editCustomerName">Имя клиента *</label>
                        <input type="text" id="editCustomerName" name="customer_name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="editCustomerEmail">Email *</label>
                        <input type="email" id="editCustomerEmail" name="customer_email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="editCustomerPhone">Телефон *</label>
                        <input type="tel" id="editCustomerPhone" name="customer_phone" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="editCompany">Компания</label>
                        <input type="text" id="editCompany" name="company">
                    </div>
                    
                    <div class="form-group">
                        <label for="editEmployees">Количество сотрудников</label>
                        <select id="editEmployees" name="employees">
                            <option value="">Не указано</option>
                            <option value="1-10">1-10</option>
                            <option value="11-50">11-50</option>
                            <option value="51-200">51-200</option>
                            <option value="201-500">201-500</option>
                            <option value="501+">501+</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="editTotalPrice">Стоимость</label>
                        <input type="text" id="editTotalPrice" name="total_price" placeholder="Например: от 120 000 ₽">
                    </div>
                    
                    <div class="form-group">
                        <label for="editDescription">Описание заказа *</label>
                        <textarea id="editDescription" name="description" required></textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn btn-cancel" onclick="closeEditModal()">Отмена</button>
                        <button type="submit" class="btn btn-save">Сохранить изменения</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Добавляем обработчики событий
        modal.querySelector('.close').addEventListener('click', closeEditModal);
        modal.querySelector('#editOrderForm').addEventListener('submit', handleEditFormSubmit);
    }
    
    // Заполняем форму данными
    document.getElementById('editCustomerName').value = order.customer_name;
    document.getElementById('editCustomerEmail').value = order.customer_email;
    document.getElementById('editCustomerPhone').value = order.customer_phone;
    document.getElementById('editCompany').value = order.company || '';
    document.getElementById('editEmployees').value = order.employees || '';
    document.getElementById('editTotalPrice').value = order.total_price || '';
    document.getElementById('editDescription').value = order.description;
    
    // Показываем модальное окно
    modal.style.display = 'block';
}

function closeEditModal() {
    const modal = document.getElementById('editOrderModal');
    if (modal) {
        modal.style.display = 'none';
    }
    currentEditOrderId = null;
}

async function handleEditFormSubmit(event) {
    event.preventDefault();
    
    if (!currentEditOrderId) return;
    
    const formData = new FormData(event.target);
    const updatedData = {
        customer_name: formData.get('customer_name'),
        customer_email: formData.get('customer_email'),
        customer_phone: formData.get('customer_phone'),
        company: formData.get('company'),
        description: formData.get('description'),
        employees: formData.get('employees'),
        total_price: formData.get('total_price')
    };
    
    try {
        const response = await fetch(`https://api-webtech.onrender.com/orders/${currentEditOrderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            showSuccess('Заказ успешно обновлен!');
            closeEditModal();
            loadOrders(); // Перезагружаем список
        } else {
            throw new Error(result.error || 'Ошибка при обновлении');
        }
        
    } catch (error) {
        console.error('Ошибка при обновлении заказа:', error);
        showError('Не удалось обновить заказ. Пожалуйста, попробуйте еще раз.');
    }
}

async function deleteOrder(orderId) {
    if (!confirm('Вы уверены, что хотите удалить этот заказ? Это действие нельзя отменить.')) {
        return;
    }
    
    try {
        const response = await fetch(`https://api-webtech.onrender.com/orders/${orderId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            showSuccess('Заказ успешно удален!');
            loadOrders(); // Перезагружаем список
        } else {
            throw new Error(result.error || 'Ошибка при удалении');
        }
        
    } catch (error) {
        console.error('Ошибка при удалении заказа:', error);
        showError('Не удалось удалить заказ. Пожалуйста, попробуйте еще раз.');
    }
}

// Вспомогательные функции
function showLoading() {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = `
        <div class="history-container">
            <div class="loading">
                <div>Загрузка истории заказов...</div>
                <div style="margin-top: 20px;">⏳</div>
            </div>
        </div>
    `;
}

function showNoOrdersMessage() {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = `
        <div class="history-container">
            <div class="no-orders">
                <h2>Заказов пока нет</h2>
                <p>Когда вы сделаете заказ, он появится здесь.</p>
                <a href="./order.html" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: rgb(0,0,55); color: white; text-decoration: none; border-radius: 8px;">
                    Сделать первый заказ
                </a>
            </div>
        </div>
    `;
}

function showError(message) {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = `
        <div class="history-container">
            <div class="error-message">
                <strong>Ошибка:</strong> ${message}
            </div>
            <button onclick="loadOrders()" style="padding: 10px 20px; background: rgb(0,0,55); color: white; border: none; border-radius: 5px; cursor: pointer;">
                Попробовать снова
            </button>
        </div>
    `;
}

function showSuccess(message) {
    // Создаем временное уведомление об успехе
    const notification = document.createElement('div');
    notification.className = 'success-message';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1001;
        max-width: 300px;
    `;
    notification.innerHTML = `<strong>Успех:</strong> ${message}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}