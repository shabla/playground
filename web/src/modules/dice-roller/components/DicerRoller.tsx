import React, { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { PageWithNavbar, Button, Heading, InputText } from "components";
import { getRandomInt } from "utils/random";
import { RollOutput } from "../models";
import { RollHistory } from "./RollHistory";
import { getRollStats } from "../utils";

const MIN_DICES = 1;
const MAX_DICES = 16;
const sliderMarks = Array.from(Array(MAX_DICES)).reduce((acc, _, i) => {
    acc[i + 1] = { label: i + 1 };
    return acc;
}, {});

export const DiceRoller: React.FC = () => {
    const [history, setHistory] = useState<RollOutput[]>([]);
    const [name, setName] = useState<string>("Player");
    const [nbDices, setNbDices] = useState<number>(6);
    const [diceSize, setDiceSize] = useState<number>(10);
    const [successValue, setSuccessValue] = useState<number>(8);
    const historyElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        historyElementRef.current?.scrollTo({
            top: historyElementRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [history]);

    const roll = (): void => {
        const rollOutput: RollOutput = {
            timestamp: new Date(),
            name,
            nbDices,
            diceSize,
            successValue,
            results: [],
            rerolls: [],
        };

        for (let i = 0; i < nbDices; i++) {
            const value = getRandomInt(1, diceSize);
            rollOutput.results.push(value);
        }

        setHistory([...history, rollOutput]);
    };

    const onClearHistory = () => setHistory([]);

    const onRemoveHistoryItem = (itemToRemove: RollOutput): void => {
        const index = history.findIndex((item) => item === itemToRemove);

        setHistory([...history.slice(0, index), ...history.slice(index + 1)]);
    };

    const onReroll = (item: RollOutput): void => {
        const result = getRandomInt(1, item.diceSize);
        const updatedItem: RollOutput = {
            ...item,
            rerolls: [
                ...(item.rerolls || []),
                {
                    ...item,
                    timestamp: new Date(),
                    results: [result],
                    rerolls: undefined,
                },
            ],
        };

        const index = history.findIndex((i) => i === item);
        setHistory([...history.slice(0, index), updatedItem, ...history.slice(index + 1)]);
    };

    console.log(JSON.stringify(history, null, 4));

    return (
        <PageWithNavbar title="Dice Roller" containerClassName="flex flex-col">
            <div className="flex flex-grow">
                <div className="flex-1 p-2 ">
                    <Heading>Settings</Heading>

                    <div className="flex items-center mb-3 mt-2">
                        <div className="w-40">
                            <label htmlFor="name-input">Name</label>
                        </div>

                        <div className="flex-auto">
                            <InputText
                                id="name-input"
                                defaultValue={name}
                                onChange={(e) => setName(e.currentTarget.value)}
                            />
                        </div>
                    </div>

                    <div className="flex mb-3">
                        <div className="flex md:flex-1 items-center mr-3">
                            <div className="w-40 flex-none">
                                <label htmlFor="success-input">Min Success Value</label>
                            </div>
                            <div className="flex-auto">
                                <InputText
                                    id="success-input"
                                    defaultValue={successValue.toString()}
                                    onChange={(e) =>
                                        setSuccessValue(parseInt(e.currentTarget.value))
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex md:flex-1 items-center">
                            <div className="flex-none mr-2">
                                <label htmlFor="dice-size-input">Dice Size</label>
                            </div>
                            <div className="flex-auto">
                                <InputText
                                    id="dice-size-input"
                                    defaultValue={diceSize.toString()}
                                    onChange={(e) => setDiceSize(parseInt(e.currentTarget.value))}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 mb-10 flex">
                        <div className="flex-col flex-auto p-2 pb-5 mr-3">
                            <Slider
                                min={MIN_DICES}
                                max={MAX_DICES}
                                defaultValue={nbDices}
                                value={nbDices}
                                onChange={setNbDices}
                                dots={true}
                                marks={sliderMarks}
                            />
                        </div>

                        <div className="flex-none w-20">
                            <InputText
                                id="nb-dices-input"
                                value={nbDices.toString()}
                                onChange={(e) => setNbDices(parseInt(e.currentTarget.value))}
                            />
                        </div>
                    </div>

                    <Button fill size="lg" onClick={roll}>
                        Roll {nbDices}d{diceSize}
                    </Button>
                </div>

                <div className="flex flex-col flex-1 p-2">
                    <div className="flex align-center justify-between mb-2">
                        <Heading inline>Roll History</Heading>
                        <Button onClick={onClearHistory}>Clear</Button>
                    </div>

                    <RollHistory
                        items={history}
                        onRemoveItem={onRemoveHistoryItem}
                        onReroll={onReroll}
                    />
                </div>
            </div>
        </PageWithNavbar>
    );
};

export default DiceRoller;
