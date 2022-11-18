import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', () => {
    fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', () => {
    fetchProductsList('computador');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('Teste se o retorno da função fetchProductsList com o argumento `computador` é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect(await fetchProductsList('computador')).toEqual(computadorSearch);
  });

  it('fetchProductsList retorna um erro quando não é passado nenhum parâmetro', () => {
    expect(fetchProductsList()).rejects.toThrowError('Termo de busca não informado');
  });
});
