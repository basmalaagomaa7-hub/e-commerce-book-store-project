// Handles the Login / Sign Up / Logout navigation state across the website.

document.addEventListener("DOMContentLoaded", function () {
    const authArea = document.getElementById("auth-area");
    if (!authArea) return;

    const loggedIn = localStorage.getItem("loggedIn") === "true";

    if (loggedIn) {
        authArea.innerHTML = `
            <button type="button" id="logout-btn" class="logout-btn">
                <i class="fa-solid fa-right-from-bracket" style="color: #C98278;"></i> Logout
            </button>
        `;

        const logoutBtn = document.getElementById("logout-btn");
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("redirectAfterLogin");
            window.location.href = "index.html";
        });
    }
});
