export const fetchProduct = async (id) => {
  if (!id) throw new Error('ID não informado');

  const url = `https://api.mercadolibre.com/items/${id}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchProductsList = async (product) => {
  if (!product) throw new Error('Termo de busca não informado');

  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};
