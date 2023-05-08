import React, { useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/index';
import { loadPokemon } from '../../../store/pokemon/asyncActions';
import { PokemonCardAction } from '../../../store/pokemon/types';
import { getTypeColor } from '../../../utils';
import noImage from '../../../static/svg_stop-sign.svg';
import './PokemonDetails.css';

interface PokemonDetailsProps {
	active: boolean;
	name: string;
	setActive: (isActive: boolean) => void;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ active, name, setActive }) => {
	const dispatch: ThunkDispatch<RootState, undefined, PokemonCardAction> = useDispatch();
	const { data, cardError, cardLoading } = useSelector((state: RootState) => state.pokemon);
	useEffect(() => {
		dispatch(loadPokemon(name));
	}, [dispatch, name]);

	if (cardLoading) {
		return <div>Loading...</div>;
	}
	if (cardError) {
		return <div>Error: {cardError.message}</div>;
	}
	const genderImages = data.genders?.map((gender, index) => {
		if (gender !== 'Unknown') {
			return (
				<img
					key={index}
					src={gender}
					alt={'gender_image'}
					style={{ width: '36px', height: '36px' }}
				/>
			);
		}
		return <span className="stats__value">Unknown</span>;
	});

	return (
		<div
			className={`pokemon-detail${active ? ' pokemon-detail_active' : ''}`}
			onClick={() => setActive(false)}
		>
			<div className="pokemon-detail__window" onClick={(e) => e.stopPropagation()}>
				<div className="pokemon-detail__header">
					<div className="pokemon-detail__title">{data.name}</div>
					<div className="pokemon-detail__types stats">
						{data.types.map((type, index) => (
							<div
								className="stats__pill"
								key={type}
								style={{ backgroundColor: getTypeColor(type)[0] }}
							>
								<span className="stats__value" style={{ color: getTypeColor(type)[1] }}>
									{type}
								</span>
							</div>
						))}
					</div>
				</div>
				<div className="pokemon-detail__body detail-body">
					<div className="detail-body__avatar">
						{data.image ? (
							<img src={data.image} alt={data.name} />
						) : (
							<img src={noImage} alt={'No image'} style={{ width: '96px', height: '96px' }} />
						)}
					</div>
					<div className="detail-body__params stats">
						<ul>
							<li>
								<strong className="stats__title">Height:</strong>{' '}
								<span className="stats__value">{data.height / 10} m</span>
							</li>
							<li>
								<strong className="stats__title">Weight:</strong>{' '}
								<span className="stats__value">{data.weight / 10} kg</span>
							</li>
							<li>
								<strong className="stats__title">Category:</strong>
								<span className="stats__value">{data.species}</span>
							</li>
							<li>
								<strong className="stats__title">Abilities:</strong>
								<div className="stats__value">
									{data.abilities?.map((ability, index) => (
										<span key={ability}>{ability}</span>
									))}
								</div>
							</li>
							<li>
								<strong className="stats__title">Gender:</strong>
								<div className="stats__icon">{genderImages}</div>
							</li>
							<li>
								<strong className="stats__title">Weaknesses:</strong>
								{data.weaknesses?.map((weakness, index) => (
									<div
										className="stats__pill"
										key={weakness}
										style={{ backgroundColor: getTypeColor(weakness)[0] }}
									>
										<span className="stats__value" style={{ color: getTypeColor(weakness)[1] }}>
											{weakness}
										</span>
									</div>
								))}
							</li>
						</ul>
					</div>
					<div className="detail-body__stats stats">
						<ul>
							<li>
								<strong className="stats__title">HP:</strong>
								<span className="stats__bar">{data.stats[0].base_stat}</span>
							</li>
							<li>
								<strong className="stats__title">Attack:</strong>
								<span className="stats__bar">{data.stats[1].base_stat}</span>
							</li>
							<li>
								<strong className="stats__title">Defense:</strong>
								<span className="stats__bar">{data.stats[2].base_stat}</span>
							</li>
							<li>
								<strong className="stats__title">Special Attack:</strong>
								<span className="stats__bar">{data.stats[3].base_stat}</span>
							</li>
							<li>
								<strong className="stats__title">Special Defense:</strong>{' '}
								<span className="stats__bar">{data.stats[4].base_stat}</span>
							</li>
							<li>
								<strong className="stats__title">Speed:</strong>
								<span className="stats__bar">{data.stats[5].base_stat}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PokemonDetails;
