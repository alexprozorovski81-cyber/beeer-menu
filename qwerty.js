// Автоматическая подстройка под размер экрана
function adjustLayout() {
    try {
        const container = document.querySelector('.container');
        const screenHeight = window.innerHeight;
        
        console.log('Screen height:', screenHeight);
        
        // Удаляем все классы компактности
        container.classList.remove('compact-mode', 'super-compact');
        
        // Адаптивные настройки для телевизора
        if (screenHeight < 900) {
            container.classList.add('super-compact');
            console.log('Super compact mode for smaller TV');
        } else if (screenHeight < 1100) {
            container.classList.add('compact-mode');
            console.log('Compact mode for medium TV');
        } else {
            console.log('Full size for large TV');
        }
        
        // Проверяем вмещение и регулируем если нужно
        optimizeForTV();
        
    } catch (error) {
        console.error('Error in adjustLayout:', error);
    }
}

// Оптимизация для телевизора
function optimizeForTV() {
    const container = document.querySelector('.container');
    const containerHeight = container.scrollHeight;
    const screenHeight = window.innerHeight;
    
    console.log('TV optimization - Container:', containerHeight, 'Screen:', screenHeight);
    
    // Если контент не помещается, применяем постепенное уменьшение
    if (containerHeight > screenHeight) {
        console.log('Content too large, applying TV optimization...');
        
        const overflowRatio = containerHeight / screenHeight;
        console.log('Overflow ratio:', overflowRatio);
        
        // Постепенное уменьшение в зависимости от степени переполнения
        if (overflowRatio > 1.2) {
            container.classList.add('super-compact');
            console.log('Applied super-compact for TV');
        } else if (overflowRatio > 1.05) {
            container.classList.add('compact-mode');
            console.log('Applied compact-mode for TV');
        }
        
        // Финальная проверка и микро-настройка
        finalAdjustment();
    }
}

// Финальная тонкая настройка
function finalAdjustment() {
    const container = document.querySelector('.container');
    const containerHeight = container.scrollHeight;
    const screenHeight = window.innerHeight;
    
    // Если после всех настроек все еще не вмещается, делаем микро-регулировку
    if (containerHeight > screenHeight - 10) {
        console.log('Making micro-adjustments...');
        
        // Небольшое уменьшение отступов
        const beerItems = document.querySelectorAll('.beer-item');
        beerItems.forEach(item => {
            const currentHeight = parseInt(getComputedStyle(item).minHeight);
            item.style.minHeight = (currentHeight - 2) + 'px';
        });
        
        // Небольшое уменьшение шрифтов информации
        const beerInfos = document.querySelectorAll('.beer-info');
        beerInfos.forEach(info => {
            const currentSize = parseFloat(getComputedStyle(info).fontSize);
            info.style.fontSize = (currentSize * 0.95) + 'rem';
        });
    }
}

// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Первоначальная настройка
    setTimeout(adjustLayout, 100);
    
    // Дополнительная проверка после полной загрузки шрифтов и изображений
    setTimeout(adjustLayout, 500);
    setTimeout(adjustLayout, 1000);
    
    // Автоматическое обновление каждые 5 минут
    setTimeout(() => {
        window.location.reload();
    }, 300000);
});

// Обновляем при изменении размера окна
window.addEventListener('resize', adjustLayout);

// Предотвращаем масштабирование на ТВ
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

document.addEventListener('touchmove', function(e) {
    if(e.scale !== 1) {
        e.preventDefault();
    }
}, { passive: false });