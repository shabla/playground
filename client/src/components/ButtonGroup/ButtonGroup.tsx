import React from 'react';

import './ButtonGroup.scss';

interface ButtonGroupProps {

}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children }) => {
  return (
    <div className="button-group row">{children}</div>
  );
};
