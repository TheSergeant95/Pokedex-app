import React, { FC, ChangeEvent } from 'react';
import './Select.scss';

interface SelectProps<T> {
	options: T[];
	value: T;
	onChange: (value: T) => void;
}

const Select: FC<SelectProps<any>> = ({ options, value, onChange }) => {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(+event.target.value as any);
	};

	return (
		<div className="select">
			{options.map((option) => (
				<label key={option}>
					<input
						className="select__option radio"
						type="radio"
						key={option}
						id={option}
						name="itemsPerPage"
						value={option}
						checked={value === option ? true : false}
						onChange={handleChange}
					/>
					{option}
				</label>
			))}
		</div>
	);
};

export default Select;
