const APIMercadoLibre = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
const APIItems = 'https://api.mercadolibre.com/items/';
const olCartItems = '.cart__items';
const spanTotalPrice = '.total-price';
let sumTotalCart = 0;
let sumCount = 0;


const addCount = () => {
  const count = document.querySelector('.count');
  count.innerHTML = sumCount;
}

// Requisito 4 - Carregue o carrinho de compras através do LocalStorage ao iniciar a página

const saveCart = () => {
  const cartItems = document.querySelector(olCartItems);
  localStorage.setItem('cartItems', cartItems.innerHTML);
};

const saveTotalPrice = () => { // Adição requisito 5
  const span = document.querySelector(spanTotalPrice);
  localStorage.setItem('totalPrice', span.innerHTML);

  const count = document.querySelector('.count');
  localStorage.setItem('countCart', count.innerHTML);
};

const getCart = () => {
  document.querySelector(olCartItems)
    .innerHTML = localStorage.getItem('cartItems');
  // Adição requisito 5
  document.querySelector('.total-price')
    .innerHTML = localStorage.getItem('totalPrice');
  // Contador
  document.querySelector('.count')
    .innerHTML = localStorage.getItem('countCart');
};

// Requisito 3 - Remova o item do carrinho de compras ao clicar nele

function cartItemClickListener(event) {
  const span = document.querySelector(spanTotalPrice);
  const price = parseFloat(event.target.innerHTML.split('$')[1], 10);
  event.target.remove();
  sumTotalCart -= price;
  sumCount -= 1;
  span.innerHTML = Math.abs(parseFloat(sumTotalCart).toFixed(2));
  addCount();
  saveTotalPrice();
  saveCart();
}

// Requisito 4 - Carregue o carrinho de compras através do LocalStorage ao iniciar a página
const cartAddEventListener = () => {
  const listCart = document.querySelectorAll('.cart__item');
  listCart.forEach((li) => {
    li.addEventListener('click', (event) => {
      cartItemClickListener(event);
    });
  });
};

// Requisito 5 - Some o valor total dos itens do carrinho de compras

const cartTotalPrice = (infoItem) => {
  const span = document.querySelector(spanTotalPrice);
  sumTotalCart += infoItem.salePrice;
  span.innerHTML = Math.abs(parseFloat(sumTotalCart).toFixed(2));
};

// Requisito 6 - Crie um botão para limpar carrinho de compras

const emptyCart = () => {
  const btnEmptyCart = document.querySelector('.empty-cart');
  const ol = document.querySelector(olCartItems);
  const priceTotal = document.querySelector(spanTotalPrice);
  const count = document.querySelector('.count');
  btnEmptyCart.addEventListener('click', () => {
    ol.innerHTML = '';
    priceTotal.innerHTML = 0;
    sumCount = 0;
    addCount();
    saveCart();
    saveTotalPrice();
  });
};

// Requisito 7 - Adicione um texto de "loading" durante uma requisição à API

const loadingAPI = () => {
  const loading = document.querySelector('.loading');
  loading.innerHTML = 'loading...';
};

const removeLoadingAPI = () => {
  const loading = document.querySelector('.loading');
  loading.remove();
};

// Requisito 2 - Adicione o produto ao carrinho de compras

const requestApiItems = async (itemID) => {
  const response = await fetch(`${APIItems}${itemID}`);
  return response.json();
};

/* 
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} 
*/

function createCartItemElement({ sku, name, salePrice, img }) {
  const li = document.createElement('li');
  const image = document.createElement('img');
  li.className = 'cart__item';
  // li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.innerText = `${name} | $${salePrice}`;
  li.appendChild(image);
  image.src = img;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addItemToCart = (itemID) => {
  requestApiItems(itemID)
  .then(({ id, title, price, secure_thumbnail }) => {
      const infoItem = {
        sku: id,
        name: title,
        salePrice: price,
        img: secure_thumbnail,
      };
      document.querySelector(olCartItems)
        .appendChild(createCartItemElement(infoItem));
      sumCount += 1;
      addCount();
      cartTotalPrice(infoItem); // Requisito 5
      saveCart(); // Requisito 4
      saveTotalPrice();
    });
};

// Requisito 1 - Crie uma listagem de produtos

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  
  // Adição para tratar requisito 2
  const buttonEventListener = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(buttonEventListener);
  buttonEventListener.addEventListener('click', () => addItemToCart(sku));

  return section;
}

const productList = async () => {
  const response = await fetch(APIMercadoLibre);
  const responseJson = await response.json();
  const data = responseJson.results;
  
  data.forEach(async ({ id, title }) => {
    const responseItem = await fetch(`${APIItems}${id}`);
    const responseItemJson = await responseItem.json();
    const picture = responseItemJson.pictures[0].url;
    const item = {
      sku: id,
      name: title,
      image: picture,
    };
    const sectionItems = document.querySelector('.items');
    sectionItems.appendChild(createProductItemElement(item));
  });
};

window.onload = async () => {
  loadingAPI();
  await productList();
  removeLoadingAPI();
  const getTotalPrice = localStorage.getItem('totalPrice');
  if (getTotalPrice) {
    sumTotalCart = parseFloat(getTotalPrice);
  }
  const getCount = localStorage.getItem('countCart');
  if (getCount) {
    sumCount = parseInt(getCount);
  }
  getCart();
  emptyCart();
  cartAddEventListener();
};
