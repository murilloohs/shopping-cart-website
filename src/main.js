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

try {
  createLoadText();
  const products = await fetchProductsList('computador');
  const addProducts = () => {
    products.forEach((element) => {
      const { id, title, thumbnail, price } = element;

      productsList.appendChild(createProductElement({ id, title, thumbnail, price }));
    });
    removeLoadText();
  };
  addProducts();
} catch (error) {
  removeLoadText();
  const errorText = document.createElement('p');
  errorText.className = 'error';
  errorText.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  productsList.appendChild(errorText);
}

const addToCartBtn = document.querySelectorAll('.product__add');
const cartList = document.querySelector('.cart__products');

const addToCart = async (element) => {
  const { target } = element;
  const id = target.parentElement.firstChild.innerHTML;

  saveCartID(id);

  const productData = await fetchProduct(id);
  const cartProduct = createCartProductElement(productData);
  cartList.appendChild(cartProduct);
};

addToCartBtn.forEach((element) => element.addEventListener('click', addToCart));

const productInCart = () => getSavedCartIDs().forEach(async (elementId) => {
  const data = await fetchProduct(elementId);
  cartList.appendChild(createCartProductElement(data));
});

productInCart();
