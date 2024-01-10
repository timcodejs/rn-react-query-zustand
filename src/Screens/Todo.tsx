import React from 'react';
import styled from 'styled-components/native';
import Header from '../Components/Header';
import CommonInput from '../Components/CommonInput';
import {Color} from '../Utility/utils/Color';
import {hp} from '../Utility/utils/UI';
import {PretendardBold} from '../Utility/utils/CustomFont';
import {AllScreenList, TodoStackProps} from '../Navigation/NavigationProps';
// import {TodoViewModel} from '../Business/services/TodoViewModel';

const Todo = ({navigation}: TodoStackProps<AllScreenList.Todo>) => {
  // const todo = TodoViewModel();
  return (
    <TodoView>
      <Header navigation={navigation} />
      <PretendardBold
        size={hp(20)}
        style={{marginTop: hp(20), marginBottom: hp(20)}}>
        할 일 등록
      </PretendardBold>
      <CommonInput
        text="할 일 등록"
        placeholderText="할 일을 입력해 주세요."
        values={''}
        onChange={() => {}}
        onPress={() => {}}
      />
    </TodoView>
  );
};

export default Todo;

const TodoView = styled.ScrollView`
  height: ${hp(740)}px;
  padding-left: ${hp(10)}px;
  padding-right: ${hp(10)}px;
  background-color: ${Color.white};
`;
