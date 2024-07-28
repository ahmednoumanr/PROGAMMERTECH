const deliveryCharge = 100;
const gstRate = 0.04;

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartDelivery = document.getElementById('cart-delivery');
    const cartGst = document.getElementById('cart-gst');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.innerHTML = '';
        cartDelivery.innerHTML = '';
        cartGst.innerHTML = '';
        checkoutButton.classList.add('disabled');
        checkoutButton.disabled = true;
        checkoutButton.style.cursor = 'not-allowed';
        return;
    } else {
        checkoutButton.classList.remove('disabled');
        checkoutButton.disabled = false;
        checkoutButton.style.cursor = 'pointer';
    }

    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>RS. ${item.price.toFixed(2)}</p>
            <button class="remove-button" onclick="removeFromCart(${index})">&times;</button>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const gst = total * gstRate;
    const finalTotal = total + gst + deliveryCharge;
    cartDelivery.innerHTML = `Delivery Charge: RS. ${deliveryCharge.toFixed(2)}`;
    cartGst.innerHTML = `GST (4%): RS. ${gst.toFixed(2)}`;
    cartTotal.innerHTML = `Total: RS. ${finalTotal.toFixed(2)}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();

    // Dispatching a custom event to notify other tabs/pages
    window.dispatchEvent(new Event('storage'));
}

// Display the cart when the page loads
displayCart();

// Listen for storage events
window.addEventListener('storage', displayCart);
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const checkoutButton = document.getElementById('checkout-button');

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        checkoutButton.classList.add('disabled');
        checkoutButton.disabled = true;
    } else {
        emptyCartMessage.style.display = 'none';
        checkoutButton.classList.remove('disabled');
        checkoutButton.disabled = false;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} - ${item.price}`;

            // Create remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-button');
            removeButton.onclick = function() {
                removeItemFromCart(index);
            };

            // Append item and remove button to cartItemsContainer
            itemElement.appendChild(removeButton);
            cartItemsContainer.appendChild(itemElement);
        });

        // Assuming delivery and GST calculations are done here
        const deliveryCost = 100.00;
        const gst = cart.reduce((acc, item) => acc + item.price, 0) * 0.1;
        const total = cart.reduce((acc, item) => acc + item.price, 0) + deliveryCost + gst;

        document.getElementById('cart-delivery').textContent = `Delivery: ${deliveryCost.toFixed(2)}`;
        document.getElementById('cart-gst').textContent = `GST: ${gst.toFixed(2)}`;
        document.getElementById('cart-total').textContent = `Total: ${total.toFixed(2)}`;
    }
}

function removeItemFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function proceedToCheckout() {
   
    alert("Order is confirmed successfully");
}
