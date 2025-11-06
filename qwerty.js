// Автоматическая подстройка под размер экрана
function adjustLayout() {
    try {
        const container = document.querySelector('.container');
        const screenHeight = window.innerHeight;
        
        console.log('Screen height:', screenHeight);
        
        // Удаляем все классы компактности
        container.classList.remove('compact-mode', 'super-compact', 'ultra-compact');
        
        // Очень агрессивные настройки для гарантированного вмещения
        if (screenHeight < 650) {
            container.classList.add('ultra-compact');
            console.log('ULTRA compact mode activated');
        } else if (screenHeight < 800) {
            container.classList.add('super-compact');
            console.log('Super compact mode activated');
        } else if (screenHeight < 1000) {
            container.classList.add('compact-mode');
            console.log('Compact mode activated');
        } else {
            console.log('Normal mode');
        }
        
        // Принудительная проверка и дополнительное уменьшение если нужно
        forceFitContent();
        
    } catch (error) {
        console.error('Error in adjustLayout:', error);
    }
}

// Принудительное вмещение контента
function forceFitContent() {
    const container = document.querySelector('.container');
    const containerHeight = container.scrollHeight;
    const screenHeight = window.innerHeight;
    const viewportHeight = document.documentElement.clientHeight;
    
    console.log('Container height:', containerHeight, 'Screen height:', screenHeight, 'Viewport:', viewportHeight);
    
    // Если контент не помещается, применяем более агрессивный режим
    if (containerHeight > screenHeight - 10) {
        console.warn('Content does not fit! Applying more compact mode...');
        
        if (container.classList.contains('compact-mode')) {
            container.classList.remove('compact-mode');
            container.classList.add('super-compact');
            console.log('Upgraded to super-compact');
        } else if (container.classList.contains('super-compact')) {
            container.classList.remove('super-compact');
            container.classList.add('ultra-compact');
            console.log('Upgraded to ultra-compact');
        } else if (container.classList.contains('ultra-compact')) {
            // Если ультра-компактный тоже не помогает, делаем экстренное уменьшение
            emergencyShrink();
            console.log('Emergency shrink applied');
        }
    }
}

// Экстренное уменьшение размеров
function emergencyShrink() {
    const beerItems = document.querySelectorAll('.beer-item');
    const beerInfos = document.querySelectorAll('.beer-info');
    const countryNames = document.querySelectorAll('.country-name');
    
    beerItems.forEach(item => {
        item.style.minHeight = '20px';
        item.style.padding = '1px';
    });
    
    beerInfos.forEach(info => {
        info.style.fontSize = '0.4rem';
    });
    
    countryNames.forEach(name => {
        name.style.fontSize = '0.65rem';
    });
    
    document.querySelector('h1').style.fontSize = '0.9rem';
    
    console.log('Emergency shrink completed');
}

// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Первоначальная настройка
    setTimeout(adjustLayout, 100);
    
    // Дополнительная проверка
    setTimeout(adjustLayout, 300);
    setTimeout(adjustLayout, 1000);
    
    // Автоматическое обновление каждые 5 минут
    setTimeout(() => {
        window.location.reload();
    }, 300000);
});

// Обновляем при изменении размера окна
window.addEventListener('resize', adjustLayout);

// Предотвращаем масштабирование
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

document.addEventListener('touchmove', function(e) {
    if(e.scale !== 1) {
        e.preventDefault();
    }
}, { passive: false });