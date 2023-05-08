const getTypeColor = (type: string): string[] => {
	switch (type.toLowerCase()) {
		case 'normal':
			return ['#A8A878', '#000'];
		case 'fire':
			return ['#F08030', '#fff'];
		case 'water':
			return ['#6890F0', '#fff'];
		case 'electric':
			return ['#F8D030', '#000'];
		case 'grass':
			return ['#78C850', '#000'];
		case 'ice':
			return ['#98D8D8', '#000'];
		case 'fighting':
			return ['#C03028', '#fff'];
		case 'poison':
			return ['#A040A0', '#fff'];
		case 'ground':
			return ['#E0C068', '#000'];
		case 'flying':
			return ['#A890F0', '#000'];
		case 'psychic':
			return ['#F85888', '#fff'];
		case 'bug':
			return ['#A8B820', '#fff'];
		case 'rock':
			return ['#B8A038', '#fff'];
		case 'ghost':
			return ['#705898', '#fff'];
		case 'dragon':
			return ['#7038F8', '#fff'];
		case 'dark':
			return ['#705848', '#fff'];
		case 'steel':
			return ['#B8B8D0', '#000'];
		case 'fairy':
			return ['#EE99AC', '#000'];
		case 'shadow':
			return ['#60746E', '#fff'];
		default:
			return ['#000', '#fff'];
	}
};

export default getTypeColor;
