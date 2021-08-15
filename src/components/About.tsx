import React, {useMemo} from 'react';
import styled from "@emotion/styled/macro";

import { PokemonResponse, SpeciesResponse } from '../types';
import PokedexData from './PokedexData';
import Abilities from './Abilities';
import { mapTypeToHex } from '../utils';

type Props = {
  pokemonData?: PokemonResponse;
  speciesData?: SpeciesResponse;
}

const Base = styled.article`
  padding: 20px;
`;

const FlavorText = styled.p`
  margin: 0 auto;
  word-break: break-word;
  font-size: 14px;
  color: #374151;
`;

const TypeWrapper = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

const TypeList = styled.div`
  display: flex;
  margin-top: 8px;
  ${TypeWrapper} + ${TypeWrapper} {
    margin-left: 8px;
  }
`;

const TypeImage = styled.img`
  height: 12px;
`;

const TypeLabel = styled.span`
  margin-left: 4px;
  color: #fff;
  font-size: 10px;
`;

const About: React.FC<Props> = ({ pokemonData, speciesData }) => {
  const {
    weight,
    height,
    growthRate,
    flavorText,
    types,
    baseExp,
    genderRate,
    isLegendary,
    isMythical,
    abilities,
    color,
  } = useMemo(() => {
    return {
      height: pokemonData?.height,
      weight: pokemonData?.weight,
      abilities: pokemonData?.abilities,
      types: pokemonData?.types,
      baseExp: pokemonData?.base_experience,
      growthRate: speciesData?.growth_rate.name,
      flavorText: speciesData?.flavor_text_entries[0].flavor_text,
      genderRate: speciesData?.gender_rate,
      isLegendary: speciesData?.is_legendary,
      isMythical: speciesData?.is_mythical,
      color: speciesData?.color.name
    }
  }, [pokemonData, speciesData]);

  const rarity = isLegendary ? 'Legendary' : isMythical ? 'Mythical' : 'Normal';

  return (
    <Base>
      <FlavorText>{flavorText}</FlavorText>
      {
        types && (
          <TypeList>
            {
              types.map(({ type }, idx) => (
                <TypeWrapper key={idx} color={mapTypeToHex(type.name)}>
                  <TypeImage src={`${type.name}.svg`} />
                  <TypeLabel>{type.name.toUpperCase()}</TypeLabel>
                </TypeWrapper>
              ))
            }
          </TypeList>
        )
      }
      <PokedexData
        weight={weight}
        height={height}
        genderRate={genderRate}
        growthRate={growthRate}
        baseExp={baseExp}
        rarity={rarity}
        color={color}
      />
      {abilities && color && <Abilities abilities={abilities} color={color} />}
    </Base>
  )
}

export default React.memo(About);
