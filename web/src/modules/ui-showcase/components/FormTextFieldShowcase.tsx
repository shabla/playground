import React from 'react';

import { FormTextField, Row, Column, Button } from '@/components';

export const FormTextFieldShowcase: React.FC = () => {
  const [showError, setShowError] = React.useState(false);

  const shortErrorMessage = 'this field is required';
  const longErrorMessage = 'this is a longer error message with more text because I want 2 lines';

  return (
    <Column gap={20}>
      <Row gap={20}>
        <Button onClick={() => setShowError(value => !value)} intent="primary">Toggle Error</Button>
      </Row>

      <h3>Row of block inputs</h3>
      <Row gap={20}>
        <FormTextField
          label="Test Label"
          required
          id="test"
          helperText="hello world"
          errorMessage={showError ? longErrorMessage : undefined}
        />
        <FormTextField
          label="Test Label"
          id="test"
          helperText="this is a form field"
          errorMessage={showError ? longErrorMessage : undefined}
        />
      </Row>

      <h3>Row of inline inputs</h3>
      <Row gap={20}>
        <FormTextField
          label="Test Label"
          id="test"
          inline
          helperText="hello world"
          errorMessage={showError ? longErrorMessage : undefined}
        />
        <FormTextField
          label="Test Label"
          id="test"
          required
          inline
          helperText="hello world beep boop im a robot"
          errorMessage={showError ? shortErrorMessage : undefined}
        />
      </Row>

      <h3>Row of inline inputs (no fill)</h3>
      <Row gap={20}>
        <FormTextField
          label="Test Label"
          id="test"
          inline
          helperText="hello world"
          inlineInputBasis="200px"
          errorMessage={showError ? longErrorMessage : undefined}
        />
        <FormTextField
          label="Test Label"
          id="test"
          required
          inline
          helperText="hello world beep boop im a robot"
          inlineInputBasis="200px"
          errorMessage={showError ? shortErrorMessage : undefined}
        />
      </Row>

      <h3>Column of inline inputs with fixed label widths</h3>
      <Column>
        <FormTextField
          label="Test Label"
          required
          id="test"
          inline
          inlineLabelBasis="200px"
          helperText="This is a long helper text to see what it does when it needs to wrap"
          errorMessage={showError ? shortErrorMessage : undefined}
        />
        <FormTextField
          label="Test Label"
          required
          id="test"
          inline
          inlineLabelBasis="200px"
          errorMessage={showError ? longErrorMessage : undefined}
        />
        <FormTextField
          label="Test Label"
          id="test"
          inline
          inlineLabelBasis="200px"
        />
      </Column>
    </Column>
  );
};

export default FormTextFieldShowcase;
