import { Entity } from "./Entity";

export interface Permission extends Entity {
  id: number;
  actor_id?: number;
  group_id?: number;
  action_id?: string;
  role_id?: number;
}