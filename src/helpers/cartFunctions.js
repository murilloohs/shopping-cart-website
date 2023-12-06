export const getSavedCartIDs = () => {
  const cartProducts = localStorage.getItem('cartProducts');
  return cartProducts ? JSON.parse(cartProducts) : [];
};

export const getSavedCartPrice = () => {
  const cartPrice = localStorage.getItem('price');
  return cartPrice ? JSON.parse(cartPrice) : [];
};

export const saveCartID = (id, price) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = getSavedCartIDs();
  const newCartProducts = [...cartProducts, id];
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));

  const cartPrice = getSavedCartPrice();
  const newCartPrice = [...cartPrice, price];
  localStorage.setItem('price', JSON.stringify(newCartPrice));
};

export const removeCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  function removeFirstOccurrence(arr, reference) {
    const index = arr.indexOf(reference);
    const one = -1;
    if (index !== one) {
      arr.splice(index, 1);
    }
    return arr;
  }

  const cartProducts = getSavedCartIDs();
  const newCartProducts = removeFirstOccurrence(cartProducts, id);
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));

  // const cartPrice = getSavedCartPrice();
  // const newCartPrice = removeFirstOccurrence(cartPrice, price);
  // localStorage.setItem('price', JSON.stringify(newCartPrice));
};
