import { PokemonListState, PokemonListAction, PokemonListActionTypes } from './types';

// Define the initial state of the Pokemon list
const initialPokemonListState: PokemonListState = {
	loading: false,
	error: null,
	filteredPokemons: [],
	searchQuery: '',
	currentCount: 0,
	selectedTypes: [],
	currentPage: 1,
	itemsPerPage: 10,
};

// Define the reducer for handling the Pokemon list state
export const pokemonListReducer = (
	state: PokemonListState = initialPokemonListState,
	action: PokemonListAction,
): PokemonListState => {
	switch (action.type) {
		case PokemonListActionTypes.POKEMONS_LOADING:
			return {
				...state,
				loading: true,
				error: null,
			};
		case PokemonListActionTypes.POKEMONS_LOAD_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				filteredPokemons: action.payload,
			};
		case PokemonListActionTypes.POKEMONS_LOAD_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case PokemonListActionTypes.SET_SEARCH_QUERY:
			return {
				...state,
				searchQuery: action.payload,
				currentPage: 1,
			};
		case PokemonListActionTypes.SET_SELECTED_TYPES:
			return {
				...state,
				selectedTypes: action.payload,
				currentPage: 1,
			};
		case PokemonListActionTypes.SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.payload,
			};
		case PokemonListActionTypes.SET_CURRENT_COUNT:
			return {
				...state,
				currentCount: action.payload,
			};
		case PokemonListActionTypes.SET_ITEMS_PER_PAGE:
			return {
				...state,
				itemsPerPage: action.payload,
				currentPage: 1,
			};
		default:
			return state;
	}
};
