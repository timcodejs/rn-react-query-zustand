import {useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList, BottomTabNameList} from './NavigationProps';
import {Color} from '../Utility/utils/Color';
import TodoNavigation from './TodoNavigation';
import ScrollNavigation from './ScrollNavigation';
import SocialNavigation from './SocialNavigation';
import SearchNavigation from './SearchNavigation';
import SwipeNavigation from './SwipeNavigation';
import {
  IconTodoIcon,
  IconScrollIcon,
  IconSearchIcon,
  IconSwipeIcon,
  IconScoialIcon,
} from '../Utility/utils/SVG';
import StackIcon from '../Components/StackIcon';
import db from '../../db.json';

const BottomNavigation = () => {
  const routeNameRef = useRef<any>();
  const navigationRef = useRef<any>();
  const BottomStack = createBottomTabNavigator<RootStackParamList>();
  const config = {};
  const Linking: any = {
    // 디폴트 프로토콜 설정
    prefixes: ['mess://'],
    // 스택 네비게이션 디렉토리 정보 설정
    config: config,
  };

  return (
    <NavigationContainer
      linking={Linking}
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef?.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          // analytics().setCurrentScreen(currentRouteName); // -> 애널리틱스 연결
        }
        routeNameRef.current = currentRouteName;
      }}>
      <BottomStack.Navigator
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Color.white,
          tabBarInactiveTintColor: Color.gray,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: Color.black,
          },
        }}>
        <BottomStack.Screen
          name={BottomTabNameList.main}
          component={TodoNavigation}
          options={{
            tabBarIcon: ({focused}) => (
              <StackIcon focused={focused} Icon={IconTodoIcon} />
            ),
            tabBarBadge: db.todos.length,
          }}
        />
        <BottomStack.Screen
          name={BottomTabNameList.first}
          component={ScrollNavigation}
          options={{
            tabBarIcon: ({focused}) => (
              <StackIcon focused={focused} Icon={IconScrollIcon} />
            ),
          }}
        />
        <BottomStack.Screen
          name={BottomTabNameList.second}
          component={SearchNavigation}
          options={{
            tabBarIcon: ({focused}) => (
              <StackIcon focused={focused} Icon={IconSearchIcon} />
            ),
          }}
        />
        <BottomStack.Screen
          name={BottomTabNameList.third}
          component={SwipeNavigation}
          options={{
            tabBarIcon: ({focused}) => (
              <StackIcon focused={focused} Icon={IconSwipeIcon} />
            ),
          }}
        />
        <BottomStack.Screen
          name={BottomTabNameList.forth}
          component={SocialNavigation}
          options={{
            tabBarIcon: ({focused}) => (
              <StackIcon focused={focused} Icon={IconScoialIcon} />
            ),
          }}
        />
      </BottomStack.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigation;
