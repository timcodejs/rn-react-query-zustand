import {Source} from 'react-native-fast-image';

export interface WishListDataProps {
  id: number;
  itemImage: Source;
  name: string;
  price: number;
  quantityLeft: number;
  choiseCount: number;
}
