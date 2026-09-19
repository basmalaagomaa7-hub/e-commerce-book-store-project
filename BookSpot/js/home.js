document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});

function updateCartCount() {
    const cartCountElement = document.getElementById("cartCount");
    if (!cartCountElement) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);

    cartCountElement.textContent = totalItems;
}
