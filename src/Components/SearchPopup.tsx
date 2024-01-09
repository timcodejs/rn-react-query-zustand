import {View, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {PretendardRegular} from '../Utility/utils/CustomFont';
import {Color} from '../Utility/utils/Color';
import {wp, hp} from '../Utility/utils/UI';

const SearchPopup = ({data, status, isEnter}: any) => {
  const gwrDataByStatus = () => {
    switch (status) {
      case 'loading':
        return (
          <PretendardRegular size={hp(12)} color={Color.black} style={{}}>
            Loading
          </PretendardRegular>
        );
      case 'error':
        return (
          <PretendardRegular size={hp(12)} color={Color.black} style={{}}>
            Error
          </PretendardRegular>
        );
      default:
        return (
          <>
            {isEnter === true && (
              <Wrap>
                {data?.items?.map((item: any, idx: number) => {
                  return (
                    <View
                      key={idx}
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: Color.gray,
                      }}>
                      <TouchableOpacity
                        onPress={() => {}}
                        style={{
                          marginLeft: wp(5),
                          marginRight: wp(5),
                        }}>
                        <PretendardRegular
                          size={hp(15)}
                          color={Color.black}
                          style={{paddingTop: hp(10), paddingBottom: hp(10)}}>
                          {item.title}
                        </PretendardRegular>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </Wrap>
            )}
          </>
        );
    }
  };
  return data ? <View style={{zIndex: 9999}}>{gwrDataByStatus()}</View> : null;
};

export default SearchPopup;

const Wrap = styled.ScrollView`
  position: absolute;
  width: ${wp(340)}px;
  height: ${hp(200)}px;
  padding-bottom: ${hp(5)}px;
  border-radius: ${wp(5)}px;
  border: 1.5px solid ${Color.gray};
  background-color: ${Color.white};
`;
