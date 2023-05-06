import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Pokemon } from '../../store/pokemon/types';
import PokemonCard from '../PokemonCard';
import { PokemonListAction } from '../../store/pokemonList/types';
import { ThunkDispatch } from 'redux-thunk';
import { fetchPokemons } from '../../store/pokemonList/asyncActions';
import { ModalWindowAction } from '../../store/modal/types';
import { SetModalName, SetModalToggle } from '../../store/modal/actions';
import { PokemonConstsListAction } from '../../store/pokemonConsts/types';

const PokemonList: React.FC = () => {
	const dispatch: ThunkDispatch<
		RootState,
		undefined,
		PokemonListAction | PokemonConstsListAction | ModalWindowAction
	> = useDispatch();

	const {
		loading,
		error,
		selectedTypes,
		searchQuery,
		currentPage,
		itemsPerPage,
		filteredPokemons,
	} = useSelector((state: RootState) => state.pokemonList);
	const { pokemons } = useSelector((state: RootState) => state.pokemonConsts);
	const { name, modalToggle } = useSelector((state: RootState) => state.modalWindow);

	useEffect(() => {
		dispatch(fetchPokemons(pokemons, selectedTypes, searchQuery, itemsPerPage, currentPage));
		console.log(selectedTypes, filteredPokemons);
	}, [dispatch, currentPage, itemsPerPage, selectedTypes, searchQuery]);

	const onClickCard = (name: string) => {
		dispatch(SetModalName(name));
		dispatch(SetModalToggle(!modalToggle));
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error</div>;
	}

	return (
		<div className="pokemon-list__grid">
			{filteredPokemons.map((pokemon: Pokemon) => (
				<PokemonCard key={pokemon.name} pokemon={pokemon} onClickCard={onClickCard} />
			))}
		</div>
	);
};

export default PokemonList;
