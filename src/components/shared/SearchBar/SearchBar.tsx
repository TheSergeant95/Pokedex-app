import React, { ChangeEvent, useState } from 'react';

interface SearchBarProps {
	onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSearch(searchTerm.trim());
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<input
				type="text"
				placeholder="Search by name"
				value={searchTerm}
				onChange={handleInputChange}
			/>
			<button type="submit">Search</button>
		</form>
	);
};

export default SearchBar;
