import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {PretendardBold} from '../../Utility/utils/CustomFont';

interface Props {
  zoomRatio: number;
  setZoomRatio: (e: number) => void;
}

const ZoomMode = ({zoomRatio, setZoomRatio}: Props) => {
  return (
    <View style={styles.zoom}>
      <TouchableOpacity style={styles.ratio} onPress={() => setZoomRatio(1.0)}>
        <PretendardBold
          size={hp(12)}
          color={zoomRatio === 1.0 ? Color.yellow : Color.white}
          children="1x"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.ratio} onPress={() => setZoomRatio(2.0)}>
        <PretendardBold
          size={hp(12)}
          color={zoomRatio === 2.0 ? Color.yellow : Color.white}
          children="2x"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.ratio} onPress={() => setZoomRatio(3.0)}>
        <PretendardBold
          size={hp(12)}
          color={zoomRatio === 3.0 ? Color.yellow : Color.white}
          children="3x"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ZoomMode;

const styles = StyleSheet.create({
  zoom: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 200,
    borderRadius: 20,
    paddingVertical: hp(5),
    paddingHorizontal: wp(5),
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  ratio: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 30,
    marginHorizontal: wp(5),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
