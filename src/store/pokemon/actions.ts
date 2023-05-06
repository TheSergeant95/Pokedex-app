import { PokemonCardActionTypes, PokemonCardAction, Pokemon } from './types';

export const loadPokemonRequest = (): PokemonCardAction => ({
	type: PokemonCardActionTypes.LOAD_POKEMON_REQUEST,
});

export const loadPokemonSuccess = (pokemon: Pokemon): PokemonCardAction => ({
	type: PokemonCardActionTypes.LOAD_POKEMON_SUCCESS,
	payload: pokemon,
});

export const loadPokemonFailure = (error: Error): PokemonCardAction => ({
	type: PokemonCardActionTypes.LOAD_POKEMON_FAILURE,
	payload: error,
});
