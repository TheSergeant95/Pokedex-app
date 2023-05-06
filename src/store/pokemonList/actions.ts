import { Pokemon } from '../pokemon/types';
import { PokemonListActionTypes, PokemonListAction } from './types';

// Define the action creators for fetching the list of pokemons
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

// Define the action creators for setting the search query
export const setSearchQuery = (query: string): PokemonListAction => ({
	type: PokemonListActionTypes.SET_SEARCH_QUERY,
	payload: query,
});

export const setCurrentCount = (count: number): PokemonListAction => ({
	type: PokemonListActionTypes.SET_CURRENT_COUNT,
	payload: count,
});

// Define the action creators for setting the selected types
export const setSelectedTypes = (selectedTypes: string[]): PokemonListAction => ({
	type: PokemonListActionTypes.SET_SELECTED_TYPES,
	payload: selectedTypes,
});

// Define the action creators for setting the current page
export const setCurrentPage = (page: number): PokemonListAction => ({
	type: PokemonListActionTypes.SET_CURRENT_PAGE,
	payload: page,
});

// Define the action creators for setting the items per page
export const setItemsPerPage = (itemsPerPage: number): PokemonListAction => ({
	type: PokemonListActionTypes.SET_ITEMS_PER_PAGE,
	payload: itemsPerPage,
});
