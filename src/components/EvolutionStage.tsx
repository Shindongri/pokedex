import React, {useCallback} from 'react';
import { useQueries } from 'react-query';
import axios, {AxiosResponse} from 'axios';
import styled from '@emotion/styled/macro';
import {UseQueryOptions, UseQueryResult} from "react-query/types/react/types";
import {PokemonResponse, SpeciesResponse} from "../types";
import {pokemonApi} from "../apis/poketmonApi";

interface Props {
  from: {
    name: string;
    url: string;
  }
  to: {
    name: string;
    url: string;
  }
}

const Divider = styled.div`
  background-color: #D1D5DB;
  border-radius: 12px;
  height: 8px;
  width: 100%;
  margin-inline: 8px;
`;

const ImageWrapper = styled.div`
  width: 128px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Base = styled.li`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EvolutionStage: React.FC<Props> = ({ from, to }) => {
  const results = useQueries(
    [from.name, to.name].map((name, idx) => ({
      queryKey: ['evolution', idx],
      queryFn: () => pokemonApi(name)
    }))
  );

  const [fromPokemon, toPokemon] = results as Array<UseQueryResult<AxiosResponse<PokemonResponse>, Error>>;

  return (
    <Base>
      <ImageWrapper>
        <Image src={fromPokemon.data?.data.sprites.other["official-artwork"].front_default} />
      </ImageWrapper>
      <Divider />
      <ImageWrapper>
        <Image src={toPokemon.data?.data.sprites.other["official-artwork"].front_default} />
      </ImageWrapper>
    </Base>
  )
}

export default EvolutionStage;
