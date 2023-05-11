import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemons = async (limit: number, offset: number) => {
	const response = await axios.get(`${API_BASE_URL}/pokemon`, {
		params: { limit, offset },
	});
	return response.data.results;
};

export const getPokemonsCount = async () => {
	const response = await axios.get(`${API_BASE_URL}/pokemon`);
	return response.data.count;
};

export const getPokemonDetails = async (url: string) => {
	const response = await axios.get(url);
	return response.data;
};

export const getPokemonTypes = async () => {
	const response = await axios.get(`${API_BASE_URL}/type`);
	return response.data.results;
};

export const getPokemonByName = async (name: string) => {
	const response = await axios.get(`${API_BASE_URL}/pokemon/${name}`);
	if (!response.data) {
		throw new Error(`Failed to fetch pokemon ${name}: ${response.statusText}`);
	}
	return response.data;
};

export const getPokemonSpecies = async (name: string) => {
	const response = await axios.get(`${API_BASE_URL}/pokemon-species/${name}`);
	if (!response.data) {
		throw new Error(`Failed to fetch pokemon species: ${response.statusText}`);
	}
	return response.data;
};

export const getPokemonSpeciesById = async (id: number) => {
	const response = await axios.get(`${API_BASE_URL}/pokemon-species/${id}`);
	if (!response.data) {
		throw new Error(`Failed to fetch pokemon species: ${response.statusText}`);
	}
	return response.data;
};
