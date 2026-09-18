/*
========================================================
CART PAGE - TEAM INTEGRATION
========================================================

WAITING FOR THE BOOKS TEAM:
We need the exact:
1. Local Storage key
2. Book object structure
3. Add-to-Cart code

Temporary data is used below so this page can be built
and tested now.

Suggested team contract:
localStorage key = "cart"

Book:
{
    id,
    title,
    author,
    price,
    image
}
========================================================
*/

// ======================================================
// WAITING FOR BOOKS TEAM - TEMPORARY DATA
// ======================================================
// Replace this section after your colleague confirms the
// real Local Storage structure.
// ======================================================

let cart = [
    {
        id: 1,
        title: "Sample Book",
        author: "Sample Author",
        price: 15,
        image: "https://via.placeholder.com/80x105?text=Book"
    },
    {
        id: 2,
        title: "Another Book",
        author: "Another Author",
        price: 20,
        image: "https://via.placeholder.com/80x105?text=Book"
    }
];

// ======================================================
// REAL VERSION - USE AFTER COLLEAGUE CONFIRMS THE KEY
// ======================================================
// Example:
// const cart = JSON.parse(localStorage.getItem("cart")) || [];
//
// If his key/object is different, change this line to match
// his exact implementation.
// ======================================================

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

function renderCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        emptyCart.classList.remove("hidden");
        cartCount.textContent = "0 items";
        updateSummary();
        return;
    }

    emptyCart.classList.add("hidden");
    cartCount.textContent = `${cart.length} ${cart.length === 1 ? "item" : "items"}`;

    cart.forEach((book, index) => {
        const item = document.createElement("div");
        item.className = "cart-item";

        item.innerHTML = `
            <img class="cart-item-image"
                 src="${book.image}"
                 alt="${book.title}"
                 onerror="this.src='https://via.placeholder.com/80x105?text=Book'">

            <div class="cart-item-info">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <div class="cart-item-price">$${Number(book.price).toFixed(2)}</div>
                <button class="remove-btn" type="button" onclick="removeItem(${index})">
                    Remove
                </button>
            </div>

            <div class="cart-item-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn" type="button"
                            onclick="changeQuantity(${index}, -1)">−</button>
                    <span>${book.quantity || 1}</span>
                    <button class="quantity-btn" type="button"
                            onclick="changeQuantity(${index}, 1)">+</button>
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

    // WAITING FOR BOOKS TEAM:
    // Save the updated cart using their confirmed key.
    // Example:
    // localStorage.setItem("cart", JSON.stringify(cart));

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

    // WAITING FOR BOOKS TEAM:
    // Save the updated cart using their confirmed key.

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

    // Demo only: this does NOT process a real payment.
    paymentMessage.textContent =
        "Payment successful! Thank you for your order.";
    paymentMessage.style.color = "var(--success-color)";

    paymentForm.reset();

    // OPTIONAL AFTER THE TEAM DECIDES:
    // localStorage.removeItem("cart");
    // cart = [];
    // renderCart();
});

renderCart();
