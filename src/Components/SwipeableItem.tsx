import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {Swipeable} from 'react-native-gesture-handler';
import {hp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {PretendardBold} from '../Utility/utils/CustomFont';
import LeftActions from './LeftActions';
import RightActions from './RightActions';

interface SwipeableItemProps {
  item: any;
  index: number;
  onSwipeableOpenHandler: (ref: Swipeable | null) => void;
}

const SwipeableItem = ({
  item,
  index,
  onSwipeableOpenHandler,
}: SwipeableItemProps) => {
  const swipeableRef = useRef<Swipeable | null>(null);

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={dragX => LeftActions({dragX, index, swipeableRef})}
      renderRightActions={dragX => RightActions({dragX, index, swipeableRef})}
      onSwipeableWillOpen={() => onSwipeableOpenHandler(swipeableRef.current)}>
      <TodoListItem
        activeOpacity={1}
        underlayColor={Color.lightGray}
        onPress={() => onSwipeableOpenHandler(swipeableRef.current)}>
        <PretendardBold size={hp(17)} color={Color.darkCharcoal}>
          {item.title}
        </PretendardBold>
      </TodoListItem>
    </Swipeable>
  );
};

export default SwipeableItem;

const TodoListItem = styled.TouchableHighlight`
  height: ${hp(60)}px;
  justify-content: center;
  align-items: center;
  background-color: ${Color.white};
`;
