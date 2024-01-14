import {useEffect} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {WEB_CLIENT_ID} from 'react-native-dotenv';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAuthStore} from '../../Store/stores/authStore';

export const SocialViewModel = () => {
  // store
  const {
    setIsLogin,
    setIsLoding,
    setUserInfo,
    setUserNickname,
    setIsPlatForm,
    setAccessToken,
  } = useAuthStore();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
  }, []);

  // 구글 로그인
  const onGoogleLoginHandler = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      console.log('idToekn : ', idToken);
      if (idToken) {
        setIsLogin(true);
        setAccessToken(idToken);
      }

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log('googleCredential : ', googleCredential);

      // Sign-in the user with the credential
      const res: any = await auth().signInWithCredential(googleCredential);
      console.log('res : ', res);
      if (res) {
        setUserInfo(res?.user);
        setIsPlatForm('Google');
        setUserNickname(res?.user.displayName);
        setIsLoding(false);
      }
    } catch (error) {
      console.log('로그인 취소');
    }
  };

  // 카카오 로그인
  const onKakaoLoginHandler = () => {
    KakaoLogin.login()
      .then(result => {
        const kakaoAccessToken = JSON.stringify(result.accessToken);
        setAccessToken(kakaoAccessToken);
        setIsLogin(true);
        getKakaoProfile();
        console.log('로그인 성공', JSON.stringify(result));
      })
      .catch(error => {
        if (error.code === 'E_CANCELLED_OPERATION') {
          console.log('로그인 취소', error.message);
        } else {
          console.log(`로그인 실패(code:${error.code})`, error.message);
        }
      });
  };

  // 카카오 프로파일
  const getKakaoProfile = () => {
    KakaoLogin.getProfile()
      .then(result => {
        console.log('GetProfile Success', JSON.stringify(result));
        const nickname = result.nickname;
        setUserNickname(nickname);
        setIsPlatForm('Kakao');
        setIsLoding(false);
      })
      .catch(error => {
        console.log(`GetProfile Fail(code:${error.code})`, error.message);
      });
  };

  // 네이버 로그인
  const onNaverLoginHandler = () => {
    Alert.alert('준비중입니다.');
  };

  const logout = () => {
    setIsLogin(false);
    setIsPlatForm('');
    setAccessToken('');
    setIsLoding(true);
  };

  return {
    onKakaoLoginHandler,
    onGoogleLoginHandler,
    onNaverLoginHandler,
    logout,
  };
};
