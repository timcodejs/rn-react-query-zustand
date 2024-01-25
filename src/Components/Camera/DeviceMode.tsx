import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {CameraDevice} from 'react-native-vision-camera';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {IconReuseIcon} from '../../Utility/utils/SVG';

interface Props {
  deviceMode: CameraDevice['position'];
  setDeviceMode: (e: CameraDevice['position']) => void;
}

const DeviceMode = ({deviceMode, setDeviceMode}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.reuse]}
      onPress={() => {
        if (deviceMode === 'back') {
          setDeviceMode('front');
        } else {
          setDeviceMode('back');
        }
      }}>
      <IconReuseIcon color={Color.white} width={wp(30)} height={hp(30)} />
    </TouchableOpacity>
  );
};

export default DeviceMode;

const styles = StyleSheet.create({
  reuse: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 60,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
