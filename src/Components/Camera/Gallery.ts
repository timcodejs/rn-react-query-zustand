import {PermissionsAndroid, Platform} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

const Gallery = () => {
  const hasAndroidPermission = async () => {
    const getCheckPermissionPromise = () => {
      if (Platform.Version >= '33') {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }

    const getRequestPermissionPromise = () => {
      if (Platform.Version >= '33') {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  };

  const savePicture = async ({tag, type, album}: any) => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    await CameraRoll.saveAsset(tag, {type, album});
  };

  const getAlbums = async () => {
    const albums = await CameraRoll.getAlbums({
      assetType: 'All',
      albumType: 'All',
    });

    // for each album, get the first photo
    const albumDataAll = await Promise.all(
      albums.map(async album => {
        const photos = await CameraRoll.getPhotos({
          first: 1,
          assetType: 'Photos',
          groupName: album.title,
        });
        if (photos.edges.length > 0) {
          return {
            name: album.title,
            count: album.count,
            uri: photos.edges[0].node.image.uri,
            extension: photos.edges[0].node.image.extension,
          };
        }
      }),
    );

    return albumDataAll;
  };

  return {getAlbums, savePicture, hasAndroidPermission};
};

export default Gallery;
