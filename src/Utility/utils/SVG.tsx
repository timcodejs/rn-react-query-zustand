import TodoSvg from '../../Assets/images/todo.svg';
import ScrollSvg from '../../Assets/images/scroll.svg';
import SocialSvg from '../../Assets/images/social.svg';
import SearchSvg from '../../Assets/images/search.svg';
import SwipeSvg from '../../Assets/images/swipe.svg';
import ResetSvg from '../../Assets/images/reset.svg';
import ArrowSvg from '../../Assets/images/arrow.svg';
import CrossSvg from '../../Assets/images/cross.svg';
import CartSvg from '../../Assets/images/cart.svg';
import MinusSvg from '../../Assets/images/minus.svg';
import PlusSvg from '../../Assets/images/plus.svg';

type IconProps = {
  width: number;
  height: number;
  color?: string | undefined;
  rotate?: string | undefined;
  style?: React.CSSProperties | any | undefined;
};

export const IconTodoIcon = (IconProps: IconProps) => {
  return (
    <TodoSvg
      width={IconProps.width}
      height={IconProps.height}
      color={IconProps.color}
      style={IconProps.style}
    />
  );
};

export const IconScrollIcon = (IconProps: IconProps) => {
  return (
    <ScrollSvg
      width={IconProps.width}
      height={IconProps.height}
      color={IconProps.color}
      style={IconProps.style}
    />
  );
};

export const IconScoialIcon = (IconProps: IconProps) => {
  return (
    <SocialSvg
      width={IconProps.width}
      height={IconProps.height}
      color={IconProps.color}
      style={IconProps.style}
    />
  );
};

export const IconSearchIcon = (IconProps: IconProps) => {
  return (
    <SearchSvg
      width={IconProps.width}
      height={IconProps.height}
      color={IconProps.color}
      style={IconProps.style}
    />
  );
};

export const IconSwipeIcon = (IconProps: IconProps) => {
  return (
    <SwipeSvg
      width={IconProps.width}
      height={IconProps.height}
      color={IconProps.color}
      style={IconProps.style}
    />
  );
};

export const IconResetIcon = (IconProps: IconProps) => {
  return (
    <ResetSvg
      width={IconProps.width}
      height={IconProps.height}
      color={IconProps.color}
      style={IconProps.style}
    />
  );
};

export const IconArrowIcon = (IconProps: IconProps) => {
  return (
    <ArrowSvg
      width={IconProps.width}
      height={IconProps.height}
      color={IconProps.color}
      style={IconProps.style}
    />
  );
};

export const IconCrossIcon = (IconProps: IconProps) => {
  return (
    <CrossSvg
      width={IconProps.width}
      height={IconProps.height}
      color={IconProps.color}
      style={IconProps.style}
    />
  );
};

export const IconCartIcon = (IconProps: IconProps) => {
  return (
    <CartSvg
      width={IconProps.width}
      height={IconProps.height}
      color={IconProps.color}
      style={IconProps.style}
    />
  );
};

export const IconPlusIcon = (IconProps: IconProps) => {
  return (
    <PlusSvg
      width={IconProps.width}
      height={IconProps.height}
      color={IconProps.color}
      style={IconProps.style}
    />
  );
};

export const IconMinusIcon = (IconProps: IconProps) => {
  return (
    <MinusSvg
      width={IconProps.width}
      height={IconProps.height}
      color={IconProps.color}
      style={IconProps.style}
    />
  );
};
