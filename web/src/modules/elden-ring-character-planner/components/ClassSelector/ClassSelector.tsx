import React from 'react';
import classNames from 'classnames';

import { Column } from '@/components';
import { FullCharacterClass } from '../../api/api';
import { getTargetLevel } from '../../utils';

import './ClassSelector.scss';

export interface ClassSelectorProps {
  classes: readonly FullCharacterClass[],
  selectedClassId: number;
  desiredStats: Record<string, number>;
  onClassChanged: (newClass: FullCharacterClass) => void;
}

export const ClassSelector: React.FC<ClassSelectorProps> = ({
  classes,
  selectedClassId,
  desiredStats,
  onClassChanged,
}) => {
  return (
    <Column className="class-selector" gap={10}>
      {classes.map(characterClass => {
        const selected = characterClass.id === selectedClassId;
        return (
          <Column className={classNames('class-option', { selected })} key={characterClass.name} gap={5}>
            <label className="px-15 py-10">
              <input
                type="radio"
                className="mr-5"
                checked={selected}
                onChange={() => onClassChanged(characterClass)}
              />
              {characterClass.name}
              <br />
              <span style={{ fontSize: 12 }}>
                Level: {getTargetLevel(characterClass.level, characterClass.base_stats, desiredStats)}
              </span>
            </label>
          </Column>
        );
      })}
    </Column>
  );
};
