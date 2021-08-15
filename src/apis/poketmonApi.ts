import axios from 'axios';

export const pokemonApi = (id?: string) => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${id || ''}`, { params: { limit: 151 }});
}

export const speciesApi = (id?: string) => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
}
