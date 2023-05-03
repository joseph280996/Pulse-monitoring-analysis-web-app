import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { CSSProperties, MouseEventHandler } from 'react';

export interface IButtonProps {
  type?: 'button' | 'reset' | 'submit';
  text?: string;
  disabled?: boolean;
  className?: string;
  wrapperClassName?: string;
  isSubmitting?: boolean;
}

export interface IButtonWithIconProps extends IButtonProps {
  primary?: boolean;
  icon?: IconProp;
  iconPosition?: string;
  iconClassName?: string;
  iconWrapperClassName?: string;
  buttonTextClassName?: string;
  onClick?: MouseEventHandler;
  iconStyle?: CSSProperties;
}

