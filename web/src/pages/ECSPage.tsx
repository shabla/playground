import React, { useState, useEffect } from "react";

import { Page, Button } from "@/components";
import ecs, { Position } from "@/ecs";

interface ItemProps {
  entity: string;
}

const Item: React.FC<ItemProps> = ({ entity }) => {
  const handleItemClicked = () => {
    console.log(ecs.getComponents(entity));
  };

  const addType = () => {
    ecs.addComponent(entity, new Position());
  };

  return (
    <div onClick={handleItemClicked}>
      <span>Entity ID: {entity}</span>
      <button onClick={addType}>Add type</button>
    </div>
  );
};

export const ECSPage: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const entity = ecs.create();
    const posComponent = new Position();

    console.log(ecs.hasComponentOfType(entity, Position.name));
    console.log(ecs.hasComponent(entity, posComponent));

    ecs.addComponent(entity, posComponent);

    console.log(ecs.hasComponentOfType(entity, Position.name));
    console.log(ecs.hasComponent(entity, posComponent));
  }, []);

  const handleNewItem = () => {
    const id = ecs.createTagged("item");
    setItems([...items, id]);
  };

  return (
    <Page title="ECS">
      <Button onClick={handleNewItem}>New item</Button>

      {items.map((item) => (
        <Item key={item} entity={item} />
      ))}
    </Page>
  );
};

export default ECSPage;
