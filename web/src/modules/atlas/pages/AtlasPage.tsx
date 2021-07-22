import React from "react";
import classnames from "classnames";

import { PageWithNavbar } from "components";
import { PoEAtlas } from "modules/atlas";
import { Step } from "../models";

import { steps } from "../steps";

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
        <PageWithNavbar title="Atlas Watchstones">
            <div className="flex">
                <PoEAtlas watchstones={activeStep?.watchstones} />

                <div className="flex flex-col ml-3 flex-grow">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            data-index={index}
                            className={classnames(
                                "border-green-600 border border-b-0 last:border-b flex justify-between",
                                {
                                    "bg-green-500 text-white": step === activeStep,
                                }
                            )}
                            onMouseEnter={handleMouseOver}
                        >
                            <div className="px-3 py-1">{step.desc}</div>
                            <div className="px-3 py-1 flex flex-col border-l border-green-600 w-48 flex-shrink-0">
                                <span className="font-semibold">Socketed Watchstones</span>
                                <div className="text-center">
                                    {getSocketedWatchStonesCount(step)} / {step.totalWatchstones}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageWithNavbar>
    );
};

export default AtlasPage;
