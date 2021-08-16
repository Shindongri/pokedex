import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { SpeciesResponse } from '../types';

const speciesApi = (id: string) => axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)

const useSpeciesQuery = (id: string) =>
  useQuery<AxiosResponse<SpeciesResponse>, Error>(['species', { id }], () => speciesApi(id));

export default useSpeciesQuery;
