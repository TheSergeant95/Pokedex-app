import {
	PokemonState,
	PokemonActionTypes,
	LOAD_POKEMON_REQUEST,
	LOAD_POKEMON_SUCCESS,
	LOAD_POKEMON_FAILURE,
} from './types';

const initialState: PokemonState = {
	data: [],
	selected: null,
	isLoading: false,
	error: null,
};

const pokemonReducer = (state = initialState, action: PokemonActionTypes): PokemonState => {
	switch (action.type) {
		case LOAD_POKEMON_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case LOAD_POKEMON_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				data: [...state.data, action.payload],
			};
		case LOAD_POKEMON_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default pokemonReducer;
