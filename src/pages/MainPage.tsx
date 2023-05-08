import React, { CSSProperties, useEffect, useState } from 'react';
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
import './MainPage.scss';
import { SetModalToggle } from '../store/modal/actions';
import Spinner from '../components/shared/Spinner';

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

	const handleModal = (isActive: boolean) => {
		dispatch(SetModalToggle(isActive));
		if (isActive === true) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	};

	if (constLoading) {
		return <Spinner mainPage={true} text={'Loading...'} />;
	}

	if (constError) {
		return <div>Error</div>;
	}

	return (
		<div className="main-page">
			<div className="main-page__header">
				<div className="main-page__header-left">
					<SearchBar onSearch={handleSearchChange} />
				</div>
				<div className="main-page__header-right dropdown">
					<ul>
						<li className="dropdown__items">
							<input type="checkbox" id={'dropdown'} />
							<label htmlFor={'dropdown'} data-toggle="dropdown">
								Advanced Search Options
							</label>
							<ul className="dropdown__item">
								<li>
									<Filter options={types} value={selectedTypes} onChange={onFilterTypesChange} />
								</li>
								<li>
									<Select
										options={ITEMS_PER_PAGE_OPTIONS}
										value={itemsPerPage}
										onChange={onItemsPerPageChange}
									/>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<span>{currentCount} pokémon(s)</span>
			<div className="main-page__container">
				<PokemonList />
			</div>
			<Pagination
				className="pagination"
				currentPage={currentPage}
				pageSize={itemsPerPage}
				totalItems={currentCount}
				onPageChange={onPageChange}
			/>
			{name ? <PokemonDetails active={modalToggle} name={name} setActive={handleModal} /> : null}
		</div>
	);
};

export default MainPage;
