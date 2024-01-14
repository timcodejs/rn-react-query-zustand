import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {PretendardRegular} from '../../Utility/utils/CustomFont';

const BookList = ({book}: any) => {
  return (
    <Item>
      <FastImage
        style={{
          width: wp(340),
          height: hp(500),
          marginBottom: hp(10),
        }}
        source={{uri: book?.image}}
      />
      <PretendardRegular
        style={{marginBottom: hp(10)}}
        children={`북명 : ${book?.title}`}
      />
      <PretendardRegular
        style={{marginBottom: hp(10)}}
        children={`저자 : ${book?.author}`}
      />
      <PretendardRegular
        style={{marginBottom: hp(10)}}
        children={`출판사 : ${book?.publisher}`}
      />
      <PretendardRegular children={`설명 :\n${book?.description}`} />
    </Item>
  );
};

export default BookList;

const Item = styled.View`
  width: ${wp(340)}px;
  margin-bottom: ${hp(20)}px;
  padding-bottom: ${hp(20)}px;
  border: 1px solid ${Color.gray};
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;
