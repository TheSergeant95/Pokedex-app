import { PokemonCriteria } from '../store/pokemonConsts/types';

const filterPost = (pokemons: PokemonCriteria[], filter: string[]) => {
	return pokemons.filter((pokemon) => {
		if (filter.length === 0) {
			return true;
		}
		return pokemon.types.some((type) => filter.includes(type));
	});
};

export default filterPost;
