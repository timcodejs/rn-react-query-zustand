import React, {useRef} from 'react';
import {Text, Animated, StyleSheet, Easing} from 'react-native';

interface Props {
  text: string;
  triger: any;
  bottom?: number;
  onClose: (e: any) => void;
  isWrapped?: boolean;
}

const ToastTopMessage = ({text, triger, onClose}: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const moveAnim = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  if (triger) {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => {
      if (finished) {
        onClose({triger: false, text: ''});
      }
    });
  }

  return (
    <>
      {triger && (
        <Animated.View
          style={[styles.container, {transform: [{translateY: moveAnim}]}]}>
          <Text style={styles.toastText}>{text}</Text>
        </Animated.View>
      )}
    </>
  );
};

export default ToastTopMessage;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'absolute',
    top: 50,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  toastText: {
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 8,
    color: '#ffffff',
  },
});
