import React from 'react';

import { TextField, Row, Column, Button } from '@/components';

export const TextFieldShowcase: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <Column gap={20}>
      <Row gap={20}>
        <Button onClick={() => setLoading(value => !value)} intent="primary">Toggle Loading</Button>
      </Row>

      <TextField onChange={value => console.log(value)} placeholder="hello placeholder" loading={loading} />

      <Row gap={10}>
        <TextField leftIcon="user" placeholder="With left icon" loading={loading} />
        <TextField leftIcon="arrow-alt-circle-down" placeholder="With left icon" loading={loading} />
        <TextField leftIcon="angle-right" placeholder="With left icon" loading={loading} />
      </Row>

      <Row gap={10}>
        <TextField rightIcon="chevron-circle-down" placeholder="With right icon" loading={loading} />
        <TextField rightIcon="trash" placeholder="With right icon" loading={loading} />
        <TextField rightIcon="pen" placeholder="With right icon" loading={loading} />
      </Row>

      <Row gap={10}>
        <TextField leftIcon="spinner" rightIcon="chevron-circle-down" placeholder="With both icon" loading={loading} />
        <TextField leftIcon="spinner" rightIcon="trash" placeholder="With both icon" loading={loading} />
        <TextField leftIcon="spinner" rightIcon="pen" placeholder="With both icon" loading={loading} />
      </Row>
    </Column>
  );
};
