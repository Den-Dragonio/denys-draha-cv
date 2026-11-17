// script.js
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.glass-card, .glass-bubble').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});


// --- Прогрес Бар ---
window.onscroll = function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
};

// --- Логіка фону (тепер повністю на CSS) ---
// Получаем элементы модального окна
const modal = document.getElementById("diplomaModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close-btn");
let lastFocusedElement = null;

// Функция открытия (вызывается при клике на иконку)
function openDiploma(imageSrc) {
    lastFocusedElement = document.activeElement;
    modal.style.display = "block";
    modalImg.src = imageSrc; // Устанавливаем картинку
    document.body.style.overflow = "hidden"; // Запрещаем скролл сайта
    if (closeBtn) {
        closeBtn.focus();
    }
}

// Закрытие при клике на крестик
if (closeBtn) {
    closeBtn.onclick = function() {
        closeModal();
    };
}

// Закрытие при клике ВНЕ картинки (на темный фон)
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
};

// Закрытие клавишей ESC
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && modal && modal.style.display === "block") {
        closeModal();
    }
});

function closeModal() {
    if (!modal) return;
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Возвращаем скролл
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }
}
