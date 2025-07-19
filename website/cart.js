 const toggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });


// Load cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const container = document.getElementById('cart-container');
const summary = document.getElementById('cart-summary');
let total = 0;

if (cart.length === 0) {
  container.innerHTML = '<p style="text-align:center;">🛍️ Your cart is empty.</p>';
  summary.innerHTML = '';
} else {
  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Price: ₹${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Subtotal: ₹${item.price * item.quantity}</p>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    container.appendChild(div);
    total += item.price * item.quantity;
  });

  summary.innerHTML = `
    <p>Total Amount: ₹${total}</p>
    <button onclick="checkout()" style="margin-top:10px;padding:10px 20px;font-size:16px;background:#28a745;color:white;border:none;border-radius:5px;">Proceed to Checkout</button>
  `;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}

function checkout() {
  window.location.href = "checkout.html";
}
