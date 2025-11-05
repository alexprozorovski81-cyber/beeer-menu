// Автоматическая подстройка под размер экрана
function adjustLayout() {
    const container = document.querySelector('.container');
    const screenHeight = window.innerHeight;
    
    // Удаляем все классы компактности
    container.classList.remove('compact-mode', 'super-compact');
    
    // Включаем соответствующий компактный режим
    if (screenHeight < 600) {
        container.classList.add('super-compact');
    } else if (screenHeight < 800) {
        container.classList.add('compact-mode');
    }
    
    // Автоматическое обновление каждые 5 минут
    setTimeout(() => {
        window.location.reload();
    }, 300000);
}

// Запускаем при загрузке и при изменении размера
window.addEventListener('load', adjustLayout);
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