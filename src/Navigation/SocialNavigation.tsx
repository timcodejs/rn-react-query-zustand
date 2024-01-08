import {createStackNavigator} from '@react-navigation/stack';
import {AllScreenList, SearchParamList} from './NavigationProps';
import Search from '../Screens/Search';

const SearchNavigation = () => {
  const Stack = createStackNavigator<SearchParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AllScreenList.Search}
        component={Search}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigation;
