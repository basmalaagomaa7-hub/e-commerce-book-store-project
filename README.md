# BookSpot E-Commerce Website

A simple front-end e-commerce BookSpot project built by a team using HTML, CSS, and JavaScript.

## Pages

- **Home** – BookSpot introduction and navigation.
- **Books** – displays books, categories, offers, search, and Add to Cart.
- **Cart & Payment** – displays selected books, quantities, order summary, and demo payment.
- **Login** – validates the registered account and creates the logged-in state.
- **Sign Up** – creates a simple account using Local Storage.

## Main Features

- Book categories and search.
- Add books to the cart from the Books page.
- Cart data is shared between pages using Local Storage.
- Increase, decrease, and remove cart items.
- Order subtotal, shipping, and total calculation.
- Login check before payment.
- Return to the cart after logging in when the user came from payment.
- Light and dark mode.
- Responsive layout.
- Font Awesome icons for the navigation and page controls.

## Local Storage

### Cart

The Books page saves the selected books using the key:

```text
cart
```

Each cart item uses:

```text
id
name
price
image
quantity
```

### User

Sign Up saves the registered account using:

```text
user
```

Login uses the key:

```text
loggedIn
```

with the value:

```text
true
```

The cart uses `redirectAfterLogin` when the user tries to pay without logging in.

## Project Structure

```text
book-store/
├── index.html
├── books.html
├── cart.html
├── login.html
├── sign-up.html
├── css/
│   ├── style.css
│   ├── home.css
│   ├── cart.css
│   └── loginbookstore.css
├── js/
│   ├── home.js
│   ├── cart.js
│   ├── login.js
│   ├── signup.js
│   └── theme.js
├── assets/
│   ├── images/
│   │   └── book images
│   └── icons/
└── README.md
```

## How to Run

Open `index.html` in a browser, or use a simple local server such as VS Code Live Server.

The payment page is a demo only. It does not process real payments or send card information anywhere.
