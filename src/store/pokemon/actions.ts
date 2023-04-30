// src/store/pokemon/actions.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import {
	PokemonActionTypes,
	LOAD_POKEMON_REQUEST,
	LOAD_POKEMON_SUCCESS,
	LOAD_POKEMON_FAILURE,
	Pokemon,
} from './types';
import { fetchPokemonByName } from '../../api';

export const loadPokemonRequest = (): PokemonActionTypes => ({
	type: LOAD_POKEMON_REQUEST,
});

export const loadPokemonSuccess = (pokemon: Pokemon): PokemonActionTypes => ({
	type: LOAD_POKEMON_SUCCESS,
	payload: pokemon,
});

export const loadPokemonFailure = (error: string): PokemonActionTypes => ({
	type: LOAD_POKEMON_FAILURE,
	payload: error,
});

export const loadPokemon =
	(name: string): ThunkAction<void, RootState, unknown, PokemonActionTypes> =>
	async (dispatch) => {
		dispatch(loadPokemonRequest());

		try {
			const pokemon = await fetchPokemonByName(name);
			dispatch(loadPokemonSuccess(pokemon));
		} catch (error) {
			dispatch(loadPokemonFailure((error as Error).message));
		}
	};
