import {Source} from 'react-native-fast-image';

export interface WishListDataProps {
  id: number;
  itemImage: Source;
  name: string;
  price: number;
  quantityLeft: number;
  choiseCount: number;
}

export interface NotiProps {
  title: string;
  body: string;
  data: any;
}

export interface ScheduleNotiProps {
  title: string;
  body: string;
  data: any;
  month: number;
  day: number;
  hour: number;
  minute: number;
}
