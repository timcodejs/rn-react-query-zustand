import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {hp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {PretendardBold} from '../Utility/utils/CustomFont';

interface Props {
  text: string;
  pressHandler: (e: any) => void;
}

const CommonButton = ({text, pressHandler}: Props) => {
  return (
    <TouchableOpacity style={styles.box} onPress={pressHandler}>
      <PretendardBold size={hp(16)} color={Color.white} children={text} />
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  box: {
    height: 60,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#720455',
  },
});
