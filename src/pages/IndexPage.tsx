import React from 'react';
import styled from '@emotion/styled/macro';

import SearchForm from '../components/SearchForm';
import PokemonList from '../components/PokemonList';

const Container = styled.div`
  padding: 12px 18px;
  position: relative;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  color: #d34f49;
  font-weight: bold;
`;

const Description = styled.small`
  color: #6B7280;
  padding: 0;
  margin: 16px 0 0 0;
  display: block;
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

const IndexPage: React.FC = () => (
  <Container>
    <Title>Pokédex</Title>
    <SearchForm />
    <Description>The Pokédex contains detailed stats for every creature from the Pokémon games.</Description>
    <PokemonList />
    <ImageWrapper>
      <Image src="/pocketball.svg" />
    </ImageWrapper>
  </Container>
)

export default IndexPage;
