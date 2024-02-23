import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import {useIsFocused, useScrollToTop} from '@react-navigation/native';
import {Swipeable} from 'react-native-gesture-handler';
import Header from '../Components/Header';
import CommonInput from '../Components/CommonInput';
import SwipeableItem from '../Components/TodoSwipe/SwipeableItem';
import {hp, wp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {PretendardBold} from '../Utility/utils/CustomFont';
import {TodoViewModel} from '../Business/services/TodoViewModel';
import {AllScreenList, TodoStackProps} from '../Navigation/NavigationProps';
import {useGetDataQuery} from '../Store/queries/todoQuery';

import SharedDefaults from '../Business/services/SharedDefaults';

const Todo = ({navigation}: TodoStackProps<AllScreenList.Todo>) => {
  const isFocused = useIsFocused();
  const flatListRef = useRef<FlatList | null>(null);
  const rowRef = useRef<Swipeable | null>(null);

  useScrollToTop(flatListRef);

  // query
  const {datas, refetch} = useGetDataQuery();
  const Model = TodoViewModel({refetch});

  useEffect(() => {
    if (isFocused && rowRef.current) {
      rowRef.current.close();
      rowRef.current = null;
    }
  }, [isFocused]);

  useEffect(() => {
    SharedDefaults.set(datas?.data);
  }, [datas]);

  return (
    <View style={styles.view}>
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.avoid}>
        <FlatList
          ref={flatListRef}
          data={datas?.data}
          contentContainerStyle={{paddingBottom: 100}}
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
          ItemSeparatorComponent={() => <View style={styles.line} />}
          ListFooterComponent={() => <View style={styles.line} />}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  view: {
    height: hp(740),
    paddingHorizontal: wp(10),
    backgroundColor: Color.white,
  },
  avoid: {
    flex: 1,
  },
  line: {
    height: 1,
    backgroundColor: Color.gray,
  },
});
