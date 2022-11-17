import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';

const productsList = document.querySelector('.products');

document.querySelector('.cep-button').addEventListener('click', searchCep);

const createLoadText = () => {
  const loadingText = document.createElement('p');
  loadingText.className = 'loading';
  loadingText.innerHTML = 'carregando...';
  productsList.appendChild(loadingText);
};

createLoadText();

const products = await fetchProductsList('computador');

const removeLoadText = () => {
  const loadingText = document.querySelector('.loading');
  productsList.removeChild(loadingText);
};

const addProducts = () => {
  products.forEach((element) => {
    const { id, title, thumbnail, price } = element;

    productsList.appendChild(createProductElement({ id, title, thumbnail, price }));
  });
  removeLoadText();
};

addProducts();
