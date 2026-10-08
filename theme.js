
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

document.addEventListener('DOMContentLoaded', () => {
    let toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) {
        toggleBtn = document.createElement('button');
        toggleBtn.id = 'themeToggle';
        toggleBtn.className = 'theme-toggle';
        document.body.appendChild(toggleBtn);
    }

    function updateButton() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        toggleBtn.textContent = isDark ? '☀️ Light mode' : '🌙 Dark mode';
    }

    toggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateButton();
    });

    updateButton();
});