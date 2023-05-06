import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import pokemonReducer from './pokemon/reducer';
import { modalWindowReducer } from './modal/reducer';
import { pokemonListReducer } from './pokemonList/reducer';
import { pokemonConstsListReducer } from './pokemonConsts/reducer';

import { ModalWindowAction } from './modal/types';
import { PokemonListAction } from './pokemonList/types';
import { PokemonConstsListAction } from './pokemonConsts/types';

const rootReducer = combineReducers({
	pokemon: pokemonReducer,
	pokemonList: pokemonListReducer,
	pokemonConsts: pokemonConstsListReducer,
	modalWindow: modalWindowReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Define the thunk types
export type ThunkResult<R> = ThunkAction<
	R,
	RootState,
	undefined,
	PokemonListAction | PokemonConstsListAction | ModalWindowAction
>;

export type AppDispatch = ThunkDispatch<
	RootState,
	unknown,
	PokemonListAction | PokemonConstsListAction | ModalWindowAction
>;

const store = configureStore({ reducer: rootReducer, middleware: [thunk] });
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
export default store;
