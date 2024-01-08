import {createStackNavigator} from '@react-navigation/stack';
import {AllScreenList, TodoParamList} from './NavigationProps';
import Todo from '../Screens/Todo';

const TodoNavigation = () => {
  const Stack = createStackNavigator<TodoParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AllScreenList.Todo}
        component={Todo}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default TodoNavigation;
