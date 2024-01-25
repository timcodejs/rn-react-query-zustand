import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {Color} from '../../Utility/utils/Color';

type Props = {
  cameraMode: string;
  takePicturePress: () => void;
  takeVideoPress: () => void;
  videoAnimatedProps: any;
  gestureTapVideo: any;
};

const CameraButton = ({
  cameraMode,
  takePicturePress,
  takeVideoPress,
  videoAnimatedProps,
  gestureTapVideo,
}: Props) => {
  return (
    <>
      {cameraMode === 'photo' ? (
        <TouchableOpacity style={styles.picture} onPress={takePicturePress}>
          <View style={styles.circle} />
        </TouchableOpacity>
      ) : (
        <GestureDetector gesture={gestureTapVideo}>
          <Animated.View style={[styles.video, videoAnimatedProps]}>
            <TouchableOpacity onPress={takeVideoPress}>
              <View style={styles.circle2} />
            </TouchableOpacity>
          </Animated.View>
        </GestureDetector>
      )}
    </>
  );
};

export default CameraButton;

const styles = StyleSheet.create({
  picture: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50,
    width: 75,
    height: 75,
    borderRadius: 75,
    backgroundColor: Color.white,
  },
  video: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50,
    width: 75,
    height: 75,
    borderRadius: 75,
    backgroundColor: 'red',
  },
  circle: {
    width: 65,
    height: 65,
    borderWidth: 2,
    borderColor: Color.gray,
    borderRadius: 65,
  },
  circle2: {
    width: 75,
    height: 75,
    borderWidth: 4,
    borderColor: Color.white,
    borderRadius: 75,
  },
});
