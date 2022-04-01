import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Row, Column, TextField, Button } from '@/components';
import {
  FullCharacterClass,
  OwnedItem,
  Stat, fetchClasses, fetchStats, fetchItems, Item,
} from '../../api/api';
import { getTargetLevel } from '../../utils';
import { ClassSelector } from '../ClassSelector/ClassSelector';

import './CharacterPlanner.scss';

const STAT_NAME_COL_SIZE = '100px';
const STAT_INPUT_COL_SIZE = '50px';
const STAT_EXTRA_COL_SIZE = '40px';

export const CharacterPlanner: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [classes, setClasses] = useState<readonly FullCharacterClass[]>([]);
  const [stats, setStats] = useState<readonly Stat[]>([]);
  const [selectedClass, setSelectedClass] = useState<FullCharacterClass>();
  const [desiredStats, setDesiredStats] = useState<Record<string, number>>({});
  const [itemsById, setItemsById] = useState<Record<string, Item>>({});

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetchClasses(),
      fetchStats().then(stats => setStats(stats)),
      fetchItems().then(items => {
        const byId = items.reduce((acc, item) => {
          acc[item.id] = item;

          return acc;
        }, {} as Record<string, Item>);

        setItemsById(byId);
      }),
    ])
      .then(([classes, stats, items]) => {
        const fullClasses = classes.reduce((acc, playerClass) => {
          const ownedItem: Record<string, OwnedItem> = {};
          playerClass.starting_gear?.forEach(itemId => {
            if (!ownedItem[itemId]) {
              ownedItem[itemId] = {
                qty: 0,
                itemId,
              };
            }

            ownedItem[itemId].qty += 1;
          });

          const fullClass: FullCharacterClass = {
            ...playerClass,
            items: Object.keys(ownedItem).map(itemId => ownedItem[itemId]),
          };

          acc.push(fullClass);

          return acc;
        }, [] as FullCharacterClass[]);

        setSelectedClass(fullClasses[0]);
        setClasses(fullClasses);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDesiredStatChanged = (statId: string, newValue: string): void => {
    const intValue = newValue === '' ? NaN : parseInt(newValue, 10);

    setDesiredStats(current => ({ ...current, [statId]: intValue }));
  };

  const handleDesiredStatBlured = (statId: string, fieldValue: string): void => {
    const intValue = parseInt(fieldValue, 10);
    const minValue = selectedClass!.base_stats[statId];
    const newValues = { ...desiredStats };

    // done editing the field, cleanup the value
    if (fieldValue === '' || intValue <= minValue) {
      delete newValues[statId];
      setDesiredStats(newValues);
    }
  };

  const handleReset = () => {
    setDesiredStats({});
  };

  const getDesiredFieldValue = (statId: string): string | number => {
    const value = desiredStats[statId];
    const hasUserValue = value != null;
    const isNaN = Number.isNaN(value);

    // No user value, display the base value
    if (!hasUserValue) return selectedClass!.base_stats[statId];

    // Invalid input, display an empty string
    if (isNaN) return '';

    // Value is valid
    return value;
  };

  const getTotalExtraPoints = (statId: string): React.ReactNode => {
    const base = selectedClass!.base_stats[statId];
    const target = desiredStats[statId];
    const value = target - base;

    if (value > 0) {
      return <b>+{value}</b>;
    }
  };

  if (loading) {
    return null;
  }

  return (
    <Column className="character-planner p-20" gap={10}>

      <h2>Elden Ring Character Planner</h2>

      <Row gap={10}>
        <ClassSelector
          classes={classes}
          selectedClassId={selectedClass?.id || -1}
          desiredStats={desiredStats}
          onClassChanged={setSelectedClass}
        />

        <Row gap={10}>
          <Column className="build-box p-10" gap={10}>
            <Row gap={10} style={{ fontSize: 12 }}>
              <Column className="text-center" basis={STAT_INPUT_COL_SIZE} style={{ marginLeft: `calc(${STAT_NAME_COL_SIZE} + 10px)` }}>
                Base
              </Column>
              <Column className="text-center" basis={STAT_INPUT_COL_SIZE}>
                Target
              </Column>
            </Row>

            {stats
              .filter(stat => stat.type === 'attribute')
              .map(stat => {
                return (
                  <Row gap={10} align="start center" key={stat.name}>
                    <Column basis={STAT_NAME_COL_SIZE}>
                      <label htmlFor={`input-${stat.id}`}>{stat.name}</label>
                    </Column>

                    <Column basis={STAT_INPUT_COL_SIZE}>
                      <TextField
                        value={selectedClass?.base_stats[stat.id] || 0}
                        disabled
                        className="text-center"
                      />
                    </Column>

                    <Column basis={STAT_INPUT_COL_SIZE}>
                      <TextField
                        value={getDesiredFieldValue(stat.id)}
                        className={classNames('text-center', {
                          'user-defined': desiredStats[stat.id],
                        })}
                        id={`input-${stat.id}`}
                        onChange={value => handleDesiredStatChanged(stat.id, value)}
                        onBlur={e => handleDesiredStatBlured(stat.id, e.currentTarget.value)}
                      />
                    </Column>

                    <Column basis={STAT_EXTRA_COL_SIZE}>
                      {getTotalExtraPoints(stat.id)}
                    </Column>
                  </Row>
                );
              })}

            <Row gap={10}>
              <Column basis={STAT_NAME_COL_SIZE}>
                <b>Level</b>
              </Column>

              <Column basis={STAT_INPUT_COL_SIZE} className="text-center">
                <b>{selectedClass && getTargetLevel(selectedClass.level, selectedClass.base_stats, selectedClass.base_stats)}</b>
              </Column>

              <Column basis={STAT_INPUT_COL_SIZE} className="text-center">
                <b>{selectedClass && getTargetLevel(selectedClass.level, selectedClass.base_stats, desiredStats)}</b>

                <Button size="xs" className="mt-5" intent="primary" onClick={handleReset}>
                  Reset
                </Button>
              </Column>
            </Row>
          </Column>

          <Column className="p-10">
            <h2>Starting gear</h2>

            <Column gap={5}>
              {selectedClass?.items.map(item => {
                return (
                  <div key={item.itemId}>
                    {item.qty}x <span className="tooltip-target">{itemsById[item.itemId].name}</span>
                  </div>
                );
              })}
            </Column>
          </Column>
        </Row>
      </Row>

    </Column>
  );
};
