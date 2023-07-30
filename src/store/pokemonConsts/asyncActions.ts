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
	const cachedData = await localStorage.getItem('pokemonConsts');
	try {
		if (cachedData) {
			const data = JSON.parse(cachedData);
			const batchSize = 100;
			for (let i = 0; i < data.count / batchSize; i++) {
				const pokemonBatch = data.list.slice(i * batchSize, (i + 1) * batchSize);
				dispatch(fetchPokemonListSuccess(pokemonBatch));
			}
			dispatch(fetchPokemonTypesSuccess(data.types));
			dispatch(fetchPokemonCountSuccess(data.count));
			dispatch(fetchPokemonConstsSuccess());
			console.log(data.list);
		} else {
			const [countResponse, typesResponse] = await Promise.all([
				getPokemonsCount(),
				getPokemonTypes(),
			]);
			const pokemonsResponse = await getPokemons(countResponse, 0);
			const batchSize = 100;
			const pokemonList: any[] = [];

			for (let i = 0; i < countResponse / batchSize; i++) {
				const pokemonBatch = pokemonsResponse.slice(i * batchSize, (i + 1) * batchSize);
				const pokemonDetailsList = await Promise.all(
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
				pokemonList.push(...pokemonDetailsList);
				dispatch(fetchPokemonListSuccess(pokemonDetailsList));
			}

			const types = typesResponse.map((type: { name: any }) => type.name);
			dispatch(fetchPokemonTypesSuccess(types));
			dispatch(fetchPokemonCountSuccess(countResponse));
			dispatch(fetchPokemonConstsSuccess());

			const dataToCache = JSON.stringify({
				types,
				count: countResponse,
				list: pokemonList,
			});
			localStorage.setItem('pokemonConsts', dataToCache);
		}
	} catch (error) {
		dispatch(fetchPokemonConstsFailure(error as Error));
	}
};
