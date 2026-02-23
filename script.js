// script.js - Добавим немного интерактива для демо

document.addEventListener('DOMContentLoaded', function() {

    // Плавный скролл для якорей
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === "#") return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Обработка формы (демо-режим — просто алерт)
    const form = document.getElementById('demoForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за доверие! В демо-версии данные не отправляются. Свяжитесь напрямую через мессенджеры :)');
        });
    }

    // Простая анимация появления карточек при скролле
    const cards = document.querySelectorAll('.state-card');
    if (cards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });
        
        cards.forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // МОДАЛЬНЫЕ ОКНА ДЛЯ ОБРАЗОВАНИЯ
    const eduCards = document.querySelectorAll('.edu-card');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    const fullscreenOverlay = document.getElementById('fullscreen-overlay');
    
    // Открытие модального окна при клике на карточку
    eduCards.forEach(card => {
        card.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Закрытие по крестику в модальном окне
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });
    
    // Закрытие модального окна по клику вне его
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Закрываем все модальные окна
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
            // Закрываем полноэкранный режим
            if (fullscreenOverlay && fullscreenOverlay.style.display === 'block') {
                fullscreenOverlay.style.display = 'none';
                document.body.style.overflow = '';
            }
        }
    });
});

// Функция для открытия изображения в полноэкранном режиме
function openFullscreen(img) {
    const overlay = document.getElementById('fullscreen-overlay');
    const fullscreenImg = document.getElementById('fullscreen-image');
    if (overlay && fullscreenImg) {
        fullscreenImg.src = img.src;
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Функция для закрытия полноэкранного режима
function closeFullscreen() {
    const overlay = document.getElementById('fullscreen-overlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }
}
