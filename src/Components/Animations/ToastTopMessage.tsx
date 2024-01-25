import React, {useEffect, useRef} from 'react';
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

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose({triger: false, text: ''});
    }, 2000);

    Animated.timing(fadeAnim, {
      toValue: triger ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    return () => clearTimeout(timer);
  }, [triger]);

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
