import React from 'react';
import {NativeModules, StyleSheet, Button, View} from 'react-native';
import Header from '../../Components/Header';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';
import {Color} from '@Utility/utils/Color';

const {LiveActivity} = NativeModules;

const DynamicIsland = ({
  navigation,
}: SwipeStackProps<AllScreenList.DynamicIsland>) => {
  const onStartActivity = () => {
    if (LiveActivity && typeof LiveActivity.startActivity === 'function') {
      LiveActivity.startActivity();
    } else {
      console.log('LiveActivity not found');
    }
  };

  const onEndActivity = () => {
    if (LiveActivity && typeof LiveActivity.endActivity === 'function') {
      LiveActivity.endActivity();
    } else {
      console.log('LiveActivity not found');
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} bgColor={Color.white} />
      <Button title="Start Activity" onPress={onStartActivity} />
      <Button title="Stop Activity" onPress={onEndActivity} />
    </View>
  );
};

export default DynamicIsland;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
