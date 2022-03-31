export const Intent = {
  None: undefined,
  Primary: 'primary',
  Secondary: 'secondary',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
} as const;

export type IntentType = typeof Intent[keyof typeof Intent];
