import React from 'react';
import styled from "@emotion/styled/macro";

import { Ability, Color, Type } from '../types';
import PokedexData from './PokedexData';
import Abilities from './Abilities';
import { mapTypeToHex } from '../utils';

type Props = {
  isLoading: boolean;
  color?: Color;
  growthRate?: string;
  flavorText?: string;
  genderRate?: number;
  isLegendary?: boolean;
  isMythical?: boolean;
  types?: Array<Type>;
  weight?: number;
  height?: number;
  baseExp?: number;
  abilities?: Array<Ability>;
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

const ImageWrapper = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
`;

const About: React.FC<Props> = ({
  isLoading,
  isMythical,
  isLegendary,
  types,
  weight,
  flavorText,
  growthRate,
  genderRate,
  color,
  height,
  baseExp,
  abilities,
  }) => {
  const rarity = isLegendary ? 'Legendary' : isMythical ? 'Mythical' : 'Normal';

  return (
    <Base>
      <FlavorText>{flavorText}</FlavorText>
      {
        isLoading ? (
          <ImageWrapper>
            <Image src="/loading.gif" />
          </ImageWrapper>
        ) : (
          <>
            {
              types && (
                <TypeList>
                  {
                    types.map(({ type }, idx) => (
                      <TypeWrapper key={idx} color={mapTypeToHex(type.name)}>
                        <TypeImage src={`/assets/${type.name}.svg`} />
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
            {abilities && <Abilities abilities={abilities} color={color} />}
          </>
        )
      }
    </Base>
  )
}

export default React.memo(About);
