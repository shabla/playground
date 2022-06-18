import { Entity } from "./Entity";
import { Action } from "./Action";

export interface Role extends Entity {
  id: number;
  name: string;
  action_ids: string[];
  actions?: Action[];
}