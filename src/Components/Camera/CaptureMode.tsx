import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  IconFlashOffIcon,
  IconFlashOnIcon,
  IconHDROffIcon,
  IconHDROnIcon,
} from '../../Utility/utils/SVG';
import Animated from 'react-native-reanimated';
import {CameraDeviceFormat, TakePhotoOptions} from 'react-native-vision-camera';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import ToastTopMessage from '../../Components/Animations/ToastTopMessage';

type trigerProps = {triger: boolean; text: string};

interface Props {
  isTriger: trigerProps;
  setIsTriger: (e: trigerProps) => void;
  isFlash: TakePhotoOptions['flash'];
  setIsFlash: (e: TakePhotoOptions['flash']) => void;
  photoHDR: CameraDeviceFormat['supportsPhotoHdr'];
  setPhotoHDR: (e: CameraDeviceFormat['supportsPhotoHdr']) => void;
  focusAnimatedProps: any;
}

const CaptureMode = ({
  isTriger,
  setIsTriger,
  isFlash,
  setIsFlash,
  photoHDR,
  setPhotoHDR,
  focusAnimatedProps,
}: Props) => {
  return (
    <>
      {/* focus area */}
      <Animated.View style={[styles.focus, focusAnimatedProps]} />
      {/* toast message */}
      <ToastTopMessage
        text={isTriger.text}
        triger={isTriger.triger}
        onClose={setIsTriger}
      />
      {/* flash on/off */}
      <TouchableOpacity
        style={[styles.icon, styles.flash]}
        onPress={() => {
          setIsFlash(isFlash === 'on' ? 'off' : 'on');
          setIsTriger({
            triger: true,
            text: isFlash === 'on' ? 'Flash OFF' : 'Flash ON',
          });
        }}>
        {isFlash === 'on' ? (
          <IconFlashOnIcon color={Color.white} width={wp(20)} height={hp(20)} />
        ) : (
          <IconFlashOffIcon
            color={Color.white}
            width={wp(20)}
            height={hp(20)}
          />
        )}
      </TouchableOpacity>
      {/* hdr on/off */}
      <TouchableOpacity
        style={[styles.icon, styles.hdr]}
        onPress={() => {
          setPhotoHDR(photoHDR ? false : true);
          setIsTriger({
            triger: true,
            text: photoHDR ? 'HDR OFF' : 'HDR ON',
          });
        }}>
        {photoHDR ? (
          <IconHDROnIcon color={Color.white} width={wp(30)} height={hp(30)} />
        ) : (
          <IconHDROffIcon color={Color.white} width={wp(30)} height={hp(30)} />
        )}
      </TouchableOpacity>
    </>
  );
};

export default CaptureMode;

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: Color.white,
    borderRadius: 65,
  },
  flash: {
    top: 70,
  },
  hdr: {
    top: 120,
  },
  focus: {
    position: 'absolute',
    width: 100,
    height: 100,
    opacity: 0,
  },
});
