import React, { ChangeEvent, useState } from 'react';
import './SearchBar.scss';

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
		onSearch(searchTerm.toLowerCase().trim());
	};

	const handleClearSearch = () => {
		setSearchTerm('');
		onSearch('');
	};

	return (
		<form className="search-bar" onSubmit={handleFormSubmit}>
			<div className="search-bar__box">
				<input type="text" value={searchTerm} onChange={handleInputChange} />
				<span></span>
				<button className="search-bar__btn-clear" type="reset" onClick={handleClearSearch}>
					Clear
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
