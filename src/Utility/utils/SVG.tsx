import TodoSvg from '../../Assets/images/todo.svg';
import ScrollSvg from '../../Assets/images/scroll.svg';
import SocialSvg from '../../Assets/images/social.svg';
import SearchSvg from '../../Assets/images/search.svg';
import ResetSvg from '../../Assets/images/reset.svg';

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
