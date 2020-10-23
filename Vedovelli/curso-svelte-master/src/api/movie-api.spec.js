jest.mock('../store');
jest.mock('./http');

//verificar cobertura do teste: yarn test -- --coverage

import { fetchMovies, resetMovies } from './movie-api';
import { INITIAL_STATE, store } from '../store';
import { http } from './http';
import data from '../mocks/movie.json'; //aqui, eu estou chamando de data (podia ser outro nome) os dados mockados que eu tenho lá
//são 3 dados de filmes mockados

describe('Movie API', () => {
    afterEach(() => { //to resetando aqui meus mocks pra ele não iterar a contagem das execuções (dos toHaveBeenCalledTimes)
        jest.resetAllMocks();
    });

    describe('fetchMovies', () => {

        //Ao mockar o http, o jest deveria me retornar um objeto como o que existe no fetchMovies, o "data", contendo results: movies,
        //contudo, ele retorna vazio, então no beforeEach eu informo a ele o que ele deveria retornar:
        beforeEach(() => {
            http.get.mockImplementation(() => { //Obs.: get espera que seja retornada uma Promise
                return Promise.resolve({ data }); //Passo no resolve o shape que a API normalmente retornaria, populada pelo data que eu importei com os dados dos filmes mockados
            });
            fetchMovies('star'); //Isso aqui não tem nada a ver com o bagui de cima, é só pra passar um argumento toda vez pq o fetchMovies exige
        });

        //Se eu quiser que só um teste rode, nele eu coloco "fit" ao invés de "it"
        it('should call http.get', () => {
            expect(http.get).toHaveBeenCalledTimes(1);
        });

        it('should call http.get with proper URL', () => {
            expect(http.get).toHaveBeenCalledWith('movie?api_key=a1279933de606b4374a2c93a1d0127a9&query=star');
            //dica: passo vazio ali no toHaveBeenCalledWith, porque ele vai me retornar a url e, se for correta, eu uso ela no teste /\
        });

        it('should set received values into the store', () => {
            expect(store.set).toHaveBeenCalledTimes(1);
            expect(store.set).toHaveBeenCalledWith({
                ...INITIAL_STATE,
                wasSearched: true,
                movies: data.results, //"data" é o mock que eu importei, "results" é a lista de movies que tem lá
            });
        });

        it('should return a list of 3 movie objects', async () => {
            const { data: {page, total_results, total_pages, results} } = await http.get(); //é seguro chamar meu http.get(vazio) pois já estabeleci ele ali em cima no beforeEach e sei o q ele está retornando
            expect(results).toHaveLength(3);
        });

        it('should exist page, total_results and total_pages', async () => {
            const { data: {page, total_results, total_pages} } = await http.get();
            expect(page).not.toBeUndefined();//o "page" lá do meu mock 'movie.json' tem que existir
            expect(total_results).not.toBeUndefined(); //mesma coisa
            expect(total_pages).not.toBeUndefined(); //mesma coisa
        });
    });

    describe('resetMovies', () => {
        beforeEach(() => {
            resetMovies();
        })

        it('should call store.set', () => {
            expect(store.set).toBeCalledTimes(1);
        })

        it('should call store.set with INITIAL_STATE', () => {
            expect(store.set).toHaveBeenCalledWith({ ...INITIAL_STATE });
        })
    })
})