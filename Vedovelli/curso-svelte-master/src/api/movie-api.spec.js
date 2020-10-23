jest.mock('../store');
jest.mock('./http');

import { fetchMovies, resetMovies } from './movie-api';
import { INITIAL_STATE, store } from '../store';
import { http } from './http';

describe('Movie API', () => {
    describe('fetchMovies', () => {
        beforeEach(() => {
            fetchMovies('star');
        })

        it('should call http.get', () => {
            expect(http.get).toHaveBeenCalledTimes(1);
        })
     });

    describe('resetMovies', () => {
        beforeEach(() => {
            resetMovies();
        })

        it('should call store.set', () => {
            expect(store.set).toBeCalledTimes(1);
        })

        it('should call store.set with INITIAL_STATE', () => {
            expect(store.set).toHaveBeenCalledWith({...INITIAL_STATE});
        })
    })
})