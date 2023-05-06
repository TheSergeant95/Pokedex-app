import { Pokemon } from '../pokemon/types';

export interface PokemonListState {
	loading: boolean;
	error: Error | null;
	filteredPokemons: Pokemon[];
	currentCount: number;
	searchQuery: string;
	selectedTypes: string[];
	currentPage: number;
	itemsPerPage: number;
}

// Define the actions that can be dispatched to the Redux store
export enum PokemonListActionTypes {
	POKEMONS_LOADING = 'POKEMONS_LOADING',
	POKEMONS_LOAD_SUCCESS = 'POKEMONS_LOAD_SUCCESS',
	POKEMONS_LOAD_ERROR = 'POKEMONS_LOAD_ERROR',
	SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
	SET_SELECTED_TYPES = 'SET_SELECTED_TYPES',
	SET_CURRENT_COUNT = 'SET_CURRENT_COUNT',
	SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
	SET_ITEMS_PER_PAGE = 'SET_ITEMS_PER_PAGE',
}

interface LoadPokemonsRequestAction {
	type: typeof PokemonListActionTypes.POKEMONS_LOADING;
}

interface LoadPokemonsSuccessAction {
	type: typeof PokemonListActionTypes.POKEMONS_LOAD_SUCCESS;
	payload: Pokemon[];
}
interface LoadPokemonsFailureAction {
	type: typeof PokemonListActionTypes.POKEMONS_LOAD_ERROR;
	payload: Error;
}

interface SetSearchQueryAction {
	type: typeof PokemonListActionTypes.SET_SEARCH_QUERY;
	payload: string;
}

interface SetSelectedTypesAction {
	type: typeof PokemonListActionTypes.SET_SELECTED_TYPES;
	payload: string[];
}

interface SetCurrentPageAction {
	type: typeof PokemonListActionTypes.SET_CURRENT_PAGE;
	payload: number;
}

interface SetItemsPerPageAction {
	type: typeof PokemonListActionTypes.SET_ITEMS_PER_PAGE;
	payload: number;
}

interface SetCurrentCountAction {
	type: typeof PokemonListActionTypes.SET_CURRENT_COUNT;
	payload: number;
}

export type PokemonListAction =
	| LoadPokemonsRequestAction
	| LoadPokemonsSuccessAction
	| LoadPokemonsFailureAction
	| SetCurrentCountAction
	| SetSearchQueryAction
	| SetSelectedTypesAction
	| SetCurrentPageAction
	| SetItemsPerPageAction;
