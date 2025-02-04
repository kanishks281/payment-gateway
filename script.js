let cart = {};

function addToCart(productName, price) {
    if (cart[productName]) {
        cart[productName].quantity++;
    } else {
        cart[productName] = { price, quantity: 1 };
    }
    updateCart();
}

function removeFromCart(productName) {
    delete cart[productName];
    updateCart();
}

function updateCart() {
    let cartBody = document.getElementById("cart-body");
    let payButton = document.getElementById("pay-now");
    let cartMessage = document.getElementById("cart-message");
    cartBody.innerHTML = "";

    let subtotal = 0;
    let cartIsEmpty = Object.keys(cart).length === 0;

    for (let product in cart) {
        let item = cart[product];
        subtotal += item.price * item.quantity;

        let row = `<tr>
            <td>${product}</td>
            <td>₹${item.price}</td>
            <td>${item.quantity}</td>
            <td><button onclick="removeFromCart('${product}')">Remove</button></td>
        </tr>`;

        cartBody.innerHTML += row;
    }

    let tax = subtotal * 0.18;
    let total = subtotal + tax;

    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("tax").innerText = tax.toFixed(2);
    document.getElementById("total").innerText = total.toFixed(2);

    // Show empty cart message if no items
    cartMessage.style.display = cartIsEmpty ? "block" : "none";

    // ✅ Ensure "Pay Now" appears when the cart is updated with new items
    payButton.style.display = cartIsEmpty ? "none" : "block";
}

function processPayment() {
    let payButton = document.getElementById("pay-now");
    let paymentStatus = document.getElementById("payment-status");
    let paymentResult = document.getElementById("payment-result");

    // Remove previous messages
    paymentResult.innerHTML = "";

    if (Object.keys(cart).length === 0) {
        paymentResult.innerHTML = "<h3 style='color:red;'>Cart is empty. Please add items before proceeding.</h3>";
        return;
    }

    payButton.style.display = "none";
    paymentStatus.classList.remove("hidden");

    setTimeout(() => {
        paymentStatus.classList.add("hidden");

        let success = Math.random() > 0.5; // Random success or failure
        if (success) {
            paymentResult.innerHTML = "<h3 style='color:green;'>Payment Successful! 🎉</h3>";
            cart = {}; // Clear cart after successful payment
            updateCart();
        } else {
            paymentResult.innerHTML = "<h3 style='color:red;'>Payment Failed. ❌ Try Again.</h3>";
        }

        setTimeout(() => {
            paymentResult.innerHTML = ""; // Remove message after 3 seconds
            if (Object.keys(cart).length > 0) {
                payButton.style.display = "block"; // ✅ Ensure Pay Now reappears if cart is not empty
            }
        }, 3000);
    }, 3000);
}
