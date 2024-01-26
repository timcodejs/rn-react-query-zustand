import React, {useEffect, useState} from 'react';
import {Linking, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import FastImage from 'react-native-fast-image';

interface Props {
  albumData: any[] | undefined;
}

const Albums = ({albumData}: Props) => {
  const [base64Image, setBase64Image] = useState<string | null>(null);

  useEffect(() => {
    if (albumData) {
      const getThumbnail = async () => {
        const options = {
          allowNetworkAccess: true,
          targetSize: {
            height: 50,
            width: 50,
          },
          quality: 1.0,
        };

        if (albumData) {
          const thumbnailResponse = await CameraRoll.getPhotoThumbnail(
            albumData[0]?.uri,
            options,
          );

          setBase64Image(thumbnailResponse.thumbnailBase64);
        }
      };

      getThumbnail();
    }
  }, [albumData]);

  return (
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
      {albumData && (
        <FastImage
          style={styles.image}
          source={{uri: `data:image/jpeg;base64,${base64Image}`}}
        />
      )}
    </TouchableOpacity>
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
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});
