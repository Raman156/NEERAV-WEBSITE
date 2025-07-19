 const toggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
 function goToShopping() {
      window.location.href = "shopping.html";
    }

const products = [
  { id: 1, name: "Laddoos", price: 120, netQuantity: "500g", image: "images/IMG1.jpg", gallery: ["images/IM5.JPG", "images/IMG1_2.jpg", "images/IMG1_3.jpg", "images/IMG1_4.jpg"] },
  { id: 2, name: "Turmeric", price: 80,netQuantity: "500g", image: "images/IMG2.JPG", gallery: ["images/IMG2.JPG", "images/laddu1.jpg", "images/laddu2.jpg", "images/laddu3.jpg"] },
  { id: 3, name: "Pickles", price: 150,netQuantity: "500g", image: "images/IMG3.jpg", gallery: ["images/IMG3.jpg", "images/IMG3_2.jpg", "images/IMG3_3.jpg", "images/IMG3_4.jpg"] },
  { id: 4, name: "Honey", price: 200,netQuantity: "500g", image: "images/IMG4.jpg", gallery: ["images/IMG4.jpg", "images/IMG4_2.jpg", "images/IMG4_3.jpg", "images/IMG4_4.jpg"] },

];
const pickles = [
  {
    id: 101,
    name: "Spicy Mango Pickle",
   
    price: 90,
    netQuantity: "500g",
    image: "images/IMG6.jpg",
    gallery: ["images/pickle1.jpg", "images/pickle1_2.jpg", "images/pickle1_3.jpg"]
  },
  {
    id: 102,
    name: "Lemon Pickle",
    price: 100,netQuantity: "500g",
    image: "images/IMG6.jpg",
    gallery: ["images/IMG1.jpg", "images/IMG1.jpg","images/IMG1.jpg"]
  },
  {
    id: 102,
    name: "Lemon Pickle",
    price: 100,netQuantity: "500g",
    image: "images/IMG6.jpg",
    gallery: ["images/IMG1.jpg", "images/IMG1.jpg","images/IMG1.jpg"]
  },
 
  {
    id: 103,
    name: "Mixed Vegetable Pickle",
    price: 110,netQuantity: "500g",
    image: "images/IMG6.jpg",
    gallery: ["images/pickle3.jpg", "images/pickle3_2.jpg", "images/pickle3_3.jpg"]
  }
];
const chocolates = [
  {
    id: 201,
    name: "Dark Chocolate Bar",
    price: 70,netQuantity: "500g",
    image: "images/choco1.jpg",
    gallery: ["images/choco1.jpg", "images/choco1_2.jpg", "images/choco1_3.jpg"]
  },
  {
    id: 202,
    name: "Almond Chocolate",
    price: 120,netQuantity: "500g",
    image: "images/choco2.jpg",
    gallery: ["images/choco2.jpg", "images/choco2_2.jpg", "images/choco2_3.jpg"]
  },
  {
    id: 202,
    name: "Almond Chocolate",
    price: 120,netQuantity: "500g",
    image: "images/choco2.jpg",
    gallery: ["images/choco2.jpg", "images/choco2_2.jpg", "images/choco2_3.jpg"]
  },
  {
    id: 202,
    name: "Almond Chocolate",
    price: 120,netQuantity: "500g",
    image: "images/choco2.jpg",
    gallery: ["images/choco2.jpg", "images/choco2_2.jpg", "images/choco2_3.jpg"]
  },
  {
    id: 203,
    name: "Homemade Milk Chocolate",
    price: 90,netQuantity: "500g",
    image: "images/choco3.jpg",
    gallery: ["images/choco3.jpg", "images/choco3_2.jpg", "images/choco3_3.jpg"]
  }
];


const container = document.getElementById('product-container');
let selectedProduct = null;

products.forEach(product => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
   <p>₹${product.price} • ${product.netQuantity}</p>

    <button onclick="openModal(${product.id})">View & Buy</button>
  `;
  container.appendChild(card);
});
const picklesContainer = document.getElementById('pickles-container');
pickles.forEach(product => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
   <p>₹${product.price} • ${product.netQuantity}</p>

    <button onclick="openModalFromPickles(${product.id})">View & Buy</button>
  `;
  picklesContainer.appendChild(card);
});
const chocolatesContainer = document.getElementById('chocolates-container');
chocolates.forEach(product => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
 <p>₹${product.price} • ${product.netQuantity}</p>

    <button onclick="openModalFromChocolates(${product.id})">View & Buy</button>
  `;
  chocolatesContainer.appendChild(card);
});


function openModal(id) {
  selectedProduct = products.find(p => p.id === id);
  document.getElementById('modalTitle').innerText = selectedProduct.name;
  document.getElementById('modalPrice').innerText = `Price: ₹${selectedProduct.price}`;
  document.getElementById('modalQuantity').innerText = `Net Qty: ${selectedProduct.netQuantity}`;

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

function openModalFromPickles(id) {
  selectedProduct = pickles.find(p => p.id === id);
  document.getElementById('modalTitle').innerText = selectedProduct.name;
  document.getElementById('modalPrice').innerText = `Price: ₹${selectedProduct.price}`;
  document.getElementById('modalQuantity').innerText = `Net Qty: ${selectedProduct.netQuantity}`;

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

function openModalFromChocolates(id) {
  selectedProduct = chocolates.find(p => p.id === id);
  document.getElementById('modalTitle').innerText = selectedProduct.name;
  document.getElementById('modalPrice').innerText = `Price: ₹${selectedProduct.price}`;
  document.getElementById('modalQuantity').innerText = `Net Qty: ${selectedProduct.netQuantity}`;

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

