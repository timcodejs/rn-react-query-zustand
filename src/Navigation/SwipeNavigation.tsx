import {createStackNavigator} from '@react-navigation/stack';
import {AllScreenList, SwipeParamList} from './NavigationProps';
import Swipe from '../Screens/Swipe';

const SwipeNavigation = () => {
  const Stack = createStackNavigator<SwipeParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AllScreenList.Swipe}
        component={Swipe}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SwipeNavigation;
