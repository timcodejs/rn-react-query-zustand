import React, {useRef} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';
import styled from 'styled-components/native';
import {hp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {IconResetIcon} from '../../Utility/utils/SVG';
import {PretendardRegular} from '../../Utility/utils/CustomFont';
import {useSearchStore} from '../../Store/stores/searchStore';
import BookList from './BookList';

const SearchList = ({handleReset}: any) => {
  const listRef = useRef(null);
  useScrollToTop(listRef);

  // store
  const {result} = useSearchStore();

  return (
    <Wrap>
      <Align>
        <PretendardRegular
          size={hp(15)}
          color={Color.eerieBlack}
          style={{marginBottom: hp(15)}}
          children={`총 ${result?.length ? result?.length : 0}개`}
        />
        <ResetButton>
          <TouchableOpacity
            onPress={handleReset}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconResetIcon
              height={15}
              width={15}
              style={{color: Color.eerieBlack}}
            />
            <PretendardRegular
              size={hp(15)}
              color={Color.eerieBlack}
              style={{marginLeft: hp(5)}}
              children="초기화"
            />
          </TouchableOpacity>
        </ResetButton>
      </Align>
      <List>
        {!result && (
          <PretendardRegular
            color={Color.darkCharcoal}
            style={{marginTop: hp(15)}}
            children="결과가 없습니다."
          />
        )}
        <FlatList
          ref={listRef}
          data={result}
          keyExtractor={(item, index): any => index.toString()}
          renderItem={({item}) => <BookList book={item} />}
          ListFooterComponent={() => <Line />}
        />
      </List>
    </Wrap>
  );
};

export default React.memo(SearchList);

const Wrap = styled.View`
  margin-top: ${hp(10)}px;
`;

const Align = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ResetButton = styled.View`
  margin-bottom: ${hp(15)}px;
`;

const List = styled.View`
  border: 1px solid ${Color.gray};
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;

const Line = styled.View`
  padding-bottom: ${hp(300)}px;
`;
