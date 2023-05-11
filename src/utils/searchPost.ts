import { PokemonCriteria } from '../store/pokemonConsts/types';

const searchPost = (pokemons: PokemonCriteria[], term: string) => {
	const defaultPokemons = pokemons.filter((pokemon: { is_default: any }) => pokemon.is_default);
	if (term.length === 0) {
		return defaultPokemons;
	}

	return defaultPokemons.filter((item) => {
		return item.name.replaceAll('-', ' ').indexOf(term) > -1;
	});
};

export default searchPost;
