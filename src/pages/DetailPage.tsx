import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled/macro';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';

import PokemonInfo from '../components/PokemonInfo';
import Tabs from '../components/Tabs';
import About from '../components/About';
import Stats from '../components/Stats';
import Evolution from '../components/Evolution';

import { PokemonResponse, SpeciesResponse } from '../types';
import { pokemonApi, speciesApi } from '../apis/poketmonApi';

type Params = {
  id?: string;
}

type Tab  = 'about' | 'stats' | 'evolution';

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const TabsWrapper = styled.div`
  margin: 24px auto 0;
`;

const DetailPage: React.FC = () => {
  const { id } = useParams<Params>();

  const [selectedTab, setSelectedTab] = useState<Tab>('about');

  const { data: pokemonData } = useQuery<AxiosResponse<PokemonResponse>, Error>(['pokemon', { id }], () => pokemonApi(id));
  const { data: speciesData } = useQuery<AxiosResponse<SpeciesResponse>, Error>(['species', { id }], () => speciesApi(id));

  const handleTabClick = (tab: Tab) => {
    setSelectedTab(tab);
  }

  return (
    <Container>
      <PokemonInfo pokemonData={pokemonData?.data} speciesData={speciesData?.data} />
      <TabsWrapper>
        <Tabs color={speciesData?.data.color.name || '#6B7280'} tab={selectedTab} onClick={handleTabClick} />
      </TabsWrapper>
      {
        selectedTab === 'about' && (
          <About
            pokemonData={pokemonData?.data}
            speciesData={speciesData?.data}
          />
        )
      }
      {
        selectedTab === 'stats' &&
        speciesData &&
        pokemonData &&
        <Stats color={speciesData.data.color.name} stats={pokemonData.data.stats} types={pokemonData.data.types}
        />
      }
      {
        selectedTab === 'evolution' && speciesData && (
          <Evolution id={id} color={speciesData?.data.color.name || '#6B7280'} speciesData={speciesData.data} />
        )
      }
    </Container>
  )
}

export default DetailPage;
