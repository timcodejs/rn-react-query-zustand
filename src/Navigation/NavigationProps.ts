export type NavigationProps = {
  navigation: {
    navigate: (routeName: string, params?: any) => void;
    goBack: () => void;
    getParam: (param: string) => any;
    setParams: (params: any) => void;
    reset: (actions: any) => void;
    getParent: () => any;
    popToTop: () => void;
    pop: () => void;
    openDrawer: (params?: any) => void;
    closeDrawer: (params?: any) => void;
    addListener: (type?: string, fn?: (e: any) => void) => void;
  };
};

export enum AllScreenList {
  Todo = 'Todo',
  Scroll = 'Scroll',
  Search = 'Search',
  Social = 'Social',
  Swipe = 'Swipe',
  SwipeToClose = 'SwipeToClose',
  SwipeCarousel = 'SwipeCarousel',
  YoutubePlayer = 'YoutubePlayer',
  WishList = 'WishList',
  DragToClose = 'DragToClose',
  DimensionsValue = 'DimensionsValue',
  PushNoti = 'PushNoti',
  IntlCommend = 'IntlCommend',
}

export enum BottomTabNameList {
  main = '할 일',
  first = '스크롤',
  second = '책 검색',
  third = '스와이프',
  forth = '소셜 로그인',
}

//for useNavigation
export type RootStackParamList = {
  [key: string]: undefined;
};

export type TodoParamList = {
  [AllScreenList.Todo]: {};
};

export type ScrollParamList = {
  [AllScreenList.Scroll]: {};
};

export type SearchParamList = {
  [AllScreenList.Search]: {};
};

export type SwipeParamList = {
  [AllScreenList.Swipe]: {};
  [AllScreenList.SwipeToClose]: {route?: any};
  [AllScreenList.SwipeCarousel]: {route?: any};
  [AllScreenList.YoutubePlayer]: {route?: any};
  [AllScreenList.WishList]: {route?: any};
  [AllScreenList.DragToClose]: {route?: any};
  [AllScreenList.DimensionsValue]: {route?: any};
  [AllScreenList.PushNoti]: {route?: any};
  [AllScreenList.IntlCommend]: {route?: any};
};

export type SocialParamList = {
  [AllScreenList.Social]: {};
};

export type TodoStackProps<T extends keyof TodoParamList> = NavigationProps &
  TodoParamList[T];

export type ScrollStackProps<T extends keyof ScrollParamList> =
  NavigationProps & ScrollParamList[T];

export type SearchStackProps<T extends keyof SearchParamList> =
  NavigationProps & SearchParamList[T];

export type SwipeStackProps<T extends keyof SwipeParamList> = NavigationProps &
  SwipeParamList[T];

export type SocialStackProps<T extends keyof SocialParamList> =
  NavigationProps & SocialParamList[T];
