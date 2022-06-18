import { Entity } from "./Entity";

export interface Actor extends Entity {
  id: number;
  name: string;
  active: boolean;
}