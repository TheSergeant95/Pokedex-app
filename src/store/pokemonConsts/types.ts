export interface PokemonConstsListState {
	constLoading: boolean;
	constError: Error | null;
	types: string[];
	pokemons: PokemonCriteria[];
	count: number;
}

export type PokemonCriteria = {
	id: number;
	name: string;
	is_default: boolean;
	types: string[];
};

export enum PokemonConstsListActionTypes {
	POKEMON_CONSTS_LOAD_REQUEST = 'POKEMON_CONSTS_LOAD_REQUEST',
	POKEMON_TYPES_LOAD_SUCCESS = 'POKEMON_TYPES_LOAD_SUCCESS',
	POKEMON_COUNT_LOAD_SUCCESS = 'POKEMON_COUNT_LOAD_SUCCESS',
	POKEMON_LIST_LOAD_SUCCESS = 'POKEMON_LIST_LOAD_SUCCESS',
	POKEMON_CONSTS_LOAD_SUCCESS = 'POKEMON_CONSTS_LOAD_SUCCESS',
	POKEMON_CONSTS_LOAD_ERROR = 'POKEMON_CONSTS_LOAD_ERROR',
}

interface LoadPokemonConstsAction {
	type: typeof PokemonConstsListActionTypes.POKEMON_CONSTS_LOAD_REQUEST;
}

interface LoadPokemonTypesSuccessAction {
	type: typeof PokemonConstsListActionTypes.POKEMON_TYPES_LOAD_SUCCESS;
	payload: string[];
}

interface LoadPokemonCountSuccessAction {
	type: typeof PokemonConstsListActionTypes.POKEMON_COUNT_LOAD_SUCCESS;
	payload: number;
}

interface LoadPokemonListSuccessAction {
	type: typeof PokemonConstsListActionTypes.POKEMON_LIST_LOAD_SUCCESS;
	payload: PokemonCriteria[];
}

interface LoadPokemonConstsSuccessAction {
	type: typeof PokemonConstsListActionTypes.POKEMON_CONSTS_LOAD_SUCCESS;
}

interface LoadPokemonConstsFailureAction {
	type: typeof PokemonConstsListActionTypes.POKEMON_CONSTS_LOAD_ERROR;
	payload: Error;
}

export type PokemonConstsListAction =
	| LoadPokemonConstsAction
	| LoadPokemonListSuccessAction
	| LoadPokemonTypesSuccessAction
	| LoadPokemonCountSuccessAction
	| LoadPokemonConstsSuccessAction
	| LoadPokemonConstsFailureAction;
