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
//Извлечение постоянных данных (кол-во покемонов, имена, типы), запросы на данные всех покемонов совершаются пакетами по 100 шт.
export const fetchPokemonConsts = (): ThunkResult<void> => async (dispatch: AppDispatch) => {
	dispatch(fetchPokemonConstsRequest());
	try {
		const [countResponse, typesResponse] = await Promise.all([
			getPokemonsCount(),
			getPokemonTypes(),
		]);
		const pokemonsResponse = await getPokemons(countResponse, 0);
		const batchSize = 100;

		for (let i = 0; i < countResponse / batchSize; i++) {
			const pokemonBatch = pokemonsResponse.slice(i * batchSize, (i + 1) * batchSize);
			const pokemonList = await Promise.all(
				pokemonBatch.map(async (result: { url: any }) => {
					// Запросы для получения деталей покемонов внутри пакета
					const pokemonDetails = await getPokemonDetails(result.url);
					return {
						id: pokemonDetails.id,
						name: pokemonDetails.name,
						types: pokemonDetails.types.map((type: { type: { name: any } }) => type.type.name),
						is_default: pokemonDetails.is_default,
					};
				}),
			);
			dispatch(fetchPokemonListSuccess(pokemonList));
		}

		const types = typesResponse.map((type: { name: any }) => {
			return type.name;
		});
		dispatch(fetchPokemonTypesSuccess(types));
		dispatch(fetchPokemonCountSuccess(countResponse));
		dispatch(fetchPokemonConstsSuccess());
	} catch (error) {
		dispatch(fetchPokemonConstsFailure(error as Error));
	}
};
