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
            // Здесь можно добавить код для реальной отправки (fetch)
        });
    }

    // Простая анимация появления карточек при скролле
    // (В реальном проекте лучше использовать Intersection Observer)
    const cards = document.querySelectorAll('.state-card');
    
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

});