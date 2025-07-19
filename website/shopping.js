const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

const products = [
  { id: 1, name: "Laddoos", price: 120, image: "images/ladu.jpg", gallery: ["images/IM5.JPG", "images/IMG1_2.jpg", "images/IMG1_3.jpg", "images/IMG1_4.jpg"] },
  { id: 2, name: "cake", price: 80, image: "images/cake1.jpg", gallery: ["images/IMG2.JPG", "images/laddu1.jpg", "images/laddu2.jpg", "images/laddu3.jpg"] },
  { id: 3, name: "cake", price: 150, image: "images/cake2.jpg", gallery: ["images/IMG3.jpg", "images/IMG3_2.jpg", "images/IMG3_3.jpg", "images/IMG3_4.jpg"] },
  { id: 4, name: "cake", price: 200, image: "images/cake3.jpg", gallery: ["images/IMG4.jpg", "images/IMG4_2.jpg", "images/IMG4_3.jpg", "images/IMG4_4.jpg"] },
  { id: 4, name: "cake", price: 200, image: "images/cake4.jpg", gallery: ["images/IMG4.jpg", "images/IMG4_2.jpg", "images/IMG4_3.jpg", "images/IMG4_4.jpg"] },
  { id: 4, name: "cake", price: 200, image: "images/cake5.jpg", gallery: ["images/IMG4.jpg", "images/IMG4_2.jpg", "images/IMG4_3.jpg", "images/IMG4_4.jpg"] },
  { id: 4, name: "cake", price: 200, image: "images/cake6.jpg", gallery: ["images/IMG4.jpg", "images/IMG4_2.jpg", "images/IMG4_3.jpg", "images/IMG4_4.jpg"] },
  { id: 4, name: "cake", price: 200, image: "images/cake6.jpg", gallery: ["images/IMG4.jpg", "images/IMG4_2.jpg", "images/IMG4_3.jpg", "images/IMG4_4.jpg"] }
];

const container = document.getElementById('product-container');
let selectedProduct = null;

products.forEach(product => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>₹${product.price}</p>
    <button onclick="openModal(${product.id})">View & Buy</button>
  `;
  container.appendChild(card);
});

function openModal(id) {
  selectedProduct = products.find(p => p.id === id);
  document.getElementById('modalTitle').innerText = selectedProduct.name;
  document.getElementById('modalPrice').innerText = `Price: ₹${selectedProduct.price}`;
  document.getElementById('modalImage').src = selectedProduct.gallery[0];
  document.getElementById('quantity').value = 1;
  document.getElementById('productModal').style.display = 'flex';

  const thumbnails = document.getElementById('thumbnails');
  thumbnails.innerHTML = '';
  selectedProduct.gallery.forEach(img => {
    const thumb = document.createElement('img');
    thumb.src = img;
    thumb.onclick = () => document.getElementById('modalImage').src = img;
    thumbnails.appendChild(thumb);
  });
}

function closeModal() {
  document.getElementById('productModal').style.display = 'none';
}

function addToCart() {
  const qty = parseInt(document.getElementById('quantity').value);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === selectedProduct.id);

  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ ...selectedProduct, quantity: qty });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${selectedProduct.name} added to cart!`);
  closeModal();
}

function changeQuantity(change) {
  const input = document.getElementById('quantity');
  let qty = parseInt(input.value);
  qty = isNaN(qty) ? 1 : qty + change;
  if (qty < 1) qty = 1;
  input.value = qty;
}
