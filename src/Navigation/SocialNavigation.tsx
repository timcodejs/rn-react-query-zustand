import {createStackNavigator} from '@react-navigation/stack';
import {AllScreenList, SocialParamList} from './NavigationProps';
import Social from '../Screens/Social';
import User from '../Screens/User';

const SocialNavigation = () => {
  const Stack = createStackNavigator<SocialParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AllScreenList.Social}
        component={Social}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AllScreenList.User}
        component={User}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SocialNavigation;
