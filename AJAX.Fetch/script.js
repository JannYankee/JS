const apiUrl = 'https://fakestoreapi.com/products';
let products = [];
let sorted = false;

const productList = document.getElementById('product-list');
const productDetail = document.getElementById('product-detail');
const sortBtn = document.getElementById('sortBtn');
const backBtn = document.getElementById('backBtn');

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts();
  });

function renderProducts() {
  productList.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = () => showDetail(p.id);
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p><strong>Price:</strong> $${p.price}</p>
      <p><strong>Rating:</strong> ${p.rating.rate}⭐</p>
      <p><strong>Brand:</strong> ${p.category}</p>
    `;
    productList.appendChild(card);
  });
}

sortBtn.onclick = () => {
  products.sort((a, b) => sorted ? b.price - a.price : a.price - b.price);
  sorted = !sorted;
  renderProducts();
};

function showDetail(id) {
  const product = products.find(p => p.id === id);
  productList.classList.add('hidden');
  sortBtn.classList.add('hidden');
  productDetail.classList.remove('hidden');

  document.getElementById('detail-title').textContent = product.title;
  document.getElementById('detail-price').textContent = `Price: $${product.price}`;
  document.getElementById('detail-rating').textContent = `Rating: ${product.rating.rate} (${product.rating.count} votes)`;
  document.getElementById('detail-description').textContent = product.description;
  document.getElementById('detail-category').textContent = `Category: ${product.category}`;

  const imageContainer = document.getElementById('detail-images');
  imageContainer.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    const img = document.createElement('img');
    img.src = product.image;
    imageContainer.appendChild(img);
  }
}

backBtn.onclick = () => {
  productDetail.classList.add('hidden');
  productList.classList.remove('hidden');
  sortBtn.classList.remove('hidden');
};
