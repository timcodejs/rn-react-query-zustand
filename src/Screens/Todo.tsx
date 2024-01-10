import React, {useRef} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {Swipeable} from 'react-native-gesture-handler';
import Header from '../Components/Header';
import CommonInput from '../Components/CommonInput';
import SwipeableItem from '../Components/SwipeableItem';
import {hp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {PretendardBold} from '../Utility/utils/CustomFont';
import {TodoViewModel} from '../Business/services/TodoViewModel';
import {AllScreenList, TodoStackProps} from '../Navigation/NavigationProps';

import data from '../Mocks/data.json';

const Todo = ({navigation}: TodoStackProps<AllScreenList.Todo>) => {
  const rowRef = useRef<Swipeable | null>(null);
  const todo = TodoViewModel();
  console.log('todo', todo);

  return (
    <TodoView>
      <Header navigation={navigation} />
      <PretendardBold
        size={hp(20)}
        style={{marginTop: hp(20), marginBottom: hp(20)}}>
        할 일 등록 (feat.RNGH, Animated)
      </PretendardBold>
      <CommonInput
        text="할 일 등록"
        placeholderText="할 일을 입력해 주세요."
        values={''}
        onChange={() => {}}
        onPress={() => {}}
      />
      <TodoListWrap>
        <FlatList
          data={data?.todos}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item): any => item.id}
          renderItem={({item, index}) => (
            <SwipeableItem
              item={item}
              index={index}
              onSwipeableOpenHandler={ref => {
                if (rowRef.current && ref !== rowRef.current) {
                  rowRef.current.close();
                  rowRef.current = null;
                }
                rowRef.current = ref;
              }}
            />
          )}
          ItemSeparatorComponent={() => <Line />}
        />
      </TodoListWrap>
    </TodoView>
  );
};

export default Todo;

const TodoView = styled.View`
  height: ${hp(740)}px;
  padding-left: ${hp(10)}px;
  padding-right: ${hp(10)}px;
  background-color: ${Color.white};
`;

const TodoListWrap = styled.View`
  padding-bottom: ${hp(240)}px;
`;

const Line = styled.View`
  height: 1px;
  background-color: ${Color.gray};
`;
