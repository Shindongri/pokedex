import axios, { AxiosResponse } from 'axios';
import { useQueries } from 'react-query';
import { UseQueryResult } from 'react-query/types/react/types';

import { Ability, AbilityResponse } from '../types';

type ReturnType = AxiosResponse<AbilityResponse>;

const useAbilitiesQuery = (abilities: Array<Ability>): Array<UseQueryResult<ReturnType, Error>> => {
  const queries = abilities.map(({ ability }, idx) => ({
    queryKey: ['ability', idx],
    queryFn: () => axios.get(ability.url)
  }));

  return useQueries(queries) as Array<UseQueryResult<AxiosResponse<AbilityResponse>, Error>>;
}

export default useAbilitiesQuery;
