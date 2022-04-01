export const FlexDirection = {
  Row: 'row',
  RowReverse: 'row-reverse',
  Column: 'column',
  ColumnReverse: 'column-reverse',
} as const;

export type FlexDirectionType = typeof FlexDirection[keyof typeof FlexDirection];

export const FlexWrap = {
  NoWrap: 'nowrap',
  Wrap: 'wrap',
  WrapReverse: 'wrap-reverse',
} as const;

export type FlexWrapType = typeof FlexWrap[keyof typeof FlexWrap];

export const FlexAlign = {
  Start: 'start',
  End: 'end',
  Center: 'center',
  SpaceBetween: 'space-between',
  SpaceAround: 'space-around',
  SpaceEvenly: 'space-evenly',
} as const;

export type FlexAlignType = typeof FlexAlign[keyof typeof FlexAlign];
