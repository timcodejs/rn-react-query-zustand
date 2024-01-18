import React from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import {styles} from '../../Utility/utils/Styles';

interface LeftActionsProps {
  dragX: any;
  item: {
    id: number;
    title: string;
  };
  swipeableRef: any;
  model: any;
}

const LeftActions = ({dragX, item, swipeableRef, model}: LeftActionsProps) => {
  const trans = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <TouchableOpacity
      onPress={() => {
        model?.handleEdit(item);
        swipeableRef.current?.close();
      }}
      activeOpacity={0.6}>
      <View style={[styles.ItemBox, styles.edit]}>
        <Animated.Text
          style={[styles.color, {transform: [{translateX: trans}]}]}
          children="Edit"
        />
      </View>
    </TouchableOpacity>
  );
};

export default LeftActions;
