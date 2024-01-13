import React from 'react';
import {View, FlatList} from 'react-native';
import styled from 'styled-components/native';
import Header from '../Components/Header';
import {hp, wp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {useScrollInfiniteQuery} from '../Store/queries/scrollQuery';
import {PretendardRegular, PretendardBold} from '../Utility/utils/CustomFont';
import {AllScreenList, ScrollStackProps} from '../Navigation/NavigationProps';

const Scroll = ({navigation}: ScrollStackProps<AllScreenList.Scroll>) => {
  const {scrollData, fetchNextPage, isFetching, isFetchingNextPage} =
    useScrollInfiniteQuery();

  return (
    <Wrap>
      <Header navigation={navigation} bgColor={Color.white} />
      <View>
        <PretendardBold
          size={hp(20)}
          style={{marginTop: hp(20), marginBottom: hp(20)}}
          children="무한 스크롤 (feat.FlatList)"
        />
        <FlatList
          data={scrollData?.pages}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: any, index: number) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View key={index}>
                {item?.data?.items?.map((e: any, i: number) => {
                  return (
                    <View key={i} style={{marginBottom: hp(10)}}>
                      <PretendardBold
                        size={hp(16)}
                        style={{marginBottom: hp(5)}}
                        children={e.name}
                      />
                      <View
                        style={{
                          padding: hp(5),
                          borderRadius: hp(10),
                          backgroundColor: Color.navy,
                        }}>
                        <PretendardRegular
                          size={hp(16)}
                          color={Color.white}
                          children={e.description}
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          }}
          onEndReached={() => fetchNextPage()}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            <PretendardRegular
              style={{paddingBottom: hp(20)}}
              children={isFetchingNextPage && 'Loading more...'}
            />
          }
        />
      </View>
      <PretendardRegular
        children={
          isFetching && !isFetchingNextPage ? 'Background Updating...' : null
        }
      />
    </Wrap>
  );
};

export default Scroll;

const Wrap = styled.View`
  height: ${hp(740)}px;
  padding: 0 ${wp(10)}px ${hp(180)}px ${wp(10)}px;
  background-color: ${Color.white};
`;
