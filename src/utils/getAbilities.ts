const getAbilities = (abilities: { is_hidden: boolean; ability: { name: string } }[]): string[] => {
	return abilities
		.filter((ability: { is_hidden: boolean; ability: { name: any } }) => !ability.is_hidden)
		.map((ability) => ability.ability.name);
};

export default getAbilities;
