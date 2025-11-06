// Функция адаптации меню под размер экрана
function adjustMenuForTV() {
    console.log('Starting menu adjustment...');
    
    const container = document.querySelector('.container');
    if (!container) {
        console.error('Container not found!');
        return;
    }
    
    const screenHeight = window.innerHeight;
    const containerHeight = container.scrollHeight;
    
    console.log('Screen height:', screenHeight, 'Container height:', containerHeight);
    
    // Удаляем все предыдущие классы компактности
    container.classList.remove('compact-mode', 'super-compact', 'ultra-compact', 'emergency-mode');
    
    // Проверяем, вмещается ли контент
    if (containerHeight > screenHeight) {
        const overflowRatio = containerHeight / screenHeight;
        console.log('Overflow ratio:', overflowRatio);
        
        // Определяем необходимый уровень компактности
        if (overflowRatio > 1.3) {
            container.classList.add('emergency-mode');
            console.log('Applied EMERGENCY mode');
        } else if (overflowRatio > 1.2) {
            container.classList.add('ultra-compact');
            console.log('Applied ULTRA compact mode');
        } else if (overflowRatio > 1.1) {
            container.classList.add('super-compact');
            console.log('Applied SUPER compact mode');
        } else {
            container.classList.add('compact-mode');
            console.log('Applied compact mode');
        }
        
        // Проверяем результат после применения стилей
        setTimeout(() => {
            const newContainerHeight = container.scrollHeight;
            const newScreenHeight = window.innerHeight;
            console.log('After adjustment - Container:', newContainerHeight, 'Screen:', newScreenHeight);
            
            // Если все еще не вмещается, применяем более агрессивный режим
            if (newContainerHeight > newScreenHeight) {
                console.log('Still not fitting, applying more aggressive mode');
                
                if (container.classList.contains('compact-mode')) {
                    container.classList.remove('compact-mode');
                    container.classList.add('super-compact');
                } else if (container.classList.contains('super-compact')) {
                    container.classList.remove('super-compact');
                    container.classList.add('ultra-compact');
                } else if (container.classList.contains('ultra-compact')) {
                    container.classList.remove('ultra-compact');
                    container.classList.add('emergency-mode');
                }
            }
        }, 100);
    } else {
        console.log('Menu fits perfectly! No compact mode needed.');
    }
}

// Функция для принудительного вмещения контента
function forceContentFit() {
    const container = document.querySelector('.container');
    const screenHeight = window.innerHeight;
    
    let attempts = 0;
    const maxAttempts = 5;
    
    const checkAndAdjust = () => {
        attempts++;
        const containerHeight = container.scrollHeight;
        
        console.log(`Force fit attempt ${attempts}:`, containerHeight, screenHeight);
        
        if (containerHeight > screenHeight && attempts < maxAttempts) {
            // Постепенно применяем более агрессивные режимы
            if (!container.classList.contains('compact-mode')) {
                container.classList.add('compact-mode');
            } else if (!container.classList.contains('super-compact')) {
                container.classList.add('super-compact');
            } else if (!container.classList.contains('ultra-compact')) {
                container.classList.add('ultra-compact');
            } else if (!container.classList.contains('emergency-mode')) {
                container.classList.add('emergency-mode');
            }
            
            setTimeout(checkAndAdjust, 100);
        } else if (attempts >= maxAttempts) {
            console.log('Max adjustment attempts reached');
        }
    };
    
    checkAndAdjust();
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing menu...');
    
    // Первоначальная настройка
    setTimeout(adjustMenuForTV, 100);
    
    // Дополнительные проверки после полной загрузки ресурсов
    setTimeout(adjustMenuForTV, 500);
    setTimeout(forceContentFit, 1000);
    
    // Финальная проверка
    setTimeout(adjustMenuForTV, 2000);
});

// Адаптация при изменении размера окна
window.addEventListener('resize', function() {
    console.log('Window resized, adjusting menu...');
    setTimeout(adjustMenuForTV, 100);
    setTimeout(forceContentFit, 300);
});

// Автоматическое обновление каждые 5 минут
setInterval(function() {
    console.log('Auto-refreshing page...');
    window.location.reload();
}, 300000);

// Предотвращаем масштабирование на ТВ
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

document.addEventListener('touchmove', function(e) {
    if (e.scale !== 1) {
        e.preventDefault();
    }
}, { passive: false });

// Экспорт функций для глобального доступа (если нужно)
window.adjustMenuForTV = adjustMenuForTV;
window.forceContentFit = forceContentFit;