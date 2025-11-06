// Функция адаптации меню для телевизора
function adjustMenuForTV() {
    console.log('Starting TV menu adjustment...');
    
    const container = document.querySelector('.container');
    if (!container) {
        console.error('Container not found!');
        return;
    }
    
    const screenHeight = window.innerHeight;
    const viewportHeight = document.documentElement.clientHeight;
    
    console.log('Screen height:', screenHeight, 'Viewport height:', viewportHeight);
    
    // Удаляем все предыдущие классы компактности
    container.classList.remove('tv-compact-mode', 'tv-ultra-compact', 'compact-mode', 'super-compact', 'ultra-compact', 'emergency-mode');
    
    // Принудительно применяем компактный режим для ТВ
    setTimeout(() => {
        const containerRect = container.getBoundingClientRect();
        const containerVisibleHeight = containerRect.height;
        
        console.log('Container visible height:', containerVisibleHeight);
        
        // Проверяем, выходит ли контент за пределы экрана
        if (containerVisibleHeight > screenHeight * 0.95 || container.scrollHeight > screenHeight) {
            console.log('Content overflow detected, applying TV compact mode');
            container.classList.add('tv-compact-mode');
            
            // Дополнительная проверка после применения стилей
            setTimeout(() => {
                const newContainerRect = container.getBoundingClientRect();
                if (newContainerRect.height > screenHeight * 0.95) {
                    console.log('Still overflow, applying TV ultra compact mode');
                    container.classList.remove('tv-compact-mode');
                    container.classList.add('tv-ultra-compact');
                }
            }, 100);
        } else {
            console.log('Content fits perfectly');
        }
    }, 100);
}

// Упрощенная функция принудительного вмещения
function forceTVFit() {
    const container = document.querySelector('.container');
    const screenHeight = window.innerHeight;
    
    console.log('Force TV fit, screen height:', screenHeight);
    
    // Немедленно применяем компактный режим
    container.classList.remove('tv-compact-mode', 'tv-ultra-compact');
    container.classList.add('tv-ultra-compact');
    
    console.log('Applied TV ultra compact mode');
}

// Инициализация для телевизора
document.addEventListener('DOMContentLoaded', function() {
    console.log('TV DOM loaded, initializing...');
    
    // Более агрессивная настройка для ТВ
    setTimeout(forceTVFit, 100);
    setTimeout(adjustMenuForTV, 500);
    
    // Финальная проверка
    setTimeout(() => {
        const container = document.querySelector('.container');
        const screenHeight = window.innerHeight;
        const containerRect = container.getBoundingClientRect();
        
        console.log('Final check - Container:', containerRect.height, 'Screen:', screenHeight);
        
        if (containerRect.height > screenHeight) {
            console.log('Final adjustment needed');
            forceTVFit();
        }
    }, 1000);
});

// Адаптация при изменении размера окна
window.addEventListener('resize', function() {
    console.log('TV window resized');
    setTimeout(adjustMenuForTV, 50);
    setTimeout(forceTVFit, 150);
});

// Автоматическое обновление каждые 10 минут
setInterval(function() {
    console.log('TV auto-refresh');
    window.location.reload();
}, 600000);

// Отключаем масштабирование
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

document.addEventListener('touchmove', function(e) {
    if (e.scale !== 1) {
        e.preventDefault();
    }
}, { passive: false });

// Устанавливаем правильный viewport для ТВ
function setTVViewport() {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
}

setTVViewport();