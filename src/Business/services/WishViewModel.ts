import {useCallback, useState} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {screenWidth, screenHeight} from '../../Utility/utils/UI';
import _ from 'lodash';

// data
import {wishListData} from '../../Utility/utils/constant';

export const WishViewModel = () => {
  const deepData = _.cloneDeep(wishListData); // 원본 데이터 딥카피
  const [deepWishListData, setDeepWishListData] = useState<any[]>(deepData); // 카피 데이터 상태 저장
  const [detailItem, setDetailItem] = useState<any>(); // 선택한 데이터
  const [itemCount, setItemCount] = useState<number>(0); // 선택한 데이터의 카운트
  const [wishListAllItem, setWishListAllItem] = useState<any[]>([]); // 장바구니 데이터
  const [wishListAllCount, setWishListAllCount] = useState<number>(0); // 장바구니 카운트

  const xPosition = useSharedValue(screenWidth);
  const yPosition = useSharedValue(screenHeight);

  // 더하기
  const increaseItemCount = useCallback((count: number, quantity: number) => {
    let num: number = 0;
    if (quantity > count) {
      num = count + 1;
      setItemCount(num);
    }
  }, []);

  // 빼기
  const decreaseItemCount = useCallback((count: number) => {
    let num: number = 0;
    if (count > 0) {
      num = count - 1;
      setItemCount(num);
    }
  }, []);

  // 장바구니에 담은 아이템 갯수
  const totalItemCount = useCallback(
    (id: number, count: number, key: string) => {
      let total: number = 0;
      setDeepWishListData((prev: any[]) => {
        const mappedData = prev.map((v: any) =>
          v.id !== id ? v : {...v, [key]: count},
        );

        mappedData.forEach((v: any) => {
          total += v[key];
        });
        const list = mappedData.filter((v: any) => v.choiseCount > 0);

        setWishListAllCount(total);
        setWishListAllItem(list);

        return mappedData;
      });
    },
    [],
  );

  // 장바구니에서 아이템 갯수 컨트롤
  const wishListEditCount = useCallback((props: any) => {
    let num: number = 0;
    let total: number = 0;
    let isDelete: boolean = false;
    let isMaximum: boolean = false;

    if (props.state === 'plus') {
      num = props.count + 1;

      if (num > props.quantity) {
        isMaximum = true;
      }
    } else if (props.state === 'minus') {
      num = props.count - 1;
      isMaximum = false;

      if (num === 0) {
        isDelete = true;
      }
    }

    setWishListAllItem((prev: any[]) => {
      if (isDelete === true) {
        const mappedData = prev.filter((v: any) => {
          return v.id !== props.id && v;
        });

        return mappedData;
      } else if (isMaximum === false) {
        const mappedData = prev.map((v: any) => {
          return v.id !== props.id ? v : {...v, [props.key]: num};
        });

        return mappedData;
      } else {
        return prev;
      }
    });

    setDeepWishListData((prev: any[]) => {
      if (isMaximum === false) {
        const mappedData = prev.map((v: any) =>
          v.id !== props.id ? v : {...v, [props.key]: num},
        );

        mappedData.forEach((v: any) => {
          total += v[props.key];
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
    detailItem,
    itemCount,
    wishListAllItem,
    wishListAllCount,
    xPosition,
    yPosition,
    setDetailItem,
    setItemCount,
    setWishListAllCount,
    increaseItemCount,
    decreaseItemCount,
    totalItemCount,
    wishListEditCount,
  };
};
