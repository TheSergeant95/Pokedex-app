import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import pokemonReducer from './pokemon/reducer';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	pokemon: pokemonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer, middleware: [thunk] });

export default store;
