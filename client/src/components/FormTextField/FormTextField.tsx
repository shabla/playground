import React from 'react';
import classNames from 'classnames';

import {
  TextField,
  TextFieldProps,
  Column,
  FlexContainer,
  FlexContainerProps
} from '@/components';

export interface FormTextFieldProps extends TextFieldProps {
  label?: string;
  id: string;
  inline?: boolean;
  inlineLabelBasis?: string;
  inlineInputBasis?: string;
  helperText?: string;
  required?: boolean;
  errorMessage?: string;
  basis?: FlexContainerProps['basis'];
}

export const FormTextField: React.FC<FormTextFieldProps> = ({
  label,
  id,
  inline = false,
  inlineLabelBasis,
  inlineInputBasis,
  helperText,
  required,
  errorMessage,
  basis,
  ...textFieldProps
}) => {
  return (
    <FlexContainer
      direction={inline ? 'row' : 'column'}
      className={classNames('FormInput', { inline })}
      grow={inlineLabelBasis || inlineInputBasis ? 0 : 1}
      basis={basis}
    >
      <Column
        basis={inline ? inlineLabelBasis : undefined}
        shrink={0}
      >
        <label htmlFor={id}>
          {label}
          {required && <span className="required">*</span>}
          {helperText && !inline && <span className="helper-text">{helperText}</span>}
        </label>
        {helperText && inline && <span className="helper-text">{helperText}</span>}
      </Column>

      <Column
        basis={inline && inlineInputBasis ? inlineInputBasis : undefined}
        grow={inline && inlineInputBasis ? undefined : 1}
        shrink={0}
      >
        <TextField id={id} {...textFieldProps} />
        <Column align="start" className="error-message">{errorMessage}</Column>
      </Column>
    </FlexContainer>
  );
};
