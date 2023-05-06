import React, { FC, ChangeEvent } from 'react';

interface SelectProps<T> {
	options: T[];
	value: T;
	multiple: boolean;
	onChange: (value: T) => void;
}

const Select: FC<SelectProps<any>> = ({ options, value, multiple, onChange }) => {
	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value as any);
	};

	return (
		<select value={value} onChange={handleChange} multiple={multiple}>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	);
};

export default Select;
