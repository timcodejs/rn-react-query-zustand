import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import {useBottomNaviDisplay} from '../../Business/hooks/useBottomNaviDisplay';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';

const os = Platform.OS;
const window = Dimensions.get('window');
const screen = Dimensions.get('screen');
const navigationH: number = 48;
const statusbarH: any = StatusBar.currentHeight; // android
const ScreenH = screen.height;
const windowH = window.height;

const DimensionsValue = ({
  navigation,
}: SwipeStackProps<AllScreenList.DimensionsValue>) => {
  const isFocused = useIsFocused();
  const headerH = useHeaderHeight();
  const [dimensions, setDimensions] = useState({window, screen});

  const heightSum = statusbarH + windowH + navigationH;
  const isIncludeStatusbarHeight = heightSum > screen.height;

  useBottomNaviDisplay(navigation, isFocused);

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions({window, screen});
      },
    );
    return () => subscription?.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.os}>OS: {os}</Text>
      <Text style={styles.header}>Window Dimensions</Text>
      {Object.entries(dimensions.window).map(([key, value]) => (
        <Text key={value}>
          {key} : {value}
        </Text>
      ))}
      <Text style={styles.header}>Screen Dimensions</Text>
      {Object.entries(dimensions.screen).map(([key, value]) => (
        <Text key={value}>
          {key} : {value}
        </Text>
      ))}
      <Text style={styles.header}>Status Bar (Android)</Text>
      <Text>height : {statusbarH}</Text>
      <Text style={styles.header}>Header Size</Text>
      <Text>header : {headerH}</Text>
      <Text style={styles.header}>navigation Size (Android)</Text>
      <Text>navigation : {navigationH}</Text>
      <Text style={styles.header}>Is include statusbar.height?</Text>
      <Text>
        {heightSum} {isIncludeStatusbarHeight ? '>' : '='} {screen.height}
      </Text>
      <Text style={{color: 'red'}}>statusbar : {statusbarH}</Text>
      <Text style={{color: 'orange'}}>screen : {ScreenH}</Text>
      <Text style={{color: 'green'}}>window : {windowH}</Text>
      <Text style={{color: 'purple'}}>
        navigation : {os === 'ios' ? 78 : navigationH}
      </Text>
      <View style={styles.statusbar} />
      <View style={styles.screen} />
      <View style={styles.window} />
      <View style={styles.navigation} />
      {/* <View style={styles.statusbarWindow} /> */}
      {/* <View style={styles.statusbarWindow2} /> */}
      {/* <View style={styles.bottom} /> */}
      {/* <View style={styles.top} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  os: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  statusbar: {
    position: 'absolute',
    zIndex: 10,
    right: 0,
    top: statusbarH,
    width: '100%',
    height: 2,
    backgroundColor: 'red',
  },
  screen: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0,
    width: '100%',
    height: ScreenH,
    borderWidth: 2,
    borderColor: 'orange',
  },
  window: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    width: '100%',
    height: windowH,
    borderWidth: 6,
    borderColor: 'green',
  },
  navigation: {
    position: 'absolute',
    bottom: 0,
    height: os === 'ios' ? 78 : navigationH,
    width: '100%',
    backgroundColor: 'purple',
  },
  // statusbarWindow: {
  //   position: 'absolute',
  //   right: 0,
  //   top: 100,
  //   width: '100%',
  //   height: 2,
  //   backgroundColor: 'yellowgreen',
  //   zIndex: 2,
  // },
  // statusbarWindow2: {
  //   position: 'absolute',
  //   right: size * 2,
  //   top: 120,
  //   width: size,
  //   height: size,
  //   backgroundColor: 'firebrick',
  //   zIndex: 2,
  // },
  // bottom: {
  //   position: 'absolute',
  //   left: 0,
  //   top: 400,
  //   bottom: 0,
  //   width: size,
  //   height: size,
  //   backgroundColor: 'lightblue',
  //   zIndex: 3,
  // },
  // top: {
  //   position: 'absolute',
  //   right: 0,
  //   top: 200,
  //   width: size,
  //   height: size,
  //   backgroundColor: 'lightpink',
  //   zIndex: 4,
  // },
  // screen: {
  //   position: 'absolute',
  //   right: size,
  //   top: windowH - size,
  //   width: size,
  //   height: size,
  //   backgroundColor: 'lightgreen',
  //   zIndex: 5,
  // },
});

export default DimensionsValue;
