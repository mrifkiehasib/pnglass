// --- LOGIKA TEMA & MODE GELAP ---

const getThemeElements = () => ({
    themePickerContainer: document.getElementById('theme-picker'),
    darkModeToggle: document.getElementById('dark-mode-toggle'),
    lightIcon: document.getElementById('theme-toggle-light-icon'),
    darkIcon: document.getElementById('theme-toggle-dark-icon'),
});

const themes = [
    { name: 'indigo', color: '#4f46e5' }, { name: 'teal', color: '#0d9488' },
    { name: 'green', color: '#16a34a' }, { name: 'rose', color: '#e11d48' },
    { name: 'slate', color: '#475569' }
];

function applyTheme(themeName, elements) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('app-theme', themeName);
    elements.themePickerContainer.querySelectorAll('button').forEach(btn => {
        const isActive = btn.dataset.theme === themeName;
        btn.classList.toggle('ring-2', isActive);
        btn.querySelector('svg').classList.toggle('opacity-100', isActive);
    });
}

function initThemePicker(elements) {
    themes.forEach(theme => {
        const btn = document.createElement('button');
        btn.className = "theme-btn h-6 w-6 rounded-full flex items-center justify-center transition-all ring-offset-2 ring-offset-[var(--color-surface)] ring-[var(--color-primary-500)]";
        btn.style.backgroundColor = theme.color;
        btn.dataset.theme = theme.name;
        btn.setAttribute('aria-label', `Ganti ke tema ${theme.name}`);
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 transition-opacity"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        elements.themePickerContainer.appendChild(btn);
    });

    elements.themePickerContainer.addEventListener('click', (e) => {
        const themeBtn = e.target.closest('.theme-btn');
        if (themeBtn) applyTheme(themeBtn.dataset.theme, elements);
    });

    const savedTheme = localStorage.getItem('app-theme') || 'indigo';
    applyTheme(savedTheme, elements);
}

function applyDarkMode(isDark, elements) {
    localStorage.setItem('dark-mode', isDark);
    document.documentElement.classList.toggle('dark', isDark);
    elements.lightIcon.classList.toggle('hidden', isDark);
    elements.darkIcon.classList.toggle('hidden', !isDark);
}

function initDarkMode(elements) {
    const savedMode = localStorage.getItem('dark-mode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedMode === 'true' || (savedMode === null && prefersDark);
    applyDarkMode(isDark, elements);

    elements.darkModeToggle.addEventListener('click', () => {
        const isCurrentlyDark = document.documentElement.classList.contains('dark');
        applyDarkMode(!isCurrentlyDark, elements);
    });
}

export function initTheme() {
    const elements = getThemeElements();
    initThemePicker(elements);
    initDarkMode(elements);
}

