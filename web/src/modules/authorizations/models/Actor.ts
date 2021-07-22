import { Entity } from "./Entity";

export interface Actor extends Entity {
    id: number;
    name: string;
    active: boolean;
}

export interface Group extends Entity {
    id: number;
    name: string;
    active: boolean;
    actor_ids: number[];
    actors?: Actor[];
}

export interface Action extends Entity {
    id: string;
}

export interface Role extends Entity {
    id: number;
    name: string;
    action_ids: string[];
    actions?: Action[];
}

export interface Permission extends Entity {
    id: number;
    actor_id?: number;
    group_id?: number;
    action_id?: string;
    role_id?: number;
}