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

// --- Login form ---
const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const submitBtn = document.querySelector(".signin-btn");

// --- Regex checks, explained ---
// Email: letters/numbers, then "@", then letters/numbers, then ".com" or ".org".
//   ^[A-Za-z0-9]+   -> one or more letters or digits (the part before "@", e.g. "yassin123")
//   @               -> a literal "@"
//   [A-Za-z0-9]+    -> one or more letters or digits (the domain name, e.g. "gmail")
//   \.              -> a literal "."
//   (com|org)$      -> the ending must be exactly "com" or "org"
// Note: this is intentionally strict — it will reject dots/dashes before the "@"
// (like "first.last@x.com") and any ending other than .com/.org (like .net, .edu, .eg).
function isValidEmail(value) {
    return /^[A-Za-z0-9]+@[A-Za-z0-9]+\.(com|org)$/.test(value);
}

// Password: needs an uppercase letter, a lowercase letter, a number, and a special
// character. Four small, separate checks — easier to follow and to edit individually
// than one long regex trying to do all of it at once.
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
    // any of: ! @ # $ % ^ & *
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

// clear a field's error as soon as the user starts fixing it
email.addEventListener("input", () => clearError(email, emailError));
password.addEventListener("input", () => clearError(password, passwordError));

form.addEventListener("submit", function (e) {
    e.preventDefault();

    clearError(email, emailError);
    clearError(password, passwordError);

    let hasError = false;

    // trim the email field itself, not just a copy — so what's shown in the box,
    // what gets compared, and what gets saved are all the same trimmed value
    email.value = email.value.trim();
    const emailVal = email.value;
    const passwordVal = password.value;

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

    if (hasError) return;

    // Disable the button briefly so a double-click can't submit the form twice
    submitBtn.disabled = true;

    const userDataString = localStorage.getItem("user");

    if (userDataString === null) {
        alert("No account found. Please sign up first.");
        submitBtn.disabled = false;
        return;
    }

    const userData = JSON.parse(userDataString);

    if (emailVal !== userData.email || passwordVal !== userData.password) {
        alert("Incorrect email or password. Please try again.");
        submitBtn.disabled = false;
        return;
    }

    email.value = "";
    password.value = "";

    localStorage.setItem("loggedIn", "true");
    alert("You have signed in successfully.");
    window.location.href = "./index.html";
});
