import React from 'react';
import styled from "@emotion/styled/macro";
import { mapColorToHex } from "../utils";
import {Color} from "../types";

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
  color?: Color;
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
    <Title color={mapColorToHex(color?.name)}>Pokédex Data</Title>
    <InfoItemContainer>
      <InfoItem>
        <InfoItemLabel>Height</InfoItemLabel>
        {height && <InfoItemValue color={mapColorToHex(color?.name)}>{height / 10}m</InfoItemValue>}
      </InfoItem>
      <InfoItem>
        <InfoItemLabel>Weight</InfoItemLabel>
        {weight && <InfoItemValue color={mapColorToHex(color?.name)}>{weight / 10}kg</InfoItemValue>}
      </InfoItem>
      <InfoItem>
        <InfoItemLabel>Gender</InfoItemLabel>
        {genderRate && <InfoItemValue color={mapColorToHex(color?.name)}>{genderRate === -1 ? 'Unknown' : 'Male / Female'}</InfoItemValue>}
      </InfoItem>
      <InfoItem>
        <InfoItemLabel>Growth Rate</InfoItemLabel>
        {growthRate && <InfoItemValue color={mapColorToHex(color?.name)}>{growthRate}</InfoItemValue>}
      </InfoItem>
      <InfoItem>
        <InfoItemLabel>Base Exp</InfoItemLabel>
        {baseExp && <InfoItemValue color={mapColorToHex(color?.name)}>{baseExp}</InfoItemValue>}
      </InfoItem>
      <InfoItem>
        <InfoItemLabel>Rarity</InfoItemLabel>
        {rarity && <InfoItemValue color={mapColorToHex(color?.name)}>{rarity}</InfoItemValue>}
      </InfoItem>
    </InfoItemContainer>
  </Base>
)

export default PokedexData;
