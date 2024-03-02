import {AllScreenList} from '../../Navigation/NavigationProps';

export const menuList = [
  {
    navigates: AllScreenList.DragToClose,
    text: 'Drag To Close',
  },
  {
    navigates: AllScreenList.SwipeToClose,
    text: 'Swipe To Close',
  },
  {
    navigates: AllScreenList.SwipeCarousel,
    text: 'Swipe Carousel',
  },
  {
    navigates: AllScreenList.YoutubePlayer,
    text: 'Youtube',
  },
  {
    navigates: AllScreenList.WishList,
    text: 'Wish List',
  },
  {
    navigates: AllScreenList.DimensionsValue,
    text: 'Dimensions Value',
  },
  {
    navigates: AllScreenList.PushNoti,
    text: 'Push Notification',
  },
  {
    navigates: AllScreenList.IntlCommend,
    text: 'Intl API',
  },
  {
    navigates: AllScreenList.Camera,
    text: 'Camera',
  },
  {
    navigates: AllScreenList.Setting,
    text: 'Setting',
  },
  {
    navigates: AllScreenList.DynamicIsland,
    text: 'Dynamic Island',
  },
  {
    navigates: AllScreenList.RemoveBackGround,
    text: 'Remove BackGround',
  },
];

export const carouselListData = [
  {id: 1, image: require('../../Assets/images/slide1.jpeg')},
  {id: 2, image: require('../../Assets/images/slide2.jpeg')},
  {id: 3, image: require('../../Assets/images/slide3.jpeg')},
  {id: 4, image: require('../../Assets/images/slide4.jpeg')},
];

export const wishListData = [
  {
    id: 1,
    itemImage: require('../../Assets/images/gajiroc.png'),
    name: '[gajiroc] Donegal Tweed Coat',
    price: 975000,
    quantityLeft: 10,
    choiseCount: 0,
  },
  {
    id: 2,
    itemImage: require('../../Assets/images/hodie.png'),
    name: '[Champion TRUE TO ARCHIVES] HOODED SWEAT - SILVER GREY',
    price: 230000,
    quantityLeft: 8,
    choiseCount: 0,
  },
  {
    id: 3,
    itemImage: require('../../Assets/images/sweat.png'),
    name: '[Champion] Crewneck Sweatshirt - MoMA Edition(Oatmeal)',
    price: 100000,
    quantityLeft: 10,
    choiseCount: 0,
  },
  {
    id: 4,
    itemImage: require('../../Assets/images/levis.png'),
    name: '[LEVI’S] LVC 1955 501 Jean',
    price: 349000,
    quantityLeft: 35,
    choiseCount: 0,
  },
  {
    id: 5,
    itemImage: require('../../Assets/images/chino.png'),
    name: '[FULLCOUNT] U.S. ARMY CHINO 41 - KHAKI',
    price: 269000,
    quantityLeft: 40,
    choiseCount: 0,
  },
  {
    id: 6,
    itemImage: require('../../Assets/images/Blundstonse.png'),
    name: '[Blundstonse] Originals #500',
    price: 249000,
    quantityLeft: 70,
    choiseCount: 0,
  },
  {
    id: 7,
    itemImage: require('../../Assets/images/newbalance.png'),
    name: '[New Balance] MADE in USA 993 Core - Grey',
    price: 259000,
    quantityLeft: 100,
    choiseCount: 0,
  },
];

export const LINKING_OPTIONS = [
  {value: 'YOUTUBE', label: 'YOUTUBE'},
  {value: 'CAMERA', label: 'CAMERA'},
  {value: 'TODO', label: 'TODO'},
  {value: 'SCROLL', label: 'SCROLL'},
  {value: 'SEARCH', label: 'SEARCH'},
  {value: 'LOGIN', label: 'LOGIN'},
];
