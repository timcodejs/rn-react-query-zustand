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
  Social = 'Social',
  Search = 'Search',
}

export enum BottomTabNameList {
  main = '할 일',
  first = '스크롤',
  second = '소셜 로그인',
  third = '검색',
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

export type SocialParamList = {
  [AllScreenList.Social]: {};
};

export type SearchParamList = {
  [AllScreenList.Search]: {};
};

export type TodoStackProps<T extends keyof TodoParamList> = NavigationProps &
  TodoParamList[T];

export type ScrollStackProps<T extends keyof ScrollParamList> =
  NavigationProps & ScrollParamList[T];

export type SocialStackProps<T extends keyof SocialParamList> =
  NavigationProps & SocialParamList[T];

export type SearchStackProps<T extends keyof SearchParamList> =
  NavigationProps & SearchParamList[T];
