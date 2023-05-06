import {
	PokemonConstsListState,
	PokemonConstsListAction,
	PokemonConstsListActionTypes,
} from './types';

const initialPokemonConstsListState: PokemonConstsListState = {
	constLoading: false,
	constError: null,
	types: [],
	pokemons: [],
	count: 0,
};

// Define the reducer for handling the Pokemon list state
export const pokemonConstsListReducer = (
	state: PokemonConstsListState = initialPokemonConstsListState,
	action: PokemonConstsListAction,
): PokemonConstsListState => {
	switch (action.type) {
		case PokemonConstsListActionTypes.POKEMON_CONSTS_LOAD_REQUEST:
			return {
				...state,
				constLoading: true,
				constError: null,
			};
		case PokemonConstsListActionTypes.POKEMON_TYPES_LOAD_SUCCESS:
			return {
				...state,
				types: action.payload,
			};
		case PokemonConstsListActionTypes.POKEMON_COUNT_LOAD_SUCCESS:
			return {
				...state,
				count: action.payload,
			};
		case PokemonConstsListActionTypes.POKEMON_LIST_LOAD_SUCCESS:
			return {
				...state,
				pokemons: action.payload,
			};
		case PokemonConstsListActionTypes.POKEMON_CONSTS_LOAD_ERROR:
			return {
				...state,
				constLoading: false,
				constError: action.payload,
			};
		case PokemonConstsListActionTypes.POKEMON_CONSTS_LOAD_SUCCESS:
			return {
				...state,
				constLoading: false,
				constError: null,
			};
		default:
			return state;
	}
};
