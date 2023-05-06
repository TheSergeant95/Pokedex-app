import React, { useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/index';
import { loadPokemon } from '../../../store/pokemon/asyncActions';
import { PokemonCardAction } from '../../../store/pokemon/types';
import { getTypeColor } from '../../../utils';
import noImage from '../../../static/svg_stop-sign.svg';

interface PokemonDetailsProps {
	name: string;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ name }) => {
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
		return 'Unknown';
	});

	return (
		<div className="pokemon-detail">
			<div className="pokemon-detail__header">
				<div className="pokemon-detail__title">{data.name}</div>
				<div className="pokemon-detail__types">
					{data.types.map((type, index) => (
						<div
							key={index}
							className="pokemon-detail__type"
							style={{ backgroundColor: getTypeColor(type) }}
						>
							{type}
						</div>
					))}
				</div>
			</div>
			<div className="pokemon-detail__body">
				<div className="pokemon-detail__avatar">
					{data.image ? (
						<img src={data.image} alt={data.name} />
					) : (
						<img src={noImage} alt={'No image'} style={{ width: '96px', height: '96px' }} />
					)}
				</div>
				<div className="pokemon-detail__params">
					<div>
						<strong>Height:</strong> {data.height / 10} m
					</div>
					<div>
						<strong>Weight:</strong> {data.weight / 10} kg
					</div>
					<div>
						<strong>Category:</strong> {data.species}
					</div>
					<div>
						<strong>Abilities:</strong>
						{data.abilities?.map((ability, index) => (
							<div>{ability}</div>
						))}
					</div>
					<div>
						<strong>Gender:</strong> {genderImages}
					</div>
					<div>
						<strong>Weaknesses:</strong>
						{data.weaknesses?.map((weakness, index) => (
							<div
								key={index}
								className="pokemon-detail__weakness"
								style={{ backgroundColor: getTypeColor(weakness) }}
							>
								{weakness}
							</div>
						))}
					</div>
				</div>
				<div className="pokemon-detail__stats">
					<div>
						<strong>HP:</strong> {data.stats[0].base_stat}
					</div>
					<div>
						<strong>Attack:</strong> {data.stats[1].base_stat}
					</div>
					<div>
						<strong>Defense:</strong> {data.stats[2].base_stat}
					</div>
					<div>
						<strong>Special Attack:</strong> {data.stats[3].base_stat}
					</div>
					<div>
						<strong>Special Defense:</strong> {data.stats[4].base_stat}
					</div>
					<div>
						<strong>Speed:</strong> {data.stats[5].base_stat}
					</div>
				</div>
			</div>
		</div>
	);
};
export default PokemonDetails;
