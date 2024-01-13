import request from './request';
import {YOUTUBE_KEY} from 'react-native-dotenv';

const fetchYoutube = async () => {
  return await request(
    'get',
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&key=${YOUTUBE_KEY}`,
    {},
    {},
  );
};

export {fetchYoutube};
