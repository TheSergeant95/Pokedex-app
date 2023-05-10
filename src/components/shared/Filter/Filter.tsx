import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import Select from '../Select';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../store';
import { setSelectedTypes } from '../../../store/pokemonList/actions';
import { PokemonListAction } from '../../../store/pokemonList/types';
import './Filter.scss';
import { getTypeColor } from '../../../utils';
import '../../shared/stats.scss';

type FilterProps = {
	options: string[];
	value: string[];
	onChange: (selectedTypes: string[]) => void;
};

const Filter: FC<FilterProps> = ({ options, value, onChange }) => {
	const dispatch: ThunkDispatch<RootState, undefined, PokemonListAction> = useDispatch();
	const { selectedTypes } = useSelector((state: RootState) => state.pokemonList);

	const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (selectedTypes.includes(value)) {
			const updatedTypes = selectedTypes.filter((type) => type !== value);
			onChange(updatedTypes);
		} else {
			const updatedTypes = [...selectedTypes, value];
			onChange(updatedTypes);
		}
	};

	const handleClearFilter = () => {
		setSelectedTypes([]);
		onChange([]);
	};

	return (
		<form className="filter">
			<p className="filter__title">Filter by type:</p>
			{options.map((option) => (
				<div key={option}>
					<input
						className="filter__option checkbox"
						type="checkbox"
						id={option}
						value={option}
						onChange={handleSelectChange}
					/>
					<label
						className="filter__label stats__pill"
						htmlFor={option}
						style={{ color: getTypeColor(option)[1], backgroundColor: getTypeColor(option)[0] }}
					>
						{option}
					</label>
				</div>
			))}
			{/* <button type="submit">Apply</button> */}
			<button className="filter__btn-clear" type="reset" onClick={handleClearFilter}>
				Clear
			</button>
		</form>
	);
};

export default Filter;
