import React from 'react';
import {Text} from 'react-native';
import Header from '../Components/Header';
import {AllScreenList, TodoStackProps} from '@Navigation/NavigationProps';

const Todo = ({navigation}: TodoStackProps<AllScreenList.Todo>) => {
  return (
    <>
      <Header navigation={navigation} />
      <Text>Todo</Text>
    </>
  );
};

export default Todo;
