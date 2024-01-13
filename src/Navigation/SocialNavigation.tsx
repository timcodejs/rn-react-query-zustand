import {createStackNavigator} from '@react-navigation/stack';
import {AllScreenList, SocialParamList} from './NavigationProps';
import Social from '../Screens/Social';

const SocialNavigation = () => {
  const Stack = createStackNavigator<SocialParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AllScreenList.Social}
        component={Social}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SocialNavigation;
