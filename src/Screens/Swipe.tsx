import React, {useRef} from 'react';
import {StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';
import Header from '../Components/Header';
import {hp, wp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {IconArrowIcon} from '../Utility/utils/SVG';
import {menuList} from '../Utility/utils/constant';
import {PretendardBold, PretendardRegular} from '../Utility/utils/CustomFont';
import {useCamPermissions} from '../Business/hooks/useCamPermissions';
import {AllScreenList, SwipeStackProps} from '../Navigation/NavigationProps';

const Swipe = ({navigation}: SwipeStackProps<AllScreenList.Swipe>) => {
  const listRef = useRef(null);
  useScrollToTop(listRef);

  const {checkPermission} = useCamPermissions();

  return (
    <View style={styles.view}>
      <Header navigation={navigation} bgColor={Color.white} />
      <PretendardBold
        size={hp(20)}
        style={{marginTop: hp(20), marginBottom: hp(20)}}
        children="스와이프 (feat.RNGH, reanimated)"
      />
      <FlatList
        ref={listRef}
        data={menuList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
        keyExtractor={(item: any, index: number) => index.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.list}
              onPress={async () => {
                if (item.navigates === AllScreenList.Camera) {
                  const result = await checkPermission();

                  if (result) {
                    navigation.navigate(item.navigates);
                  }
                } else {
                  navigation.navigate(item.navigates);
                }
              }}>
              <PretendardRegular
                size={hp(18)}
                style={{marginTop: hp(20), marginBottom: hp(20)}}
                children={item.text}
              />
              <IconArrowIcon
                color={Color.black}
                width={wp(20)}
                height={hp(20)}
              />
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.line} />}
        ListFooterComponent={() => <View style={styles.line} />}
      />
    </View>
  );
};

export default Swipe;

const styles = StyleSheet.create({
  view: {
    height: hp(740),
    paddingLeft: hp(10),
    paddingRight: hp(10),
    backgroundColor: Color.white,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    height: 1,
    backgroundColor: Color.gray,
  },
});
