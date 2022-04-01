import React, { useMemo } from 'react';
import classNames from 'classnames';

import { FlexDirectionType, FlexWrapType, FlexAlignType } from './FlexContainerValues';

import './FlexContainer.scss';

export interface FlexContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  direction: FlexDirectionType;
  basis?: string;
  order?: number;
  grow?: number | boolean;
  shrink?: number | boolean;
  wrap?: FlexWrapType | boolean;
  align?: FlexAlignType | `${FlexAlignType} ${FlexAlignType}`;
  gap?: number | `${number} ${number}`;
}

export const FlexContainer: React.FC<FlexContainerProps> = ({
  className,
  style,
  direction,
  basis,
  grow,
  shrink,
  order,
  wrap,
  align,
  gap,
  ...props
}) => {
  const containerStyle = useMemo((): React.CSSProperties => {
    let flexGrow: React.CSSProperties['flexGrow'];
    let flexShrink: React.CSSProperties['flexShrink'];
    let rowGap: React.CSSProperties['rowGap'];
    let columnGap: React.CSSProperties['columnGap'];

    if (grow != null) {
      flexGrow = typeof grow === 'boolean' ? 1 : grow;
    } else {
      // set grow to 0 if basis is present and grow is not specified
      flexGrow = basis != null ? 0 : undefined;
    }

    if (shrink != null) {
      flexShrink = typeof shrink === 'boolean' ? 1 : shrink;
    } else {
      // set shrink to 0 if grow is not specified
      flexShrink = basis != null ? 0 : undefined;
    }

    if (gap != null) {
      if (typeof gap === 'number') {
        rowGap = `${gap}px`;
        columnGap = `${gap}px`;
      } else {
        const [rowGapValue, columnGapValue] = gap.split(' ');

        if (rowGapValue) {
          rowGap = `${rowGapValue}px`;
        }

        if (columnGapValue) {
          columnGap = `${columnGapValue}px`;
        }
      }
    }

    return {
      ...style,
      order,
      flexBasis: basis,
      width: basis,
      flexGrow,
      flexShrink,
      rowGap,
      columnGap,
    };
  }, [style, basis, order, grow, shrink, align, gap]);

  const containerClassNames: string | undefined = useMemo(() => {
    const classNamesMap = {
      'd-flex': true,
      [`flex-${direction}`]: true,
      [`flex-${wrap}`]: typeof wrap === 'string' && wrap != null,
      'flex-wrap': typeof wrap === 'boolean' && wrap,
    };

    if (align != null) {
      const [main, cross] = align.split(' ');

      classNamesMap[`justify-content-${main}`] = main != null;
      classNamesMap[`align-items-${cross}`] = cross != null;
    }

    return classNames(className, classNamesMap);
  }, [className, align]);

  return (
    <div {...props} className={containerClassNames} style={containerStyle} />
  );
};

export const Row: React.FC<Omit<FlexContainerProps, 'direction'>> = props => {
  return <FlexContainer {...props} direction="row" />;
};

export const Column: React.FC<Omit<FlexContainerProps, 'direction'>> = props => {
  return <FlexContainer {...props} direction="column" />;
};

export default FlexContainer;
