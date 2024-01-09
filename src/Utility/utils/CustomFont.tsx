import styled from 'styled-components/native';
import {FontFamilyType} from './Enum';

type CustomFontProps = {
  fontName?: string;
  color?: string;
  size?: number;
};

export const CustomFont = styled.Text<CustomFontProps>`
  font-size: ${(props: CustomFontProps) => props.size || 20}px;
  color: ${(props: CustomFontProps) => props.color || '#000'};
  font-family: ${(props: CustomFontProps) => props.fontName || 'Georgia'};
`;

export const PretendardBold = styled.Text<CustomFontProps>`
  font-size: ${(props: CustomFontProps) => props.size || 20}px;
  color: ${(props: CustomFontProps) => props.color || '#000'};
  font-family: ${FontFamilyType.PretendardBold};
`;

export const PretendardSemiBold = styled.Text<CustomFontProps>`
  font-size: ${(props: CustomFontProps) => props.size || 20}px;
  color: ${(props: CustomFontProps) => props.color || '#000'};
  font-family: ${FontFamilyType.PretendardSemiBold};
`;

export const PretendardRegular = styled.Text<CustomFontProps>`
  font-size: ${(props: CustomFontProps) => props.size || 20}px;
  color: ${(props: CustomFontProps) => props.color || '#000'};
  font-family: ${FontFamilyType.PretendardRegular};
`;

export const PretendardMedium = styled.Text<CustomFontProps>`
  font-size: ${(props: CustomFontProps) => props.size || 20}px;
  color: ${(props: CustomFontProps) => props.color || '#000'};
  font-family: ${FontFamilyType.PretendardMedium};
`;

export const AritaBuriMedium = styled.Text<CustomFontProps>`
  font-size: ${(props: CustomFontProps) => props.size || 20}px;
  color: ${(props: CustomFontProps) => props.color || '#000'};
  font-family: ${FontFamilyType.AritaburiMedium};
`;

export const AritaBuriSemiBold = styled.Text<CustomFontProps>`
  font-size: ${(props: CustomFontProps) => props.size || 20}px;
  color: ${(props: CustomFontProps) => props.color || '#000'};
  font-family: ${FontFamilyType.AritaburiSemiBold_TTF};
`;
