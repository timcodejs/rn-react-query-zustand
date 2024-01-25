import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {wp} from '.../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {PretendardBold} from '../../Utility/utils/CustomFont';

interface Props {
  cameraMode: string;
  setCameraMode: (e: string) => void;
}

const PhotoVideoMode = ({cameraMode, setCameraMode}: Props) => {
  return (
    <View style={styles.mode}>
      <TouchableOpacity onPress={() => setCameraMode('photo')}>
        <PretendardBold
          color={cameraMode === 'photo' ? Color.yellow : Color.white}
          style={{paddingHorizontal: wp(10)}}
          children="사진"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCameraMode('video')}>
        <PretendardBold
          color={cameraMode === 'video' ? Color.yellow : Color.white}
          style={{paddingHorizontal: wp(10)}}
          children="비디오"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PhotoVideoMode;

const styles = StyleSheet.create({
  mode: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 150,
  },
});
