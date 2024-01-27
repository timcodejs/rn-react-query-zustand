import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Color} from '../../Utility/utils/Color';

interface Props {
  albumData: any[] | undefined;
}

const Albums = ({albumData}: Props) => {
  const [base64Image, setBase64Image] = useState<string | null>(null);

  useEffect(() => {
    if (albumData?.length !== 0 && albumData !== undefined) {
      const getThumbnail = async () => {
        const options = {
          allowNetworkAccess: true,
          targetSize: {
            height: 50,
            width: 50,
          },
          quality: 1.0,
        };

        const thumbnailResponse = await CameraRoll.getPhotoThumbnail(
          albumData[0]?.uri,
          options,
        );

        setBase64Image(thumbnailResponse.thumbnailBase64);
      };

      getThumbnail();
    }
  }, [albumData]);

  return (
    <>
      {albumData?.length !== 0 && albumData !== undefined ? (
        <TouchableOpacity
          style={styles.albums}
          onPress={() => {
            switch (Platform.OS) {
              case 'ios':
                Linking.openURL('photos-redirect://');
                break;
              case 'android':
                Linking.openURL('content://media/internal/images/media');
                break;
              default:
                console.log('Could not open gallery app');
            }
          }}>
          <FastImage
            style={styles.image}
            source={{uri: `data:image/jpeg;base64,${base64Image}`}}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.albums}
          onPress={() => {
            Alert.alert('라이브러리에 액세스하도록 허용해주세요.', '', [
              {text: '취소', onPress: () => {}},
              {
                text: '설정',
                onPress: () => Linking.openSettings(),
              },
            ]);
          }}
        />
      )}
    </>
  );
};

export default Albums;

const styles = StyleSheet.create({
  albums: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 60,
    left: 30,
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: Color.black,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});
