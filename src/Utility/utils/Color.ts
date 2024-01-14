/**
 * @description 컬러
 */
export const Color = {
  black: '#000000',
  eerieBlack: '#272726',
  darkCharcoal: '#33312f',
  jetBlack: '#393939',
  white: '#FFFFFF',
  gray: '#9a9a9a',
  lightGray: '#ebebeb',
  navy: '#191970',
};

export const RandomColor = [
  '#7F32E4',
  '#E5AB65',
  '#3E365C',
  '#EA348A',
  '#537DC0',
  '#9EC03B',
];

export const getBgColor = (len: number) => {
  for (let i = 0; i < len; i++) {
    return '#' + Math.round(Math.random() * 0xffffff).toString(16);
  }
};

export const getTextColorByBackgroundColor = (hexColor: string) => {
  const c = hexColor.substring(1); // 색상 앞의 # 제거
  const rgb = parseInt(c, 16); // rrggbb를 10진수로 변환
  const r = (rgb >> 16) & 0xff; // red 추출
  const g = (rgb >> 8) & 0xff; // green 추출
  const b = (rgb >> 0) & 0xff; // blue 추출
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  // 색상 선택
  return luma < 127.5 ? 'white' : 'black'; // 글자색이
};
