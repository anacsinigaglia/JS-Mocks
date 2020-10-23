import { convert } from './currency';

global.fetch = jest.fn(() => {
  Promise.resolve({
    json: () => Promise.resolve( { rates: { CAD: 1.42 } } ); //mock do valor de conversão
  })
})

describe('Currency', () => {

  it('should convert USD to CAD', async () => { //USD=dolar americano, CAD=dolar canadense
    const rate = await convert("USD", "CAD");
    expect(rate).toEqual(1.42); //como esse valor de conversão sempre muda, acima faço um valor mockado, só pra testar se a conversão ocorre, independente do valor
  })
})