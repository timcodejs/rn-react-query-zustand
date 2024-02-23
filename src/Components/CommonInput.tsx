import React, {forwardRef} from 'react';
import styled from 'styled-components/native';
import {Color} from '../Utility/utils/Color';
import {hp, wp} from '../Utility/utils/UI';
import {PretendardRegular} from '../Utility/utils/CustomFont';
import {StyleSheet, TextInput, View} from 'react-native';

interface CommonInputProps {
  text: string;
  placeholderText: string;
  values?: string;
  btnStatus: boolean;
  onChange: (e: string) => void;
  onPress: (e: any) => void;
}

const CommonInput = forwardRef<TextInput, CommonInputProps>(
  ({text, values, placeholderText, btnStatus, onChange, onPress}, ref) => {
    return (
      <View style={styles.view}>
        <TextInput
          ref={ref}
          style={styles.input}
          placeholder={placeholderText}
          placeholderTextColor={Color.gray}
          value={values}
          onChangeText={(text: string) => onChange(text)}
        />
        <InputButton onPress={onPress} btnStatus={btnStatus}>
          <PretendardRegular
            size={hp(15)}
            color={Color.white}
            style={{}}
            children={text}
          />
        </InputButton>
      </View>
    );
  },
);

export default CommonInput;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
  input: {
    width: wp(255),
    height: hp(50),
    borderRadius: wp(5),
    borderColor: Color.gray,
    borderWidth: 1,
    fontSize: hp(14),
    marginBottom: hp(8),
    marginRight: wp(5),
    paddingLeft: wp(10),
  },
});

const InputButton = styled.TouchableOpacity<{btnStatus: boolean}>`
  width: ${wp(80)}px;
  height: ${hp(50)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${wp(5)}px;
  background-color: ${props => (props.btnStatus ? Color.gray : Color.black)};
`;
