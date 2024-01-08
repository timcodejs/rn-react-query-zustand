import {createStackNavigator} from '@react-navigation/stack';
import {AllScreenList, ScrollParamList} from './NavigationProps';
import Scroll from '../Screens/Scroll';

const ScrollNavigation = () => {
  const Stack = createStackNavigator<ScrollParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AllScreenList.Scroll}
        component={Scroll}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ScrollNavigation;
