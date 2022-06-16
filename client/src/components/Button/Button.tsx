import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/free-solid-svg-icons';

import { IntentType, InputSizeType } from '@/values';

import './Button.scss';

// Icons here: https://fontawesome.com/v5.15/icons?d=gallery&p=2&s=solid&m=free

export interface ButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'size'> {
  type?: 'button' | 'submit'
  size?: InputSizeType;
  intent?: IntentType
  className?: string;
  disabled?: boolean;
  simple?: boolean;
  icon?: IconName;
  loading?: boolean;
  fill?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  type = 'button',
  size = 'md',
  intent = 'secondary',
  fill,
  simple = false,
  disabled = false,
  loading = false,
  icon,
  onClick,
  ...props
}) => {
  return (
    <button
      className={classNames('button', className, {
        [`intent-${intent}`]: !!intent,
        [`size-${size}`]: !!size,
        'no-bg': !!simple,
        'icon-only': children === undefined,
        'has-icon': icon !== undefined,
        'fill': fill,
        'disabled': disabled || loading,
        'loading': loading,
      })}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {loading
        ? <FontAwesomeIcon icon="spinner" spin />
        : icon && <FontAwesomeIcon icon={icon} />}

      {children}
    </button>
  );
};