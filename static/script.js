// Theme toggling logic with localStorage
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlEl = document.documentElement;

function setTheme(isDark) {
    if (isDark) {
        htmlEl.classList.add('dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        htmlEl.classList.remove('dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// Initialize theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    setTheme(currentTheme === 'dark');
} else {
    // Default to light mode as requested
    setTheme(false);
}

themeToggle.addEventListener('click', () => {
    setTheme(!htmlEl.classList.contains('dark'));
});

// Launch Notebook features
const hero = document.getElementById('hero');
const footer = document.getElementById('footer');
const loader = document.getElementById('loader');
const nbContainer = document.getElementById('notebook-container');
const iframe = document.getElementById('jupyter-iframe');

function launchApp() {
    // Hide Landing UI
    hero.classList.add('hidden');
    footer.classList.add('hidden');
    
    // Show Loader
    loader.classList.remove('hidden');

    // JupyterLite uses the /lab endpoint for the full environment.
    // The path=? parameters force it to open our notebook immediately.
    // If running via GitHub Actions deployment, the root will harbor the JupyterLite environment.
    iframe.src = 'lab/index.html?path=python_notebook.ipynb';

    // Simulate loader tracking the iframe load
    iframe.onload = () => {
        // Give JupyterLite an extra second to initialize its own splash screen
        setTimeout(() => {
            loader.classList.add('hidden');
            nbContainer.classList.remove('hidden');
        }, 1500);
    };

    // Update URL hash for sharing
    window.location.hash = 'notebook';
}

function closeApp() {
    nbContainer.classList.add('hidden');
    hero.classList.remove('hidden');
    footer.classList.remove('hidden');
    iframe.src = '';
    window.location.hash = '';
}

// Auto-launch if URL has hash
if (window.location.hash === '#notebook') {
    launchApp();
}

