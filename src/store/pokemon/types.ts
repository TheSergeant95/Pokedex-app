import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../index';

export interface PokemonState {
	data: Pokemon;
	cardLoading: boolean;
	cardError: Error | null;
}

export interface Pokemon {
	id: number;
	name: string;
	types: string[];
	image: string;
	height: number;
	weight: number;
	stats: { base_stat: number }[];
	is_default?: boolean;
	species?: string;
	abilities?: string[];
	genders?: string[];
	weaknesses?: string[];
}
export enum PokemonCardActionTypes {
	LOAD_POKEMON_REQUEST = 'LOAD_POKEMON_REQUEST',
	LOAD_POKEMON_SUCCESS = 'LOAD_POKEMON_SUCCESS',
	LOAD_POKEMON_FAILURE = 'LOAD_POKEMON_FAILURE',
}

interface LoadPokemonRequestAction {
	type: typeof PokemonCardActionTypes.LOAD_POKEMON_REQUEST;
}

interface LoadPokemonSuccessAction {
	type: typeof PokemonCardActionTypes.LOAD_POKEMON_SUCCESS;
	payload: Pokemon;
}

interface LoadPokemonFailureAction {
	type: typeof PokemonCardActionTypes.LOAD_POKEMON_FAILURE;
	payload: Error;
}

export type PokemonCardAction =
	| LoadPokemonRequestAction
	| LoadPokemonSuccessAction
	| LoadPokemonFailureAction;

export type ThunkPokemonCardResult<R> = ThunkAction<R, RootState, undefined, PokemonCardAction>;

export type CardDispatch = ThunkDispatch<RootState, unknown, PokemonCardAction>;
