import React, {useEffect, useState} from 'react';
import { useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import styled from "@emotion/styled/macro";

import { Chain, EvolutionChainResponse, SpeciesResponse } from '../types';
import EvolutionStage from "./EvolutionStage";
import {mapColorToHex} from "../utils";

type Props = {
  id?: string;
  speciesData: SpeciesResponse;
  color: string;
}

const Base = styled.div`
  margin-top: 32px;
  padding: 0 20px 20px;
`;

const Title = styled.h4<{ color: string }>`
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-weight: bold;
  color: ${({ color }) => color};
`;

const ImageWrapper = styled.div`
  position: absolute;
  width: 288px;
  height: 288px;
  right: -96px;
  top: -96px;
  opacity: 0.4;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const List = styled.ul`
  list-style: none;
  margin: 20px 0 0 0;
  padding: 0;
  > li + li {
    margin-top: 24px;
  }
`;

const EmptyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 444px);
`;

const Empty = styled.div<{ color: string }>`
  color: ${({ color }) => color};
`;

const Evolution: React.FC<Props> = ({ speciesData, id, color }) => {
  const { data, isLoading, isSuccess } = useQuery<AxiosResponse<EvolutionChainResponse>, Error>(['evolution', { id }], () => axios.get(speciesData.evolution_chain.url), { retry: false, refetchOnWindowFocus: false });

  const [evolutionChain, setEvolutionChain] = useState<Array<{ from: { name: string; url: string }, to: { name: string; url: string }, level: number }>>([]);

  useEffect(() => {
    const makeEvolutionChain = (chain: Chain) => {
      if (chain.evolves_to.length) {
        const [evolvesTo] = chain.evolves_to;

        const from = chain.species;
        const to = evolvesTo.species;
        const level = evolvesTo.evolution_details[0].min_level;

        setEvolutionChain(prev => [...prev, { from, to, level }]);

        makeEvolutionChain(chain.evolves_to[0]);
      }
    }

    isSuccess && data && makeEvolutionChain(data.data.chain);
  }, [isSuccess, data]);

  return (
    <Base>
      <Title color={mapColorToHex(color)}>Evolution</Title>
      {
        isLoading ? (
          <ImageWrapper>
            <Image src="/pocketball.svg" />
          </ImageWrapper>
        ) : (
          evolutionChain.length ? (
            <List>
              {
                evolutionChain.map(({ from, to, level }, idx) => (
                  <EvolutionStage key={idx} from={from} to={to} level={level} color={color} />
                ))
              }
            </List>
          ) : (
            <EmptyWrapper>
              <Empty color={mapColorToHex(color)}>This Pokémon does not evolve.</Empty>
            </EmptyWrapper>
          )
        )
      }
    </Base>
  )
}

export default Evolution;
