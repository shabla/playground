import React from 'react';

import { Intent, IntentType, InputSize, InputSizeType, } from '@/values';
import { Button, ButtonProps, Row, Column } from '@/components';

const intentOptions: { value: IntentType, label: string }[] = [
  { value: Intent.None, label: 'None' },
  { value: Intent.Primary, label: 'Primary' },
  { value: Intent.Secondary, label: 'Secondary' },
  { value: Intent.Success, label: 'Success' },
  { value: Intent.Warning, label: 'Warning' },
  { value: Intent.Danger, label: 'Danger' },
];
const sizes: unknown[] = [
  InputSize.xs,
  InputSize.sm,
  undefined,
  InputSize.lg,
  InputSize.xl,
];
const sections: { name: string, buttonProps: ButtonProps[] }[] = [
  {
    name: 'Normal',
    buttonProps: [
      { children: 'Button' },
      { children: 'Button', simple: true },
      { children: 'Button', disabled: true },
    ],
  },
  {
    name: 'Icon + Text',
    buttonProps: [
      { children: 'Button', icon: 'user' },
      { children: 'Button', icon: 'user', simple: true },
      { children: 'Button', icon: 'user', disabled: true },
    ],
  },
  {
    name: 'Icon Only',
    buttonProps: [
      { children: undefined, icon: 'user' },
      { children: undefined, icon: 'user', simple: true },
      { children: undefined, icon: 'user', disabled: true },
    ],
  },
];

export const ButtonExample: React.FC = () => {
  const [intent, setIntent] = React.useState<IntentType | undefined>(Intent.Primary);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <div className="ButtonExample">
      <Row className="mb-10" align="start center" gap={15}>
        {intentOptions.map(option => (
          <label htmlFor={option.value} key={option.value || 'none'}>
            <input
              type="radio"
              id={option.value}
              value={option.value}
              checked={intent === option.value}
              onChange={e => setIntent(e.currentTarget.value ? e.currentTarget.value as IntentType : undefined)}
              className="mr-5"
            />
            {option.label}
          </label>
        ))}

        <Button onClick={() => setIsLoading(value => !value)}>Toggle Loading</Button>
      </Row>

      {sections.map((section, sectionId) => (
        <Column gap={10} key={sectionId} className="mb-20">
          <h2 className="m-0">{section.name}</h2>

          {section.buttonProps.map((buttonProps, rowIndex) => (
            <Row gap={10} key={rowIndex}>
              {sizes.map((size, colIndex) => (
                <Column key={colIndex}>
                  <Button
                    intent={intent as IntentType}
                    size={size as InputSizeType}
                    loading={isLoading}
                    {...buttonProps}
                  />
                </Column>
              ))}
            </Row>
          ))}
        </Column>
      ))}
    </div>
  );
};
