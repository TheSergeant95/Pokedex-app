export interface PokemonState {
	data: Pokemon[];
	selected: Pokemon | null;
	isLoading: boolean;
	error: string | null;
}

export interface Pokemon {
	id: number;
	name: string;
	types: string[];
	height: number;
	weight: number;
	stats: { base_stat: number }[];
	sprites: { front_default: string };
}

export const LOAD_POKEMON_REQUEST = 'LOAD_POKEMON_REQUEST';
export const LOAD_POKEMON_SUCCESS = 'LOAD_POKEMON_SUCCESS';
export const LOAD_POKEMON_FAILURE = 'LOAD_POKEMON_FAILURE';

interface LoadPokemonRequestAction {
	type: typeof LOAD_POKEMON_REQUEST;
}

interface LoadPokemonSuccessAction {
	type: typeof LOAD_POKEMON_SUCCESS;
	payload: Pokemon;
}

interface LoadPokemonFailureAction {
	type: typeof LOAD_POKEMON_FAILURE;
	payload: string;
}

export type PokemonActionTypes =
	| LoadPokemonRequestAction
	| LoadPokemonSuccessAction
	| LoadPokemonFailureAction;
