import {useEffect} from 'react';
import {Color} from '../../Utility/utils/Color';
import {NavigationProps} from '../../Navigation/NavigationProps';

export const useBottomNaviDisplay = (
  navigation: NavigationProps['navigation'],
  isFocused: boolean,
) => {
  useEffect(() => {
    if (isFocused) {
      navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.getParent().setOptions({
        tabBarStyle: {display: 'flex', backgroundColor: Color.black},
      });
    }
  }, [isFocused]);
};
