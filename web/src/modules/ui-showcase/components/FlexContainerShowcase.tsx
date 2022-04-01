import React from 'react';

import { FlexContainer, Row, Column } from '@/components';

const boxStyle: React.CSSProperties = {
  width: 50,
  height: 50,
  background: 'gray',
};
const boxStyleFlex: React.CSSProperties = {
  height: 50,
  background: 'gray',
};

export const FlexContainerShowcase: React.FC = () => {
  const children = (
    <>
      <div style={boxStyle}>Box 1</div>
      <div style={boxStyle}>Box 2</div>
      <div style={boxStyle}>Box 3</div>
    </>
  );

  const childrenFlex = (
    <>
      <Column grow style={boxStyleFlex}>Box 1</Column>
      <Column grow style={boxStyleFlex}>Box 2</Column>
      <Column style={boxStyleFlex} basis="400px">Box 3</Column>
    </>
  );

  return (
    <Column gap={20}>
      <FlexContainer direction="row" gap={5} className="mb-5">
        {children}
      </FlexContainer>

      <FlexContainer gap={1} direction="column">
        {children}
      </FlexContainer>

      <Row align="space-evenly end" className="mb-10" style={{ height: 100, background: '#ccc' }}>
        {children}
      </Row>

      <Row align="space-around" gap={10} style={{ height: 100, background: '#ccc' }}>
        {childrenFlex}
      </Row>
    </Column>
  );
};