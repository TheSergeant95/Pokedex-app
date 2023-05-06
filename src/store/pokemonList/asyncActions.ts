import { ThunkResult, AppDispatch } from '..';

import { getPokemonByName } from '../../api';

import { filterPost, searchPost } from '../../utils';

import { Pokemon } from '../pokemon/types';
import { PokemonCriteria } from '../pokemonConsts/types';

import {
	fetchPokemonsRequest,
	setCurrentCount,
	fetchPokemonsSuccess,
	fetchPokemonsFailure,
} from './actions';

export const fetchPokemons =
	(
		pokemons: PokemonCriteria[],
		selectedTypes: string[],
		searchQuery: string,
		limit: number,
		page: number,
	): ThunkResult<void> =>
	async (dispatch: AppDispatch) => {
		dispatch(fetchPokemonsRequest());
		try {
			const offset = page * limit - limit;
			const filteredPokemons = filterPost(searchPost(pokemons, searchQuery), selectedTypes);
			const paginatedPokemons = filteredPokemons.filter(
				(pokemon, index) => index >= offset && index < offset + limit,
			);
			const pokemonList: Pokemon[] = await Promise.all(
				paginatedPokemons.map(async (pokemon: PokemonCriteria) => {
					const pokemonDetails = await getPokemonByName(pokemon.name);
					return {
						id: pokemonDetails.id,
						name: pokemonDetails.name,
						image: pokemonDetails.sprites.front_default,
						types: pokemonDetails.types.map((type: { type: { name: any } }) => type.type.name),
						height: pokemonDetails.height,
						weight: pokemonDetails.weight,
						stats: pokemonDetails.stats,
					};
				}),
			);
			dispatch(setCurrentCount(filteredPokemons.length));
			dispatch(fetchPokemonsSuccess(pokemonList));
		} catch (error) {
			dispatch(fetchPokemonsFailure(error as Error));
		}
	};
