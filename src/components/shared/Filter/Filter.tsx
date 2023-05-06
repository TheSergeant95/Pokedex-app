import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import Select from '../Select';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../store';
import { setSelectedTypes } from '../../../store/pokemonList/actions';
import { PokemonListAction } from '../../../store/pokemonList/types';

type FilterProps = {
	options: string[];
	value: string[];
	onChange: (selectedTypes: string[]) => void;
};

const Filter: FC<FilterProps> = ({ options, value, onChange }) => {
	// const [checked, setChecked] = useState(false);
	const dispatch: ThunkDispatch<RootState, undefined, PokemonListAction> = useDispatch();
	const { selectedTypes } = useSelector((state: RootState) => state.pokemonList);

	const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (selectedTypes.includes(value)) {
			const updatedTypes = selectedTypes.filter((type) => type !== value);
			onChange(updatedTypes);
			// setChecked(false);
		} else {
			const updatedTypes = [...selectedTypes, value];
			onChange(updatedTypes);
			// setChecked(true);
		}
	};

	// const handleApplyFilter = () => {
	// 	onChange(selectedOptions);
	// };

	const handleClearFilter = () => {
		setSelectedTypes([]);
		onChange([]);
	};

	return (
		<form>
			<p>Filter by type:</p>
			{options.map((option) => (
				<div key={option}>
					<input type="checkbox" id={option} value={option} onChange={handleSelectChange} />
					<label htmlFor={option}>{option}</label>
				</div>
			))}
			{/* <button type="submit">Apply</button> */}
			<button type="reset" onClick={handleClearFilter}>
				Clear
			</button>
		</form>
		// <div>
		// 	<Select options={options} value={value} onChange={handleSelectChange} multiple={true} />
		// 	<button onClick={handleApplyFilter}>Apply</button>
		// 	<button onClick={handleClearFilter}>Clear</button>
		// </div>
	);
};

export default Filter;
