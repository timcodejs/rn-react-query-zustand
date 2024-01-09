import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {hp, wp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {PretendardRegular} from '../Utility/utils/CustomFont';

const SearchList = ({data}: any) => {
  return (
    <Wrap>
      {data?.length > 0 ? (
        data?.map((item: any, idx: number) => {
          return (
            <Item
              key={idx}
              style={{
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
              }}>
              <View>
                <FastImage
                  style={{width: wp(340), height: hp(500)}}
                  source={{uri: item.image}}
                />
              </View>
              <View>
                <PretendardRegular>북명 : {item.title}</PretendardRegular>
                <PretendardRegular>저자 : {item.author}</PretendardRegular>
                <PretendardRegular>출판사 : {item.publisher}</PretendardRegular>
                <PretendardRegular>설명 : {item.description}</PretendardRegular>
              </View>
            </Item>
          );
        })
      ) : (
        <PretendardRegular>결과가 없습니다.</PretendardRegular>
      )}
    </Wrap>
  );
};

export default SearchList;

const Wrap = styled.View`
  margin-top: ${hp(10)}px;
`;

const Item = styled.View`
  width: ${wp(340)}px;
  margin-bottom: ${hp(20)}px;
  padding-bottom: ${hp(20)}px;
  border: 1px solid ${Color.gray};
`;
