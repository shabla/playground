import { v4 as uuid } from "uuid";

import { Component } from "./components/Component";

type ComponentStore = Record<string, Component[]>;

class EntityManager {
    tagsFromId: Record<string, string[]> = {};
    idsFromTag: Record<string, string[]> = {};
    componentsStores: Record<string, ComponentStore> = {};

    create(): string {
        const id = uuid();
        return id;
    }

    createTagged(tag: string): string {
        const id = this.create();
        this.tagsFromId[id] = [tag];
        if (this.idsFromTag[tag]) {
            this.idsFromTag[tag].push(id);
        } else {
            this.idsFromTag[tag] = [id];
        }
        return id;
    }

    addComponent(entity: string, component: Component) {
        const componentClass = component.toString();
        let store = this.componentsStores[componentClass];
        if (!store) {
            store = {};
            this.componentsStores[componentClass] = store;
        }

        if (!store[entity]) {
            store[entity] = [component];
        } else if (!store[entity].includes(component)) {
            store[entity].push(component);
        }
    }

    hasComponentOfType(entity: string, componentClass: string): boolean {
        const store = this.componentsStores[componentClass];
        if (!store) {
            return false; // nobody has this component type
        }
        return store[entity] !== undefined && store[entity].length > 0;
    }

    hasComponent(entity: string, component: Component): boolean {
        const componentClass = component.toString();
        const store = this.componentsStores[componentClass];
        if (!store) {
            return false; // nobody has this component type
        }
        return store[entity] !== undefined && store[entity].includes(component);
    }

    getComponents(entity: string): Component[] {
        let components: Component[] = [];
        for (const key in this.componentsStores) {
            const store = this.componentsStores[key];
            if (store[entity]) {
                components = [...components, ...store[entity]];
            }
        }
        return components;
    }
}

export default new EntityManager();
