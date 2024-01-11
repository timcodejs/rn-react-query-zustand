import React from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import {styles} from '../Utility/utils/Styles';

interface RightActionsProps {
  dragX: any;
  index: number;
  swipeableRef: any;
  model: any;
}

const RightActions = ({
  dragX,
  index,
  swipeableRef,
  model,
}: RightActionsProps) => {
  const trans = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <TouchableOpacity
      onPress={() => {
        console.log(index, 'delete');
        model?.handleDelete(index);
        swipeableRef.current?.close();
      }}
      activeOpacity={0.6}>
      <View style={[styles.ItemBox, styles.delete]}>
        <Animated.Text
          style={[styles.color, {transform: [{translateX: trans}]}]}>
          Delete
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
};

export default RightActions;
