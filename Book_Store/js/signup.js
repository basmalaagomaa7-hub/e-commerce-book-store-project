// --- Theme toggle (dark/light) ---
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
        themeButton.innerHTML = theme === "dark"
            ? '<i class="fa-solid fa-sun" style="color: #c98278;"></i> <span>Light Mode</span>'
            : '<i class="fa-solid fa-moon" style="color: #c98278;"></i> <span>Dark Mode</span>';
    }
}

// --- Sign up form ---
const form = document.getElementById("signup-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");
const submitBtn = document.querySelector(".signin-btn");

// Same regex rules as login.js — keep both files in sync if you change one.

// Email: letters/numbers, then "@", then letters/numbers, then ".com" or ".org".
function isValidEmail(value) {
    return /^[A-Za-z0-9]+@[A-Za-z0-9]+\.(com|org)$/.test(value);
}

// Password: needs an uppercase letter, a lowercase letter, a number, and a special
// character. Four small, separate checks instead of one long regex.
function hasUpper(value) {
    return /[A-Z]/.test(value);
}
function hasLower(value) {
    return /[a-z]/.test(value);
}
function hasNumber(value) {
    return /[0-9]/.test(value);
}
function hasSpecialChar(value) {
    return /[!@#$%^&*]/.test(value);
}

function showError(input, errorEl, message) {
    input.classList.add("invalid");
    errorEl.textContent = message;
    errorEl.style.display = "block";
}

function clearError(input, errorEl) {
    input.classList.remove("invalid");
    errorEl.style.display = "none";
}

email.addEventListener("input", () => clearError(email, emailError));
password.addEventListener("input", () => clearError(password, passwordError));
confirmPassword.addEventListener("input", () => clearError(confirmPassword, confirmPasswordError));

form.addEventListener("submit", function (e) {
    e.preventDefault();

    clearError(email, emailError);
    clearError(password, passwordError);
    clearError(confirmPassword, confirmPasswordError);

    let hasError = false;

    // trim the email field itself so the box, the check, and what gets saved all match
    email.value = email.value.trim();
    const emailVal = email.value;
    const passwordVal = password.value;
    const confirmPasswordVal = confirmPassword.value;

    // --- Email checks ---
    if (emailVal === "") {
        showError(email, emailError, "Please enter your email.");
        hasError = true;
    } else if (!isValidEmail(emailVal)) {
        showError(email, emailError, "Please enter a valid email address.");
        hasError = true;
    }

    // --- Password checks ---
    if (passwordVal === "") {
        showError(password, passwordError, "Please enter your password.");
        hasError = true;
    } else if (passwordVal.length < 8) {
        showError(password, passwordError, "Password must be at least 8 characters.");
        hasError = true;
    } else if (!hasUpper(passwordVal)) {
        showError(password, passwordError, "Password must include at least one uppercase letter.");
        hasError = true;
    } else if (!hasLower(passwordVal)) {
        showError(password, passwordError, "Password must include at least one lowercase letter.");
        hasError = true;
    } else if (!hasNumber(passwordVal)) {
        showError(password, passwordError, "Password must include at least one number.");
        hasError = true;
    } else if (!hasSpecialChar(passwordVal)) {
        showError(password, passwordError, "Password must include a special character (e.g. @ # $ %).");
        hasError = true;
    }

    // --- Confirm password check ---
    // Only bother checking this if the password itself already passed —
    // no point telling them "doesn't match" when the password is invalid anyway.
    if (!hasError) {
        if (confirmPasswordVal === "") {
            showError(confirmPassword, confirmPasswordError, "Please confirm your password.");
            hasError = true;
        } else if (confirmPasswordVal !== passwordVal) {
            showError(confirmPassword, confirmPasswordError, "Passwords do not match.");
            hasError = true;
        }
    }

    if (hasError) return;

    submitBtn.disabled = true;

    // Demo storage — one "user" object in localStorage, matching what login.js
    // reads. Replace this with a real API call once the backend is ready.
    const userData = {
        email: emailVal,
        password: passwordVal
    };

    localStorage.setItem("user", JSON.stringify(userData));

    alert("Account created successfully! Please sign in.");
    window.location.href = "./login.html";
});
