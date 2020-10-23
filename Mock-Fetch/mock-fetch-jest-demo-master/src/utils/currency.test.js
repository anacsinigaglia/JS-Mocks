import { convert } from './currency';

describe('Currency', () => {
  beforeEach( () => { 
    fetch.mockClear(); 
  } );
  
  global.fetch = jest.fn(() => 
    Promise.resolve({
      json: () => Promise.resolve( { rates: { CAD: 1.42 } } ), //mock do valor de conversão
    })
  );

  it('should convert USD to CAD', async () => { //USD=dolar americano, CAD=dolar canadense
    const rate = await convert("USD", "CAD");
    expect(rate).toEqual(1.42); //como esse valor de conversão sempre muda, acima faço um valor mockado, só pra testar se a conversão ocorre, independente do valor
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should handle exception with null', async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API failure"));
    const rate = await convert("USD", "CAD");
    expect(rate).toEqual(null);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.exchangeratesapi.io/latest?base=USD`
    );
  })
})