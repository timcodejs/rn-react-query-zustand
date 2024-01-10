import {StyleSheet} from 'react-native';
import {hp, wp} from './UI';

export const styles = StyleSheet.create({
  color: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ItemBox: {
    width: wp(80),
    height: hp(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    backgroundColor: 'blue',
  },
  delete: {
    backgroundColor: 'red',
  },
});
