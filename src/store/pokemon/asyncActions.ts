import { getPokemonByName, getPokemonSpecies, getPokemonDetails } from '../../api';
import { titleCase, getSpecies, getGenders, getAbilities } from '../../utils';
import { loadPokemonRequest, loadPokemonSuccess, loadPokemonFailure } from './actions';
import { ThunkPokemonCardResult, CardDispatch } from './types';

export const loadPokemon =
	(name: string): ThunkPokemonCardResult<void> =>
	async (dispatch: CardDispatch) => {
		dispatch(loadPokemonRequest());

		try {
			const response = await getPokemonByName(name);
			const species = await getPokemonSpecies(name);
			const weaknesses: string[] = await Promise.all(
				response.types.map(async (type: { type: { url: string } }) => {
					const typeResponse = await getPokemonDetails(type.type.url);
					return typeResponse.damage_relations.double_damage_from.map((weakness: { name: any }) => {
						return weakness.name;
					});
				}),
			);

			const pokemon = {
				id: response.id,
				name: titleCase(response.name),
				image: response.sprites.front_default,
				types: response.types.map((type: { type: { name: any } }) => type.type.name),
				height: response.height,
				weight: response.weight,
				stats: response.stats,
				species: getSpecies(species.genera),
				genders: getGenders(species.gender_rate),
				abilities: getAbilities(response.abilities).map((ability) => titleCase(ability)),
				weaknesses: Array<string>()
					.concat(...weaknesses)
					.filter((value, index, array) => array.indexOf(value) === index),
			};
			console.log(getAbilities(response.abilities));
			dispatch(loadPokemonSuccess(pokemon));
		} catch (error) {
			dispatch(loadPokemonFailure(error as Error));
		}
	};
