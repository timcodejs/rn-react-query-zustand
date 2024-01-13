import {createStackNavigator} from '@react-navigation/stack';
import {AllScreenList, SwipeParamList} from './NavigationProps';
import Swipe from '../Screens/Swipe';
import SwipeToClose from '../Screens/Gesture/SwipeToClose';
import SwipeCarousel from '../Screens/Gesture/SwipeCarousel';
import YoutubePlayer from '../Screens/Gesture/YoutubePlayer';

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
    </Stack.Navigator>
  );
};

export default SwipeNavigation;