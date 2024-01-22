import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../../Components/Header';
import HeadingText from '../../Components/HeadingText';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';
import {PretendardBold} from '../../Utility/utils/CustomFont';

const IntlCommend = ({
  navigation,
}: SwipeStackProps<AllScreenList.IntlCommend>) => {
  const dateIntl = (locales: string, opt: any) =>
    new Intl.DateTimeFormat(locales, opt);
  const numIntl = (locales: string, opt: any) =>
    new Intl.NumberFormat(locales, opt);

  const fullDate = dateIntl('ko', {dateStyle: 'full'}).format(new Date());
  const longDate = dateIntl('ko', {dateStyle: 'long'}).format(new Date());
  const mediumDate = dateIntl('ko', {dateStyle: 'medium'}).format(new Date());
  const shortDate = dateIntl('ko', {dateStyle: 'short'}).format(new Date());
  const fullTime = dateIntl('ko', {timeStyle: 'full'}).format(new Date());
  const longTime = dateIntl('ko', {timeStyle: 'long'}).format(new Date());
  const mediumTime = dateIntl('ko', {timeStyle: 'medium'}).format(new Date());
  const shortTime = dateIntl('ko', {timeStyle: 'short'}).format(new Date());
  const dateAtTime = dateIntl('ko', {
    dateStyle: 'full',
    timeStyle: 'full',
  }).format(new Date());
  const percent = numIntl('ko', {style: 'percent'}).format(0.7);
  const wonCur = numIntl('ko', {style: 'currency', currency: 'KRW'}).format(
    50000,
  );
  const usdCur = numIntl('en', {style: 'currency', currency: 'USD'}).format(
    40.56,
  );
  const kilo = numIntl('ko', {style: 'unit', unit: 'kilogram'}).format(50);
  const mPs = numIntl('en', {style: 'unit', unit: 'meter-per-second'}).format(
    1000,
  );
  const rtf = numIntl('ko', {notation: 'compact'}).format(30593195);

  return (
    <View style={styles.view}>
      <Header navigation={navigation} bgColor={Color.white} />
      <HeadingText
        navigation={navigation}
        text="Intl API"
        color={Color.black}
      />
      <PretendardBold style={styles.margin} children={fullDate} />
      <PretendardBold style={styles.margin} children={longDate} />
      <PretendardBold style={styles.margin} children={mediumDate} />
      <PretendardBold style={styles.margin} children={shortDate} />
      <PretendardBold style={styles.margin} children={fullTime} />
      <PretendardBold style={styles.margin} children={longTime} />
      <PretendardBold style={styles.margin} children={mediumTime} />
      <PretendardBold style={styles.margin} children={shortTime} />
      <PretendardBold style={styles.margin} children={dateAtTime} />
      <PretendardBold style={styles.margin} children={percent} />
      <PretendardBold style={styles.margin} children={wonCur} />
      <PretendardBold style={styles.margin} children={usdCur} />
      <PretendardBold style={styles.margin} children={kilo} />
      <PretendardBold style={styles.margin} children={mPs} />
      <PretendardBold style={styles.margin} children={rtf} />
    </View>
  );
};

export default IntlCommend;

const styles = StyleSheet.create({
  view: {
    height: hp(740),
    paddingHorizontal: wp(10),
    backgroundColor: Color.white,
  },
  margin: {
    marginBottom: 10,
  },
});
