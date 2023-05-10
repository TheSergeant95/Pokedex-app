import React from 'react';
import { Pokemon } from '../../store/pokemon/types';
import { getTypeColor, titleCase } from '../../utils';
import noImage from '../../static/svg_stop-sign.svg';
import './PokemonCard.scss';
import '../shared/stats.scss';
import ProgressBar from '../shared/ProgressBar';

interface PokemonCardProps {
	pokemon: Pokemon;
	onClickCard: (name: string) => void;
}

const PokemonCard = ({ pokemon, onClickCard }: PokemonCardProps) => {
	const handleClick = (name: string) => {
		onClickCard(name);
	};

	return (
		<div className="pokemon-card" onClick={() => handleClick(pokemon.name)}>
			{pokemon.image ? (
				<img className="pokemon-card__img" src={pokemon.image} alt={pokemon.name} />
			) : (
				<img
					className="pokemon-card__img"
					src={noImage}
					alt={'No image'}
					style={{ width: '96px', height: '96px' }}
				/>
			)}
			<div className="pokemon-card__body">
				<div className="pokemon-card__header">
					<h3 className="pokemon-card__title">{titleCase(pokemon.name)}</h3>
					<div className="pokemon-card__types stats">
						{pokemon.types.map((type, index) => (
							<div
								key={index}
								className="stats__pill"
								style={{ backgroundColor: getTypeColor(type)[0] }}
							>
								<span className="stats__value" style={{ color: getTypeColor(type)[1] }}>
									{type}
								</span>
							</div>
						))}
					</div>
				</div>
				<div className="pokemon-card__stats stats">
					<ul>
						<li>
							<strong className="stats__title">Height:</strong>
							<span className="stats__value">{pokemon.height / 10} m</span>
						</li>
						<li>
							<strong className="stats__title">Weight:</strong>
							<span className="stats__value">{pokemon.weight / 10} kg</span>
						</li>
						<li>
							<strong className="stats__title">HP:</strong>
							<span className="stats__bar">
								<ProgressBar value={pokemon.stats[0].base_stat} />
							</span>
						</li>
						<li>
							<strong className="stats__title">Attack:</strong>
							<span className="stats__bar">
								<ProgressBar value={pokemon.stats[1].base_stat} />
							</span>
						</li>
						<li>
							<strong className="stats__title">Defense:</strong>
							<span className="stats__bar">
								<ProgressBar value={pokemon.stats[2].base_stat} />
							</span>
						</li>
						<li>
							<strong className="stats__title">Speed:</strong>
							<span className="stats__bar">
								<ProgressBar value={pokemon.stats[5].base_stat} />
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default PokemonCard;
