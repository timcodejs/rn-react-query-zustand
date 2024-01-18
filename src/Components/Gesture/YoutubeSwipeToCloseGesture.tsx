import moment from 'moment';
import {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Platform} from 'react-native';
import Animated, {
  withSpring,
  SharedValue,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import YoutubePlayer, {YoutubeIframeRef} from 'react-native-youtube-iframe';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {wp, hp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {IconCrossIcon} from '@Utility/utils/SVG';
import {screenWidth, screenHeight} from '../../Utility/utils/UI';
import {
  PretendardBold,
  PretendardRegular,
} from '../../Utility/utils/CustomFont';
import 'moment/locale/ko';

interface Props {
  data: any;
  yPosition: SharedValue<number>;
  playing: boolean;
  setPlaying: (e: boolean) => void;
}

const YoutubeSwipeToCloseGesture = ({
  data,
  yPosition,
  playing,
  setPlaying,
}: Props) => {
  const platformHeight =
    Platform.OS === 'ios' ? screenHeight - 280 : screenHeight - 210;
  const playerRef = useRef<YoutubeIframeRef | null>(null);
  const [elapsed, setElapsed] = useState('');
  const [playerState, setPlayerState] = useState('');
  const [dateFormat, setDateFormat] = useState(false);
  const contentHeight = useSharedValue(platformHeight);
  const publishedAt = moment.duration(
    moment().diff(moment(data?.snippet.publishedAt)),
  );

  const swipeToCloseGestureHandler = Gesture.Pan()
    .onStart((ctx: any) => {
      ctx.absoluteY = yPosition.value;
    })
    .onUpdate((ctx: any) => {
      if (ctx.translationY < 0) {
        // Drag up
        yPosition.value = ctx.translationY / 5;
      } else {
        // Drag down
        yPosition.value = ctx.translationY;
      }
    })
    .onEnd((ctx: any) => {
      const shouldClose = yPosition.value + 0.5 * ctx.velocityY > 300;
      const animateTo = shouldClose ? contentHeight.value : 0;

      yPosition.value = withSpring(animateTo, {
        damping: 5,
        overshootClamping: true,
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: Color.black,
    transform: [{translateY: yPosition.value}],
  }));

  const smallDirectionStyle = useAnimatedStyle(() => ({
    flexDirection: yPosition.value === contentHeight.value ? 'row' : 'column',
  }));

  const smallPlayerStyle = useAnimatedStyle(() => ({
    width: yPosition.value === contentHeight.value ? 120 : screenWidth,
    height: yPosition.value === contentHeight.value ? 70 : 200,
  }));

  const smallTitleStyle = useAnimatedStyle(() => ({
    width: screenWidth - 149,
    height: 70,
    alignItems: 'center',
    display: yPosition.value === contentHeight.value ? 'flex' : 'none',
    flexDirection: yPosition.value === contentHeight.value ? 'row' : 'column',
  }));

  const displayStyle = useAnimatedStyle(() => ({
    display: yPosition.value === contentHeight.value ? 'none' : 'flex',
  }));

  useEffect(() => {
    const interval = setInterval(async () => {
      if (playerState === 'playing') {
        const elapsed_sec: any = await playerRef?.current?.getCurrentTime();
        // calculations
        const elapsed_ms: any = Math.floor(elapsed_sec * 1000);
        const min: any = Math.floor(elapsed_ms / 60000);
        const seconds: any = Math.floor((elapsed_ms - min * 60000) / 1000);
        setElapsed(
          min.toString().padStart(2, '0') +
            ':' +
            seconds.toString().padStart(2, '0'),
        );
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [playerState]);

  const onStateChange = useCallback((state: string) => {
    setPlayerState(state);
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  return (
    <>
      <GestureDetector gesture={swipeToCloseGestureHandler}>
        <Animated.View style={[styles.box, animatedStyle]}>
          <Animated.View style={smallDirectionStyle}>
            <Animated.View style={smallPlayerStyle}>
              <YoutubePlayer
                ref={playerRef}
                height={hp(250)}
                play={playing}
                videoId={data?.id}
                initialPlayerParams={{
                  modestbranding: true,
                }}
                onChangeState={onStateChange}
              />
            </Animated.View>
            <Animated.View style={displayStyle}>
              <PretendardRegular
                size={hp(10)}
                color={Color.white}
                style={styles.time}
                children={elapsed !== 'NaN:NaN' ? elapsed : ''}
              />
              <PretendardBold
                size={hp(20)}
                color={Color.white}
                style={[styles.padding, {marginTop: 30}]}
                children={data?.snippet.title}
              />
            </Animated.View>
            <Animated.View style={smallTitleStyle}>
              <PretendardBold
                size={hp(14)}
                color={Color.white}
                style={styles.padding}
                numberOfLines={1}
                ellipsizeMode="tail"
                children={data?.snippet.title}
              />
              <TouchableOpacity
                onPress={() => {
                  setPlaying(false);
                  yPosition.value = withSpring(screenHeight, {
                    damping: 5,
                    overshootClamping: true,
                  });
                }}>
                <IconCrossIcon
                  color={Color.white}
                  width={wp(30)}
                  height={hp(30)}
                />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
          <Animated.View style={displayStyle}>
            <TouchableOpacity
              style={styles.datePadding}
              onPress={() => setDateFormat(prev => !prev)}>
              <PretendardRegular
                size={hp(14)}
                color={Color.white}
                children={
                  dateFormat
                    ? moment(data?.snippet.publishedAt).format('YYYY. MM. DD.')
                    : publishedAt.days() === 0
                    ? publishedAt.hours() === 0
                      ? publishedAt.minutes() === 0
                        ? publishedAt.seconds() === 0
                          ? '지금'
                          : `${publishedAt.minutes()}초 전`
                        : `${publishedAt.minutes()}분 전`
                      : `${publishedAt.hours()}시간 전`
                    : `${publishedAt.days()}일 전`
                }
              />
            </TouchableOpacity>
            <View style={styles.line}>
              <PretendardRegular
                color={Color.white}
                style={styles.padding}
                numberOfLines={12}
                ellipsizeMode="tail"
                children={data?.snippet.description}
              />
            </View>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </>
  );
};

export default YoutubeSwipeToCloseGesture;

const styles = StyleSheet.create({
  box: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    backgroundColor: Color.black,
  },
  padding: {
    paddingLeft: hp(10),
    paddingRight: hp(10),
  },
  rowPadding: {
    width: screenWidth - 150,
    paddingTop: hp(10),
    paddingBottom: hp(5),
    paddingLeft: hp(5),
    paddingRight: hp(5),
  },
  datePadding: {
    width: wp(100),
    margin: hp(10),
  },
  line: {
    borderTopColor: Color.gray,
    borderTopWidth: 1,
    paddingTop: hp(10),
  },
  row: {
    width: screenWidth,
    flexDirection: 'row',
  },
  time: {
    position: 'absolute',
    top: -10,
    left: 110,
  },
});
