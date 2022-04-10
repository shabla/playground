import React from "react";
import classnames from "classnames";

import { Page, Row, Column } from "@/components";
import { PoEAtlas } from "../components/PoEAtlas";
import { Step } from "../models";
import { steps } from "../steps";

import "./AtlasPage.scss";

export const AtlasPage: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState<Step | undefined>(steps[0]);

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    const index = e.currentTarget.getAttribute("data-index");
    const parsedIndex = index ? parseInt(index) : -1;
    const step = steps[parsedIndex];

    if (step) {
      setActiveStep(step);
    }
  };

  const getSocketedWatchStonesCount = (step: Step): number => {
    const { watchstones } = step;
    if (!watchstones) {
      return 0;
    }

    return Object.keys(watchstones).reduce((acc, regionId) => {
      return acc + watchstones[regionId];
    }, 0);
  };

  return (
    <Page title="Atlas Watchstones" direction="row" gap={10} className="atlas-page">
      <PoEAtlas watchstones={activeStep?.watchstones} />

      <Column>
        {steps.map((step, index) => (
          <Row
            key={index}
            data-index={index}
            className={classnames("step", { "selected": step === activeStep })}
            onMouseEnter={handleMouseOver}
          >
            <Column className="px-10 py-5" grow align="center">{step.desc}</Column>

            <Column
              className="total-col px-10 py-5"
              align="center center"
              shrink={false}
              grow={false}
              basis="200px"
            >
              <div className="font-semibold text-center">Socketed Watchstones</div>
              <div className="text-center">
                {getSocketedWatchStonesCount(step)} / {step.totalWatchstones}
              </div>
            </Column>
          </Row>
        ))}
      </Column>
    </Page>
  );
};