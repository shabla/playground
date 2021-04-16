import React from "react";
import classnames from "classnames";

import { PageWithNavbar } from "components";
import { PoEAtlas, RegionId } from "modules/atlas";

interface Step {
    desc: string;
    watchstones?: Record<string, number>;
    totalWatchstones: number;
}

const steps: Step[] = [
    { desc: "Kill a conqueror in a corner of the atlas.", totalWatchstones: 1 },
    {
        desc:
            "Put first watchstone in Valdo's Rest. While you kill the other conquerors, you should get maps there. Don't run them yet.",
        watchstones: {
            [RegionId.ValdosRest]: 1,
        },
        totalWatchstones: 1,
    },
    {
        desc: "Kill 2 other conquerors from the other corners.",
        watchstones: {
            [RegionId.ValdosRest]: 1,
        },
        totalWatchstones: 3,
    },
    {
        desc: "Put those 2 new watchstones in Lex Proxima.",
        watchstones: {
            [RegionId.ValdosRest]: 1,
            [RegionId.LexProxima]: 2,
        },
        totalWatchstones: 3,
    },
    {
        desc: "Kill the last corner conqueror",
        watchstones: {
            [RegionId.ValdosRest]: 1,
            [RegionId.LexProxima]: 2,
        },
        totalWatchstones: 4,
    },
    {
        desc:
            "Start doing maps in Valdo's Rest exclusively until the conqueror spawn and kill him. While you're doing maps here, you should start to get map drops from Lex Proxima, don't run them yet.",
        watchstones: {
            [RegionId.ValdosRest]: 1,
            [RegionId.LexProxima]: 2,
        },
        totalWatchstones: 5,
    },
    {
        desc:
            "Keep running maps in Valdo's Rest exclusively until you've killed the 4 different conquerors there.",
        watchstones: {
            [RegionId.ValdosRest]: 1,
            [RegionId.LexProxima]: 2,
        },
        totalWatchstones: 8,
    },
    {
        desc: "Put 3 watchstones in Tirn's End.",
        watchstones: {
            [RegionId.ValdosRest]: 1,
            [RegionId.LexProxima]: 2,
            [RegionId.TirnsEnd]: 3,
        },
        totalWatchstones: 8,
    },
    {
        desc:
            "Start doing maps in Lex Proxima exclusively until the next conqueror spawn and kill him. While you're doing maps here, you should start to get map drops from Tirn's End, don't run them yet.",
        watchstones: {
            [RegionId.ValdosRest]: 1,
            [RegionId.LexProxima]: 2,
            [RegionId.TirnsEnd]: 3,
        },
        totalWatchstones: 9,
    },
    {
        desc:
            "Keep running maps in Lex Proxima exclusively until you've killed the 4 different conquerors there.",
        watchstones: {
            [RegionId.ValdosRest]: 1,
            [RegionId.LexProxima]: 2,
            [RegionId.TirnsEnd]: 3,
        },
        totalWatchstones: 12,
    },
    {
        desc: "Put 4 watchstones in Glennarch Cairns.",
        watchstones: {
            [RegionId.ValdosRest]: 1,
            [RegionId.LexProxima]: 2,
            [RegionId.TirnsEnd]: 3,
            [RegionId.GlennachCairns]: 4,
        },
        totalWatchstones: 12,
    },
    {
        desc:
            "Start doing maps in Tirn's End until the conqueror spawn and kill him. While you're doing maps here, you should start to get map drops from Glennarch Cairns, don't run them yet.",
        watchstones: {
            [RegionId.ValdosRest]: 1,
            [RegionId.LexProxima]: 2,
            [RegionId.TirnsEnd]: 3,
            [RegionId.GlennachCairns]: 4,
        },
        totalWatchstones: 13,
    },
    {
        desc:
            "Keep running maps in Tirn's End exclusively until you've killed the 4 different conquerors there.",
        watchstones: {
            [RegionId.ValdosRest]: 1,
            [RegionId.LexProxima]: 2,
            [RegionId.TirnsEnd]: 3,
            [RegionId.GlennachCairns]: 4,
        },
        totalWatchstones: 16,
    },
    {
        desc:
            "Put 4 watchstones in Lira Arthain (it can be any outer corner) and the last 2 in Lex Ejoris and Haewark Hamlet (any of the other 3 corners). From now one we want to socket all our watchstones to raise the awakener level.",
        watchstones: {
            [RegionId.ValdosRest]: 1,
            [RegionId.LexProxima]: 2,
            [RegionId.TirnsEnd]: 3,
            [RegionId.GlennachCairns]: 4,
            [RegionId.LiraArthain]: 4,
            [RegionId.LexEjoris]: 1,
            [RegionId.HaewarkHamlet]: 1,
        },
        totalWatchstones: 16,
    },
    {
        desc:
            "Start doing maps in Glennach Cairns until the conqueror spawn and kill him. While you're doing maps here, you should start to get map drops from Lira Arthain, don't run them yet.",
        watchstones: {
            [RegionId.ValdosRest]: 1,
            [RegionId.LexProxima]: 2,
            [RegionId.TirnsEnd]: 3,
            [RegionId.GlennachCairns]: 4,
            [RegionId.LiraArthain]: 4,
            [RegionId.LexEjoris]: 1,
            [RegionId.HaewarkHamlet]: 1,
        },
        totalWatchstones: 17,
    },
    {
        desc:
            "Keep running maps in Glennach Cairns exclusively until you've killed the 4 different conquerors there.",
        watchstones: {
            [RegionId.ValdosRest]: 1,
            [RegionId.LexProxima]: 2,
            [RegionId.TirnsEnd]: 3,
            [RegionId.GlennachCairns]: 4,
            [RegionId.LiraArthain]: 4,
            [RegionId.LexEjoris]: 1,
            [RegionId.HaewarkHamlet]: 1,
        },
        totalWatchstones: 20,
    },
    {
        desc:
            "At this point you can fight Sirius (you need to open a portal to him before you can spawn any more conquerors)",
        watchstones: {
            [RegionId.ValdosRest]: 1,
            [RegionId.LexProxima]: 2,
            [RegionId.TirnsEnd]: 3,
            [RegionId.GlennachCairns]: 4,
            [RegionId.LiraArthain]: 4,
            [RegionId.LexEjoris]: 1,
            [RegionId.HaewarkHamlet]: 1,
        },
        totalWatchstones: 20,
    },
];

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
