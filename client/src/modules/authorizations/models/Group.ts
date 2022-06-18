import { Entity } from "./Entity";
import { Actor } from "./Actor";

export interface Group extends Entity {
  id: number;
  name: string;
  active: boolean;
  actor_ids: number[];
  actors?: Actor[];
}