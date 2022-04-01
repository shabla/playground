import db from "../data/db.json";

// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3001/',
//   timeout: 1000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

export const StatType = {
  Main: 'main',
  Offensive: 'offensive',
  Defensive: 'defensive',
  Base: 'base',
} as const;

export interface CharacterClass {
  id: number;
  name: string;
  level: number;
  base_stats: Record<string, number>;
  starting_gear?: number[];
}

export interface FullCharacterClass extends CharacterClass {
  items: OwnedItem[];
}

export interface OwnedItem {
  qty: number;
  itemId: number;
}

export interface Stat {
  id: string;
  name: string;
  description: string;
  type: string;
}

export interface Item {
  id: string;
  name: string;
}

export const fetchClasses = async (): Promise<CharacterClass[]> => {
  return Promise.resolve(db.classes as CharacterClass[]);
};

export const fetchStats = async (): Promise<Stat[]> => {
  return Promise.resolve(db.stats as Stat[]);
};

export const fetchItems = async (): Promise<Item[]> => {
  return Promise.resolve(db.stats as Item[]);
};
