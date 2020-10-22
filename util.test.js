// jest.mock('./http');
//não precisamos instruir que ele já vai usar o axios.js na pasta de mocks

const { loadTitle } = require('./util');

test('should print an uppercase text', () => {
    loadTitle().then(title => {
        expect(title).toBe('DELECTUS AUT AUTEM');
    });
});