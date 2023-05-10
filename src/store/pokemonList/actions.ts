import { Pokemon } from '../pokemon/types';
import { PokemonListActionTypes, PokemonListAction } from './types';

export const fetchPokemonsRequest = (): PokemonListAction => ({
	type: PokemonListActionTypes.POKEMONS_LOADING,
});

export const fetchPokemonsSuccess = (pokemons: Pokemon[]): PokemonListAction => ({
	type: PokemonListActionTypes.POKEMONS_LOAD_SUCCESS,
	payload: pokemons,
});

export const fetchPokemonsFailure = (error: Error): PokemonListAction => ({
	type: PokemonListActionTypes.POKEMONS_LOAD_ERROR,
	payload: error,
});

export const setSearchQuery = (query: string): PokemonListAction => ({
	type: PokemonListActionTypes.SET_SEARCH_QUERY,
	payload: query,
});

export const setCurrentCount = (count: number): PokemonListAction => ({
	type: PokemonListActionTypes.SET_CURRENT_COUNT,
	payload: count,
});

export const setSelectedTypes = (selectedTypes: string[]): PokemonListAction => ({
	type: PokemonListActionTypes.SET_SELECTED_TYPES,
	payload: selectedTypes,
});

export const setCurrentPage = (page: number): PokemonListAction => ({
	type: PokemonListActionTypes.SET_CURRENT_PAGE,
	payload: page,
});

export const setItemsPerPage = (itemsPerPage: number): PokemonListAction => ({
	type: PokemonListActionTypes.SET_ITEMS_PER_PAGE,
	payload: itemsPerPage,
});
