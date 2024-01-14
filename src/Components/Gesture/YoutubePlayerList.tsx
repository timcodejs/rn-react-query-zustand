import React, {useState} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useSharedValue, withSpring} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import {Color} from '../../Utility/utils/Color';
import {PretendardBold} from '../../Utility/utils/CustomFont';
import {hp, screenHeight, screenWidth} from '../../Utility/utils/UI';
import {useGetYoutubeListQuery} from '../../Store/queries/youtubeQuery';
import YoutubeSwipeToCloseGesture from './YoutubeSwipeToCloseGesture';
import 'moment/locale/ko';

const YoutubePlayerList = () => {
  const [playData, setPlayData] = useState();
  const [playing, setPlaying] = useState(true);
  const yPosition = useSharedValue(screenHeight);
  const {datas} = useGetYoutubeListQuery();

  const handlePlay = (data: any) => {
    setPlaying(true);
    setPlayData(data);
    yPosition.value = withSpring(0, {
      damping: 15,
      overshootClamping: true,
    });
  };

  return (
    <View style={styles.view}>
      <FlatList
        data={datas?.data?.items}
        keyExtractor={(item: any) => item.id}
        renderItem={({item}: any) => {
          return (
            <View style={styles.item}>
              <TouchableOpacity onPress={() => handlePlay(item)}>
                <FastImage
                  style={{width: screenWidth, height: hp(200)}}
                  source={{uri: item?.snippet.thumbnails.maxres.url}}
                />
                <PretendardBold
                  size={hp(20)}
                  color={Color.white}
                  style={styles.padding}
                  children={item?.snippet?.title}
                />
              </TouchableOpacity>
            </View>
          );
        }}
        ListFooterComponent={<View style={{height: hp(200)}} />}
      />
      <YoutubeSwipeToCloseGesture
        data={playData}
        yPosition={yPosition}
        playing={playing}
        setPlaying={setPlaying}
      />
    </View>
  );
};

export default YoutubePlayerList;

const styles = StyleSheet.create({
  view: {
    height: screenHeight,
    backgroundColor: Color.black,
  },
  item: {
    marginTop: hp(10),
    marginBottom: hp(10),
  },
  padding: {
    padding: hp(10),
  },
});
