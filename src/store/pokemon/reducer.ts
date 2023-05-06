import { PokemonCardActionTypes, PokemonCardAction, PokemonState } from './types';

const initialState: PokemonState = {
	data: {
		id: 0,
		name: '',
		types: [],
		image: '',
		height: 0,
		weight: 0,
		stats: [],
		species: '',
		abilities: [],
		genders: [],
		weaknesses: [],
	},
	cardLoading: true,
	cardError: null,
};

const pokemonReducer = (state = initialState, action: PokemonCardAction): PokemonState => {
	switch (action.type) {
		case PokemonCardActionTypes.LOAD_POKEMON_REQUEST:
			return {
				...state,
				cardLoading: true,
				cardError: null,
			};
		case PokemonCardActionTypes.LOAD_POKEMON_SUCCESS:
			return {
				...state,
				cardLoading: false,
				cardError: null,
				data: { ...state.data, ...action.payload },
			};
		case PokemonCardActionTypes.LOAD_POKEMON_FAILURE:
			return {
				...state,
				cardLoading: false,
				cardError: action.payload,
			};
		default:
			return state;
	}
};

export default pokemonReducer;
