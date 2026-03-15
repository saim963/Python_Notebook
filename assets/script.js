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
    // If we're clicking the button but the hash isn't notebook yet, set it and let the listener handle the rest
    if (window.location.hash !== '#notebook') {
        window.location.hash = 'notebook';
        return;
    }

    // Hide Landing UI
    hero.classList.add('hidden');
    footer.classList.add('hidden');
    
    // Show Loader
    loader.classList.remove('hidden');

    // Construct absolute URL relative to the current window location to prevent subdirectory 404s
    const loc = window.location;
    let urlDir = loc.origin + loc.pathname;
    if (urlDir.endsWith('.html')) {
        urlDir = urlDir.substring(0, urlDir.lastIndexOf('/') + 1);
    } else if (!urlDir.endsWith('/')) {
        urlDir += '/';
    }
    
    const targetSrc = urlDir + 'lab/index.html?path=python_notebook.ipynb';
    
    // If iframe is already at target, just show it immediately
    if (iframe.src === targetSrc) {
        loader.classList.add('hidden');
        nbContainer.classList.remove('hidden');
        nbContainer.style.display = 'flex';
        nbContainer.classList.add('flex', 'flex-col');
        return;
    }

    // First time launch: set onload and then src
    iframe.onload = () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            nbContainer.classList.remove('hidden');
            nbContainer.style.display = 'flex'; 
            nbContainer.classList.add('flex', 'flex-col');
        }, 1500);
    };
    iframe.src = targetSrc;
}

function closeApp() {
    nbContainer.classList.remove('flex', 'flex-col');
    nbContainer.classList.add('hidden');
    nbContainer.style.display = 'none';
    loader.classList.add('hidden');
    hero.classList.remove('hidden');
    footer.classList.remove('hidden');
    
    // We NO LONGER clear iframe.src to 'about:blank' here.
    // Keeping it resident allows for instant re-launches and prevents state hangs.
    
    // Cleanly update hash so Browser Back works predictably
    if (window.location.hash === '#notebook') {
        window.location.hash = '';
    }
}

// On page load: auto-launch only if hash is exactly #notebook
if (window.location.hash === '#notebook') {
    launchApp();
} else {
    // Safety net: ensure landing page is always visible when not in notebook mode
    hero.classList.remove('hidden');
    footer.classList.remove('hidden');
    nbContainer.classList.add('hidden');
    loader.classList.add('hidden');
}

// Handle browser back/forward buttons strictly by state
window.addEventListener('hashchange', () => {
    if (window.location.hash === '#notebook') {
        launchApp();
    } else {
        closeApp();
    }
});
