const recipes = {
Fish: {
  url: "https://www.simplyrecipes.com/search?q=fish",
  image: "photo/fish.jpg",
  description: "Смачна рибна страва з корисними омега-3 жирами."
},
Apple: {
  url: "https://www.simplyrecipes.com/search?q=apple",
  image: "photo/apple.jpg",
  description: "Соковиті яблука — ідеальні для випічки та салатів."
},
Eggs: {
  url: "https://www.simplyrecipes.com/search?q=egg",
  image: "photo/egg.jpg",
  description: "Яйця — основа для сніданків і випічки."
}

};

function addProduct(productName) {
  const productList = document.getElementById("productList");

  const card = document.createElement("div");
  card.className = "card";
  card.style.width = "18rem";

  const img = document.createElement("img");
  img.className = "card-img-top";
  img.src = recipes[productName].image;
  img.alt = productName;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = productName;

  const text = document.createElement("p");
  text.className = "card-text";
  text.textContent = recipes[productName].description;

  const link = document.createElement("a");
  link.className = "btn btn-primary";
  link.href = recipes[productName].url;
  link.textContent = "Перейти до рецепту";
  link.target = "_blank";

  cardBody.appendChild(title);
  cardBody.appendChild(text);
  cardBody.appendChild(link);

  card.appendChild(img);
  card.appendChild(cardBody);

  productList.appendChild(card);
}
