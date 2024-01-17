import React from 'react';
import styled from 'styled-components/native';
import {Color} from '../Utility/utils/Color';
import {hp, wp} from '../Utility/utils/UI';
import {PretendardRegular} from '../Utility/utils/CustomFont';

interface CommonInputProps {
  text: string;
  placeholderText: string;
  values?: string;
  btnStatus: boolean;
  onChange: (e: string) => void;
  onPress: (e: any) => void;
}

const CommonInput = ({
  text,
  values,
  placeholderText,
  btnStatus,
  onChange,
  onPress,
}: CommonInputProps) => {
  return (
    <TodoInputView>
      <InputText
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
    </TodoInputView>
  );
};

export default CommonInput;

const TodoInputView = styled.View`
  flex-direction: row;
`;

const InputText = styled.TextInput`
  width: ${wp(255)}px;
  height: ${hp(50)}px;
  border-radius: ${wp(5)}px;
  border: 1px solid ${Color.gray};
  font-size: ${hp(14)}px;
  margin-bottom: ${hp(8)}px;
  margin-right: ${wp(5)}px;
  padding-left: ${wp(10)}px;
`;

const InputButton = styled.TouchableOpacity<{btnStatus: boolean}>`
  width: ${wp(80)}px;
  height: ${hp(50)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${wp(5)}px;
  background-color: ${props => (props.btnStatus ? Color.gray : Color.black)};
`;
