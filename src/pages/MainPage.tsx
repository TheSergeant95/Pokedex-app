import React, { useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { ITEMS_PER_PAGE_OPTIONS } from '../utils/consts';
import Select from '../components/shared/Select';
import Filter from '../components/shared/Filter';
import PokemonList from '../components/PokemonList';
import SearchBar from '../components/shared/SearchBar';
import Pagination from '../components/shared/Pagination';
import PokemonDetails from '../components/modals/PokemonDetails';
import { RootState } from '../store';
import { ModalWindowAction } from '../store/modal/types';
import { PokemonListAction } from '../store/pokemonList/types';
import { PokemonConstsListAction } from '../store/pokemonConsts/types';
import { fetchPokemonConsts } from '../store/pokemonConsts/asyncActions';
import {
	setCurrentPage,
	setItemsPerPage,
	setSelectedTypes,
	setSearchQuery,
} from '../store/pokemonList/actions';

const MainPage: React.FC = () => {
	const dispatch: ThunkDispatch<
		RootState,
		undefined,
		PokemonListAction | PokemonConstsListAction | ModalWindowAction
	> = useDispatch();
	const { selectedTypes, currentPage, currentCount, itemsPerPage } = useSelector(
		(state: RootState) => state.pokemonList,
	);
	const { constLoading, constError, types } = useSelector(
		(state: RootState) => state.pokemonConsts,
	);
	const { name, modalToggle } = useSelector((state: RootState) => state.modalWindow);

	useEffect(() => {
		dispatch(fetchPokemonConsts());
	}, [dispatch]);

	const onPageChange = (newPage: number) => {
		dispatch(setCurrentPage(newPage));
	};

	const onItemsPerPageChange = (newItemsPerPage: number) => {
		dispatch(setItemsPerPage(newItemsPerPage));
		dispatch(setCurrentPage(1));
	};

	const onFilterTypesChange = (newFilterTypes: string[]) => {
		dispatch(setSelectedTypes(newFilterTypes));
		dispatch(setCurrentPage(1));
	};

	const handleSearchChange = (query: string) => {
		dispatch(setSearchQuery(query));
	};

	if (constLoading) {
		return <div>Loading...</div>;
	}

	if (constError) {
		return <div>Error</div>;
	}

	return (
		<div>
			<SearchBar onSearch={handleSearchChange} />
			<Select
				options={ITEMS_PER_PAGE_OPTIONS}
				value={itemsPerPage}
				onChange={onItemsPerPageChange}
				multiple={false}
			/>
			<Filter options={types} value={selectedTypes} onChange={onFilterTypesChange} />
			<div className="pokemon-list__header-right">
				<span>{currentCount} pokemon(s)</span>
			</div>
			<PokemonList />
			<Pagination
				currentPage={currentPage}
				pageSize={itemsPerPage}
				totalItems={currentCount}
				onPageChange={onPageChange}
			/>
			{name ? <PokemonDetails name={name} /> : null}
		</div>
	);
};

export default MainPage;
