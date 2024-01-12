import {FlatList, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {hp, wp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {IconResetIcon} from '../Utility/utils/SVG';
import {PretendardRegular} from '../Utility/utils/CustomFont';

const SearchList = ({data, handleReset}: any) => {
  return (
    <Wrap>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <PretendardRegular
          size={hp(15)}
          color={Color.eerieBlack}
          style={{marginLeft: hp(5), marginBottom: hp(15)}}
          children={`총 ${data?.length ? data?.length : 0}개`}
        />
        <ResetButton>
          <TouchableOpacity
            onPress={handleReset}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconResetIcon
              height={15}
              width={15}
              style={{color: Color.eerieBlack}}
            />
            <PretendardRegular
              size={hp(15)}
              color={Color.eerieBlack}
              style={{marginLeft: hp(5)}}
              children="초기화"
            />
          </TouchableOpacity>
        </ResetButton>
      </View>
      <List>
        {!data && (
          <PretendardRegular
            color={Color.darkCharcoal}
            style={{marginTop: hp(15)}}
            children="결과가 없습니다."
          />
        )}
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index): any => index.toString()}
          renderItem={({item}) => (
            <Item>
              <View>
                <FastImage
                  style={{width: wp(340), height: hp(500)}}
                  source={{uri: item.image}}
                />
              </View>
              <View>
                <PretendardRegular children={`북명 : ${item.title}`} />
                <PretendardRegular children={`저자 : ${item.author}`} />
                <PretendardRegular children={`출판사 : ${item.publisher}`} />
                <PretendardRegular children={`설명 : ${item.description}`} />
              </View>
            </Item>
          )}
        />
      </List>
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
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;

const ResetButton = styled.View`
  margin-bottom: ${hp(15)}px;
`;

const List = styled.View`
  padding-bottom: ${hp(300)}px;
  border: 1px solid ${Color.gray};
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;
