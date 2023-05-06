import { PokemonCriteria } from './types';
import { ThunkResult, AppDispatch } from '../index';
import { getPokemonsCount, getPokemonTypes, getPokemons, getPokemonDetails } from '../../api';
import {
	fetchPokemonConstsRequest,
	fetchPokemonTypesSuccess,
	fetchPokemonCountSuccess,
	fetchPokemonListSuccess,
	fetchPokemonConstsSuccess,
	fetchPokemonConstsFailure,
} from '../pokemonConsts/actions';

export const fetchPokemonConsts = (): ThunkResult<void> => async (dispatch: AppDispatch) => {
	dispatch(fetchPokemonConstsRequest());
	try {
		const countResponse = await getPokemonsCount();
		const typesResponse = await getPokemonTypes();
		const pokemonsResponse = await getPokemons(countResponse, 0);
		const pokemonList: PokemonCriteria[] = await Promise.all(
			pokemonsResponse.map(async (result: { url: any }) => {
				const pokemonDetails = await getPokemonDetails(result.url);
				return {
					id: pokemonDetails.id,
					name: pokemonDetails.name,
					types: pokemonDetails.types.map((type: { type: { name: any } }) => type.type.name),
					is_default: pokemonDetails.is_default,
				};
			}),
		);

		const types = typesResponse.map((type: { name: any }) => {
			return type.name;
		});
		dispatch(fetchPokemonTypesSuccess(types));
		dispatch(fetchPokemonCountSuccess(countResponse));
		dispatch(fetchPokemonListSuccess(pokemonList));
		dispatch(fetchPokemonConstsSuccess());
	} catch (error) {
		dispatch(fetchPokemonConstsFailure(error as Error));
	}
};
