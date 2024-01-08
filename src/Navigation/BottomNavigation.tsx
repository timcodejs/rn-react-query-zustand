import {useRef} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList, BottomTabNameList} from './NavigationProps';
import {Color} from '../Utility/utils/Color';
import TodoNavigation from './TodoNavigation';
import ScrollNavigation from './ScrollNavigation';
import SocialNavigation from './SearchNavigation';
import SearchNavigation from './SocialNavigation';
import {
  IconTodoIcon,
  IconScrollIcon,
  IconScoialIcon,
  IconSearchIcon,
} from '../Utility/utils/SVG';

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
            backgroundColor: Color.navy,
          },
        }}>
        <BottomStack.Screen
          name={BottomTabNameList.main}
          component={TodoNavigation}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                {focused ? (
                  <IconTodoIcon
                    height={20}
                    width={20}
                    style={{color: Color.white}}
                  />
                ) : (
                  <IconTodoIcon
                    height={20}
                    width={20}
                    style={{color: Color.gray}}
                  />
                )}
              </View>
            ),
          }}
        />
        <BottomStack.Screen
          name={BottomTabNameList.first}
          component={ScrollNavigation}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                {focused ? (
                  <IconScrollIcon
                    height={20}
                    width={20}
                    style={{color: Color.white}}
                  />
                ) : (
                  <IconScrollIcon
                    height={20}
                    width={20}
                    style={{color: Color.gray}}
                  />
                )}
              </View>
            ),
          }}
        />
        <BottomStack.Screen
          name={BottomTabNameList.second}
          component={SocialNavigation}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                {focused ? (
                  <IconScoialIcon
                    height={20}
                    width={20}
                    style={{color: Color.white}}
                  />
                ) : (
                  <IconScoialIcon
                    height={20}
                    width={20}
                    style={{color: Color.gray}}
                  />
                )}
              </View>
            ),
          }}
        />
        <BottomStack.Screen
          name={BottomTabNameList.third}
          component={SearchNavigation}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                {focused ? (
                  <IconSearchIcon
                    height={20}
                    width={20}
                    style={{color: Color.white}}
                  />
                ) : (
                  <IconSearchIcon
                    height={20}
                    width={20}
                    style={{color: Color.gray}}
                  />
                )}
              </View>
            ),
          }}
        />
      </BottomStack.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigation;
