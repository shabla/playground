import React from 'react';

import { ButtonGroup, Button } from '@/components';

export const ButtonGroupShowcase: React.FC = () => {
  return (
    <div className="mb-20">
      <ButtonGroup>
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
      <div className="mb-15" />
      <ButtonGroup>
        <Button intent="primary">Left</Button>
        <Button intent="primary">Middle</Button>
        <Button intent="primary">Middle</Button>
        <Button intent="primary">Right</Button>
      </ButtonGroup>
      <div className="mb-15" />
      <ButtonGroup>
        <Button simple>Left</Button>
        <Button simple>Middle</Button>
        <Button simple>Middle</Button>
        <Button simple>Right</Button>
      </ButtonGroup>
      <div className="mb-15" />
      <ButtonGroup>
        <Button disabled>Left</Button>
        <Button disabled>Middle</Button>
        <Button disabled>Middle</Button>
        <Button disabled>Right</Button>
      </ButtonGroup>
      <div className="mb-15" />
      <ButtonGroup>
        <Button icon="user" intent="primary">Left</Button>
        <Button icon="user" intent="primary">Middle</Button>
        <Button icon="user" intent="primary">Middle</Button>
        <Button icon="user" intent="primary">Right</Button>
      </ButtonGroup>
      <div className="mb-15" />
      <ButtonGroup>
        <Button icon="user" intent="primary" />
        <Button icon="user" intent="primary" />
        <Button icon="user" intent="primary" />
        <Button icon="user" intent="primary" />
      </ButtonGroup>
      <div className="mb-15" />
      <ButtonGroup>
        <Button intent="primary">Menu</Button>
        <Button icon="angle-down" intent="primary" />
      </ButtonGroup>
    </div>
  );
};

export default ButtonGroupShowcase;
