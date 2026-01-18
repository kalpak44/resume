(function () {
    const STORAGE_KEY = "theme";
    const root = document.documentElement;

    function getSystemTheme() {
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    function getInitialTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === "light" || saved === "dark") return saved;
        return getSystemTheme();
    }

    function setTheme(theme) {
        root.setAttribute("data-theme", theme);
        localStorage.setItem(STORAGE_KEY, theme);
        updateToggleIcon(theme);
    }

    function updateToggleIcon(theme) {
        const icon = document.getElementById("themeIcon");
        if (!icon) return;
        icon.className = theme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
    }

    function initYear() {
        const y = document.getElementById("y");
        if (y) y.textContent = new Date().getFullYear();
    }

    function initThemeToggle() {
        const btn = document.getElementById("themeToggle");
        if (!btn) return;

        btn.addEventListener("click", () => {
            const current = root.getAttribute("data-theme") || "light";
            setTheme(current === "dark" ? "light" : "dark");
        });
    }

    setTheme(getInitialTheme());
    initThemeToggle();
    initYear();
})();
