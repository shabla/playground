import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/free-solid-svg-icons';

import { Row } from '@/components';
import { InputSizeType } from '@/values';

import './TextField.scss';

export interface TextFieldProps extends Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {
  className?: string;
  type?: 'text' | 'password';
  size?: InputSizeType;
  value?: string | number;
  leftIcon?: IconName;
  rightIcon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  autoComplete?: boolean;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField: React.FC<TextFieldProps> = ({
  className,
  type = 'text',
  size = 'md',
  value,
  leftIcon,
  rightIcon,
  loading,
  disabled,
  autoComplete,
  onChange,
  ...props
}) => {
  if (loading) {
    rightIcon = 'spinner';
  }

  return (
    <Row
      align="start center"
      className={classNames('input-container', {
        [`input-container--${size}`]: !!size,
        'left-icon': leftIcon,
        'right-icon': rightIcon,
      })}
    >
      {leftIcon && <FontAwesomeIcon icon={leftIcon} />}

      <input
        className={classNames('text-field', className)}
        type={type}
        value={value}
        onChange={onChange && (e => onChange(e.currentTarget.value, e))}
        autoComplete={!autoComplete ? "new-password" : undefined}
        disabled={disabled || loading}
        {...props}
      />

      {rightIcon && <FontAwesomeIcon icon={rightIcon} spin={loading} />}
    </Row>
  );
};
