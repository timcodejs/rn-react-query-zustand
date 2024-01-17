import React, {useEffect, useRef} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {useIsFocused} from '@react-navigation/native';
import {Swipeable} from 'react-native-gesture-handler';
import Header from '../Components/Header';
import CommonInput from '../Components/CommonInput';
import SwipeableItem from '../Components/TodoSwipe/SwipeableItem';
import {hp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {PretendardBold} from '../Utility/utils/CustomFont';
import {TodoViewModel} from '../Business/services/TodoViewModel';
import {AllScreenList, TodoStackProps} from '../Navigation/NavigationProps';
import {useGetDataQuery} from '../Store/queries/todoQuery';

const Todo = ({navigation}: TodoStackProps<AllScreenList.Todo>) => {
  const isFocused = useIsFocused();
  const rowRef = useRef<Swipeable | null>(null);

  // query
  const {datas, refetch} = useGetDataQuery();
  const Model = TodoViewModel({refetch});

  useEffect(() => {
    if (isFocused && rowRef.current) {
      rowRef.current.close();
      rowRef.current = null;
    }
  }, [isFocused]);

  return (
    <TodoView>
      <Header navigation={navigation} bgColor={Color.white} />
      <PretendardBold
        size={hp(20)}
        style={{marginTop: hp(20), marginBottom: hp(20)}}
        children="할 일 목록 (feat.RNGH, Animated)"
      />
      {Model?.isEdit === false ? (
        <CommonInput
          text="할 일 등록"
          placeholderText="할 일을 입력해 주세요."
          btnStatus={Model?.isEdit}
          values={Model?.inputValue}
          onChange={(e: string) => Model?.handleChange(e)}
          onPress={() => Model?.handlePost()}
        />
      ) : (
        <CommonInput
          text="수정"
          placeholderText="할 일을 입력해 주세요."
          btnStatus={Model?.isEdit}
          values={Model?.inputValue}
          onChange={(e: string) => Model?.handleChange(e)}
          onPress={() => {
            Model?.onUpdateData.mutate();
            Model?.setIisEdit(false);
          }}
        />
      )}
      <TodoListWrap>
        <FlatList
          data={datas?.data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index): any => index.toString()}
          renderItem={({item}) => (
            <SwipeableItem
              item={item}
              model={Model}
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
          ListFooterComponent={() => <Line />}
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
  height: ${hp(740)}px;
  padding-bottom: ${hp(240)}px;
`;

const Line = styled.View`
  height: 1px;
  background-color: ${Color.gray};
`;
