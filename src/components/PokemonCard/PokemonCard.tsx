import React from 'react';
import { Pokemon } from '../../store/pokemon/types';
import { getTypeColor } from '../../utils';
import noImage from '../../static/svg_stop-sign.svg';

interface PokemonCardProps {
	pokemon: Pokemon;
	onClickCard: (name: string) => void;
}

const PokemonCard = ({ pokemon, onClickCard }: PokemonCardProps) => {
	const handleClick = (name: string) => {
		onClickCard(name);
	};

	const titleCase = (name: string): string => {
		const splitStr = name.split('-');
		for (let i = 0; i < splitStr.length; i++) {
			splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1);
		}
		return splitStr.join(' ');
	};

	return (
		<div className="pokemon-card" onClick={() => handleClick(pokemon.name)}>
			{pokemon.image ? (
				<img src={pokemon.image} alt={pokemon.name} />
			) : (
				<img src={noImage} alt={'No image'} style={{ width: '96px', height: '96px' }} />
			)}
			<div className="pokemon-card__body">
				<div className="pokemon-card__header">
					<div className="pokemon-card__title">{titleCase(pokemon.name)}</div>
					<div className="pokemon-card__types">
						{pokemon.types.map((type, index) => (
							<div
								key={index}
								className="pokemon-card__type"
								style={{ backgroundColor: getTypeColor(type) }}
							>
								{type}
							</div>
						))}
					</div>
				</div>
				<div className="pokemon-card__stats">
					<div>
						<strong>Height:</strong> {pokemon.height / 10} m
					</div>
					<div>
						<strong>Weight:</strong> {pokemon.weight / 10} kg
					</div>
					<div>
						<strong>HP:</strong> {pokemon.stats[0].base_stat}
					</div>
					<div>
						<strong>Attack:</strong> {pokemon.stats[1].base_stat}
					</div>
					<div>
						<strong>Defense:</strong> {pokemon.stats[2].base_stat}
					</div>
					<div>
						<strong>Speed:</strong> {pokemon.stats[5].base_stat}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PokemonCard;
