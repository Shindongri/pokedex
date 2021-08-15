import React from 'react';
import styled from "@emotion/styled/macro";
import { mapColorToHex } from "../utils";

const Base = styled.div`
  margin-top: 32px;
`;

const Title = styled.h4<{ color: string }>`
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-weight: bold;
  color: ${({ color }) => color};
`;

const InfoItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 20px;
  row-gap: 12px;
`;

const InfoItem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;

const InfoItemLabel = styled.span`
  font-weight: bold;
  color: #374151;
  font-size: 12px;
`;

const InfoItemValue = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 12px;
`;

interface Props {
  weight?: number;
  height?: number;
  genderRate?: number;
  growthRate?: string;
  baseExp?: number;
  rarity?: string;
  color?: string;
}

const PokedexData: React.FC<Props> = ({
  color,
  weight,
  height,
  genderRate,
  growthRate,
  baseExp,
  rarity,
}) => (
  <Base>
    <Title color={mapColorToHex(color)}>Pokédex Data</Title>
    <InfoItemContainer>
      {
        height && (
          <InfoItem>
            <InfoItemLabel>Height</InfoItemLabel>
            <InfoItemValue color={mapColorToHex(color)}>{height / 10}m</InfoItemValue>
          </InfoItem>
        )
      }
      {
        weight && (
          <InfoItem>
            <InfoItemLabel>Weight</InfoItemLabel>
            <InfoItemValue color={mapColorToHex(color)}>{weight / 10}kg</InfoItemValue>
          </InfoItem>
        )
      }
      {
        genderRate && (
          <InfoItem>
            <InfoItemLabel>Gender</InfoItemLabel>
            <InfoItemValue color={mapColorToHex(color)}>{genderRate === -1 ? 'Unknown' : 'Male / Female'}</InfoItemValue>
          </InfoItem>
        )
      }
      {
        growthRate && (
          <InfoItem>
            <InfoItemLabel>Growth Rate</InfoItemLabel>
            <InfoItemValue color={mapColorToHex(color)}>{growthRate}</InfoItemValue>
          </InfoItem>
        )
      }
      {
        baseExp && (
          <InfoItem>
            <InfoItemLabel>Base Exp</InfoItemLabel>
            <InfoItemValue color={mapColorToHex(color)}>{baseExp}</InfoItemValue>
          </InfoItem>
        )
      }
      {
        rarity && (
          <InfoItem>
            <InfoItemLabel>Rarity</InfoItemLabel>
            <InfoItemValue color={mapColorToHex(color)}>{rarity}</InfoItemValue>
          </InfoItem>
        )
      }
    </InfoItemContainer>
  </Base>
)

export default PokedexData;
