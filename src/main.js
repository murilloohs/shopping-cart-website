import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';

const productsList = document.querySelector('.products');

document.querySelector('.cep-button').addEventListener('click', searchCep);

const createLoadText = () => {
  const loadingText = document.createElement('p');
  loadingText.className = 'loading';
  loadingText.innerHTML = 'carregando...';
  productsList.appendChild(loadingText);
};

const removeLoadText = () => {
  const loadingText = document.querySelector('.loading');
  productsList.removeChild(loadingText);
};

const totalElement = document.querySelector('.total-price');
let prices = [0];
let indexLi = 0;

const onloadPrices = () => {
  let storagePrices = JSON.parse(localStorage.getItem('price'));
  if (storagePrices === null) {
    storagePrices = [];
  }
  prices = storagePrices;

  let price = storagePrices.reduce((total, actual) => total + actual, 0);
  totalElement.innerText = price;

  const li = document.querySelectorAll('.cart__product');

  li.forEach((element, index) => {
    element.addEventListener('click', () => {
      storagePrices = JSON.parse(localStorage.getItem('price'));
      const priceIten = storagePrices[index + 1];

      prices = storagePrices.filter((number) => number !== priceIten);
      price = prices.reduce((total, actual) => total + actual, 0);

      totalElement.innerText = price;
      localStorage.setItem('price', JSON.stringify(prices));
    });
  });
  if (li === 0) {
    totalElement.innerText = 0;
  }
};

const cartList = document.querySelector('.cart__products');

const productInCart = () => getSavedCartIDs().forEach(async (elementId) => {
  const data = await fetchProduct(elementId);
  cartList.appendChild(createCartProductElement(data));
});

productInCart();

const totalPrice = (p) => {
  prices.push(p);
  localStorage.setItem('price', JSON.stringify(prices));
  const storagePrices = JSON.parse(localStorage.getItem('price'));
  const price = storagePrices.reduce((total, actual) => total + actual);
  totalElement.innerText = price.toFixed(2);
};

const removePrice = (p) => {
  const li = document.querySelectorAll('.cart__product');
  li[indexLi].addEventListener('click', () => {
    prices = prices.filter((number) => number !== p);
    localStorage.setItem('price', JSON.stringify(prices));
    const storagePrices = JSON.parse(localStorage.getItem('price'));
    const price = storagePrices.reduce((total, actual) => total + actual, 0);
    totalElement.innerText = price.toFixed(2);
    indexLi -= 1;
  });
};

const addToCart = async (element) => {
  const { target } = element;
  const id = target.parentElement.firstChild.innerHTML;

  const productData = await fetchProduct(id);
  const cartProduct = createCartProductElement(productData);
  cartList.appendChild(cartProduct);

  const p = productData.price;

  saveCartID(id, p);
  totalPrice(p);
  removePrice(p);
  indexLi += 1;
};

try {
  createLoadText();
  const fetchData = async () => {
    const products = await fetchProductsList('computador');
    const addProducts = () => {
      products.forEach((element) => {
        const { id, title, thumbnail, price } = element;
        productsList.appendChild(createProductElement({ id, title, thumbnail, price }));
      });
      onloadPrices();
      removeLoadText();

      const addToCartBtn = document.querySelectorAll('.product__add');
      addToCartBtn.forEach((element) => element.addEventListener('click', addToCart));
    };
    addProducts();
  };
  fetchData();
} catch (error) {
  removeLoadText();
  const errorText = document.createElement('p');
  errorText.className = 'error';
  errorText.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  productsList.appendChild(errorText);
}
