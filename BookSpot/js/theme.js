// Shared light/dark mode.
// Every project page should include this file.

const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

const themeButton = document.getElementById("theme-toggle");

if (themeButton) {
    updateThemeButton(savedTheme);

    themeButton.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeButton(newTheme);
    });
}

function updateThemeButton(theme) {
    if (themeButton) {
        themeButton.textContent = theme === "dark" ? "☀️" : "🌙";
    }
}
