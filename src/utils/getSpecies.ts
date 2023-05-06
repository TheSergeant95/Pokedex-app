const getSpecies = (species: any[]): string => {
	const searchedSpecies = species.find(
		(entry: { language: { name: string } }) => entry.language.name === 'en',
	);
	if (!searchedSpecies) {
		return species[0] ? species[0].genus.replace(' Pokémon', '') : 'Unknown';
	}
	return searchedSpecies.genus.replace(' Pokémon', '');
};

export default getSpecies;
