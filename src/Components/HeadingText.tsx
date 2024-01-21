import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {hp, wp} from '../Utility/utils/UI';
import {IconArrowIcon} from '../Utility/utils/SVG';
import {PretendardBold} from '../Utility/utils/CustomFont';
import {NavigationProps} from '../Navigation/NavigationProps';

interface Props {
  navigation: NavigationProps['navigation'];
  text: string;
  color: string;
  style?: any;
}

const HeadingText = ({navigation, text, color, style}: Props) => {
  return (
    <View style={[style, {flexDirection: 'row', alignItems: 'center'}]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{marginRight: hp(10)}}>
        <IconArrowIcon
          color={color}
          width={wp(20)}
          height={hp(20)}
          style={{transform: [{rotate: '180deg'}]}}
        />
      </TouchableOpacity>
      <PretendardBold
        size={hp(20)}
        color={color}
        style={{marginTop: hp(20), marginBottom: hp(20)}}
        children={text}
      />
    </View>
  );
};

export default HeadingText;
