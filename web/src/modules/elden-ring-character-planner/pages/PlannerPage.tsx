import React from "react";

import { Page } from "@/components";
import { CharacterPlanner } from '../components/CharacterPlanner/CharacterPlanner';

export const PlannerPage: React.FC = () => {
  return (
    <Page title="Elden Ring Character Planner">
      <CharacterPlanner />
    </Page>
  );
};