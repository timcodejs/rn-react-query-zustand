import React from 'react';
import FastImage from 'react-native-fast-image';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {
  PretendardBold,
  PretendardRegular,
} from '../../Utility/utils/CustomFont';
import {useAuthStore} from '../../Store/stores/authStore';

interface Props {
  model: any;
}

const UserForm = ({model}: Props) => {
  // store
  const {userNickname, userInfo, isPlatForm} = useAuthStore();

  return (
    <View>
      {isPlatForm === 'Google' && (
        <View>
          <FastImage style={styles.image} source={{uri: userInfo?.photoURL}} />
        </View>
      )}
      <PretendardBold
        size={wp(25)}
        color={Color.black}
        style={{marginBottom: hp(15)}}
        children={`환영합니다. ${userNickname}님.`}
      />
      <PretendardRegular
        size={wp(20)}
        color={Color.black}
        style={{marginBottom: hp(15)}}
        children={`${isPlatForm} 계정으로 로그인하셨습니다.`}
      />
      <View style={styles.btnAlign}>
        <TouchableOpacity style={styles.btn} onPress={model?.logout}>
          <PretendardBold
            size={wp(17)}
            color={Color.white}
            children="로그아웃"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserForm;

const styles = StyleSheet.create({
  image: {
    width: wp(100),
    height: hp(100),
    borderRadius: 100,
    marginBottom: hp(20),
  },
  btnAlign: {
    flexDirection: 'row',
  },
  btn: {
    width: wp(80),
    height: hp(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(5),
    marginRight: hp(10),
    backgroundColor: 'red',
  },
});
