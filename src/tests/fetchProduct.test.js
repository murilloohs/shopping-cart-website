import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado ao executar fetchProduct', () => {
    fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProduct', () => {
    fetchProduct('MLB1405519561computador');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it('Teste se o retorno da função fetchProduct com o argumento do produto "MLB1405519561" é uma estrutura de dados igual ao objeto produto', () => {
    expect(fetchProduct('MLB1405519561')).resolves.toEqual(product);
  });

  it('Teste se, ao chamar a função fetchProduct sem argumento, retorna um erro com a mensagem: `ID não informado`', () => {
    fetchProduct()
      .then(() => done(new Error('A função não retornou um erro')))
      .catch((err) => {
        expect(err.message).toEqual('ID não informado');
        done();
      });
  });
});
