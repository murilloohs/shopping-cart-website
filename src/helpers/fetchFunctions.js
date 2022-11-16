import fetch from "node-fetch";

export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = (product) => {
  if (!product) throw new Error('Termo de busca não informado');

  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

  return fetch(url)
    .then((response) => response.json())
    .then(console.log);
};

console.log(fetchProductsList('computador'));
