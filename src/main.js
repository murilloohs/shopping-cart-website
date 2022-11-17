import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';

const productsList = document.querySelector('.products');

document.querySelector('.cep-button').addEventListener('click', searchCep);

const products = await fetchProductsList('computador');

const addProducts = () => {
  products.forEach((element) => {
    const { id, title, thumbnail, price } = element;

    productsList.appendChild(createProductElement({ id, title, thumbnail, price }));
  });
};

addProducts();
