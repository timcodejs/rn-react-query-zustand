import {useCallback, useState} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {screenWidth, screenHeight} from '../../Utility/utils/UI';
import _ from 'lodash';

// data
import {wishListData} from '../../Utility/utils/constant';

export const WishViewModel = () => {
  const deepData = _.cloneDeep(wishListData);
  const [deepWishListData, setDeepWishListData] = useState<any[]>(deepData);
  const [detailItem, setDetailItem] = useState<any>();
  const [itemCount, setItemCount] = useState<number>(0);
  const [wishListAllItem, setWishListAllItem] = useState<any[]>([]);
  const [wishListAllCount, setWishListAllCount] = useState<number>(0);

  const xPosition = useSharedValue(screenWidth);
  const yPosition = useSharedValue(screenHeight);

  // 더하기
  const increaseItemCount = useCallback(
    (id: number, count: number, quantity: number, key: string) => {
      let num: number = 0;
      if (quantity > count) {
        num = count + 1;
        setDeepWishListData((prev: any[]) => {
          const mappedData = prev.map((v: any) =>
            v.id !== id ? v : {...v, [key]: num},
          );

          return mappedData;
        });
        setItemCount(num);
      }
    },
    [],
  );

  // 빼기
  const decreaseItemCount = useCallback(
    (id: number, count: number, key: string) => {
      let num: number = 0;
      if (count > 0) {
        num = count - 1;
        setDeepWishListData((prev: any[]) => {
          const mappedData = prev.map((v: any) =>
            v.id !== id ? v : {...v, [key]: num},
          );

          return mappedData;
        });
        setItemCount(num);
      }
    },
    [],
  );

  // 장바구니에 담은 아이템 갯수
  const totalItemCount = useCallback(
    (key: string) => {
      let total: number = 0;
      deepWishListData.forEach((v: any) => {
        total += v[key];
      });
      const list = deepWishListData.filter((v: any) => v.choiseCount > 0);
      setWishListAllCount(total);
      setWishListAllItem(list);
    },
    [deepWishListData],
  );

  // 장바구니에서 아이템 갯수 컨트롤
  const wishListEditCount = useCallback((params: any) => {
    let num: number = 0;
    let total: number = 0;
    let isDelete: boolean = false;
    let isMaximum: boolean = false;

    if (params.state === 'plus') {
      num = params.count + 1;

      if (num > params.quantity) {
        isMaximum = true;
      }
    } else if (params.state === 'minus') {
      num = params.count - 1;
      isMaximum = false;

      if (num === 0) {
        isDelete = true;
      }
    }

    setWishListAllItem((prev: any[]) => {
      if (isDelete === true) {
        const mappedData = prev.filter((v: any) => {
          return v.id !== params.id && v;
        });

        return mappedData;
      } else if (isMaximum === false) {
        const mappedData = prev.map((v: any) => {
          return v.id !== params.id ? v : {...v, [params.key]: num};
        });

        return mappedData;
      } else {
        return prev;
      }
    });
    setDeepWishListData((prev: any[]) => {
      if (isMaximum === false) {
        const mappedData = prev.map((v: any) =>
          v.id !== params.id ? v : {...v, [params.key]: num},
        );

        mappedData.forEach((v: any) => {
          total += v[params.key];
        });
        setWishListAllCount(total);

        return mappedData;
      } else {
        return prev;
      }
    });
  }, []);

  return {
    deepWishListData,
    wishListAllCount,
    detailItem,
    itemCount,
    xPosition,
    yPosition,
    wishListAllItem,
    setDetailItem,
    setItemCount,
    setWishListAllCount,
    increaseItemCount,
    decreaseItemCount,
    totalItemCount,
    wishListEditCount,
  };
};
