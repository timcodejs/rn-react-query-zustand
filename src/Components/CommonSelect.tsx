import React, {useState} from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';
import {wp, hp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {PretendardRegular, PretendardMedium} from '../Utility/utils/CustomFont';
import {
  IconSelectIcon,
  IconRadioOnIcon,
  IconRadioOffIcon,
} from '../Utility/utils/SVG';

interface CommonSelectProps {
  optionData?: any;
  placeholderText: string;
  values: any;
  setValues: (e: any) => void;
  disabled: boolean;
}

const CommonSelect = ({
  optionData,
  placeholderText,
  values,
  setValues,
  disabled,
}: CommonSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const FontColor = Color.black;
  const PopupBgColor = Color.white;

  return (
    <>
      <InputView
        onPress={() => (disabled ? setIsOpen(true) : {})}
        style={{
          width: wp(340),
          borderColor: Color.gray,
        }}>
        <PretendardRegular size={hp(14)} color={FontColor}>
          {values?.label ? values?.label : '선택해 주세요.'}
        </PretendardRegular>
        <IconSelectIcon
          width={wp(28)}
          height={hp(28)}
          style={{marginRight: hp(5)}}
        />
      </InputView>
      <Modal animationType="fade" transparent={true} visible={isOpen}>
        <Container onPress={() => setIsOpen(false)}>
          <SelectPopup
            showsVerticalScrollIndicator={false}
            style={{backgroundColor: PopupBgColor}}>
            <PretendardMedium
              size={hp(16)}
              color={FontColor}
              style={{marginBottom: hp(10)}}>
              {placeholderText}를 선택하세요.
            </PretendardMedium>
            {optionData?.map((item: any, idx: number) => {
              return (
                <Item
                  key={idx}
                  onPress={() => {
                    setIsOpen(false);
                    setValues(item);
                  }}>
                  {values?.value === item.value ? (
                    <IconRadioOnIcon
                      width={wp(16)}
                      height={hp(16)}
                      style={{marginRight: hp(6)}}
                    />
                  ) : (
                    <IconRadioOffIcon
                      width={wp(16)}
                      height={hp(16)}
                      style={{marginRight: hp(6)}}
                    />
                  )}
                  <PretendardRegular size={hp(14)} color={FontColor}>
                    {item.label}
                  </PretendardRegular>
                </Item>
              );
            })}
            <Void />
          </SelectPopup>
        </Container>
      </Modal>
    </>
  );
};

export default CommonSelect;

const InputView = styled.TouchableOpacity`
  height: ${hp(48)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: ${hp(5)}px;
  border: 1px solid ${Color.lightGray};
  color: ${Color.black};
  font-size: ${hp(14)}px;
  margin-bottom: ${hp(8)}px;
  padding-left: ${wp(10)}px;
`;

const Container = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

const SelectPopup = styled.ScrollView`
  max-height: ${hp(320)}px;
  padding: ${hp(30)}px ${hp(20)}px ${hp(50)}px ${hp(20)}px;
  border-top-left-radius: ${hp(20)}px;
  border-top-right-radius: ${hp(20)}px;
`;

const Item = styled.TouchableOpacity`
  padding: ${hp(10)}px 0;
  flex-direction: row;
  align-items: center;
`;

const Void = styled.View`
  margin-bottom: ${hp(60)}px;
`;
