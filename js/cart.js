let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsContainer = document.getElementById("cart-items");
const emptyCart = document.getElementById("empty-cart");
const cartCount = document.getElementById("cart-count");
const subtotalElement = document.getElementById("subtotal");
const shippingElement = document.getElementById("shipping");
const totalElement = document.getElementById("total");
const checkoutButton = document.getElementById("checkout-btn");
const paymentSection = document.getElementById("payment-section");
const paymentForm = document.getElementById("payment-form");
const paymentMessage = document.getElementById("payment-message");

const SHIPPING_COST = 5;

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        emptyCart.classList.remove("hidden");
        cartCount.textContent = "0 items";
        updateSummary();
        return;
    }

    emptyCart.classList.add("hidden");
    const totalItems = cart.reduce((total, book) => total + (book.quantity || 1), 0);
    cartCount.textContent = `${totalItems} ${totalItems === 1 ? "item" : "items"}`;

    cart.forEach((book, index) => {
        const item = document.createElement("div");
        item.className = "cart-item";

        item.innerHTML = `
            <img class="cart-item-image"
                 src="${book.image || "assets/images/book.jpeg"}"
                 alt="${book.name}"
                 onerror="this.src='assets/images/book.jpeg'">

            <div class="cart-item-info">
                <h3>${book.name}</h3>
                <div class="cart-item-price">$${Number(book.price).toFixed(2)}</div>
                <button class="remove-btn" type="button" onclick="removeItem(${index})">
                    Remove
                </button>
            </div>

            <div class="cart-item-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn" type="button" onclick="changeQuantity(${index}, -1)">−</button>
                    <span>${book.quantity || 1}</span>
                    <button class="quantity-btn" type="button" onclick="changeQuantity(${index}, 1)">+</button>
                </div>
            </div>
        `;

        cartItemsContainer.appendChild(item);
    });

    updateSummary();
}

function updateSummary() {
    const subtotal = cart.reduce((sum, book) => {
        return sum + Number(book.price) * (book.quantity || 1);
    }, 0);

    const shipping = cart.length > 0 ? SHIPPING_COST : 0;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = `$${shipping.toFixed(2)}`;
    totalElement.textContent = `$${(subtotal + shipping).toFixed(2)}`;
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function changeQuantity(index, change) {
    if (!cart[index].quantity) {
        cart[index].quantity = 1;
    }

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        removeItem(index);
        return;
    }

    saveCart();
    renderCart();
}

checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add a book first.");
        return;
    }

    paymentSection.scrollIntoView({ behavior: "smooth" });
});

paymentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (cart.length === 0) {
        paymentMessage.textContent = "Your cart is empty.";
        return;
    }

    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {
        localStorage.setItem("redirectAfterLogin", "cart.html");
        window.location.href = "login.html";
        return;
    }

    paymentMessage.textContent = "Payment successful! Thank you for your order.";
    paymentMessage.style.color = "var(--success-color)";

    paymentForm.reset();
    localStorage.removeItem("cart");
    cart = [];
    renderCart();
});

renderCart();
