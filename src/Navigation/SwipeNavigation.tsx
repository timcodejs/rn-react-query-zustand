import {createStackNavigator} from '@react-navigation/stack';
import {AllScreenList, SwipeParamList} from './NavigationProps';
import Swipe from '../Screens/Swipe';
import SwipeToClose from '../Screens/Gesture/SwipeToClose';
import SwipeCarousel from '../Screens/Gesture/SwipeCarousel';
import YoutubePlayer from '../Screens/Gesture/YoutubePlayer';
import WishList from '../Screens/Gesture/WishList';
import DragToClose from '../Screens/Gesture/DragToClose';
import DimensionsValue from '../Screens/Gesture/DimensionsValue';
import PushNoti from '../Screens/Gesture/PushNoti';
import IntlCommend from '../Screens/Gesture/IntlCommend';
import CameraContainer from '../Screens/Gesture/CameraContainer';
import Setting from '../Screens/Gesture/Setting';
import DynamicIsland from '../Screens/Gesture/DynamicIsland';

const SwipeNavigation = () => {
  const Stack = createStackNavigator<SwipeParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AllScreenList.Swipe}
        component={Swipe}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AllScreenList.SwipeToClose}
        component={SwipeToClose}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AllScreenList.SwipeCarousel}
        component={SwipeCarousel}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AllScreenList.YoutubePlayer}
        component={YoutubePlayer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AllScreenList.WishList}
        component={WishList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AllScreenList.DragToClose}
        component={DragToClose}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AllScreenList.DimensionsValue}
        component={DimensionsValue}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AllScreenList.PushNoti}
        component={PushNoti}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AllScreenList.IntlCommend}
        component={IntlCommend}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AllScreenList.Camera}
        component={CameraContainer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AllScreenList.Setting}
        component={Setting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AllScreenList.DynamicIsland}
        component={DynamicIsland}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SwipeNavigation;
