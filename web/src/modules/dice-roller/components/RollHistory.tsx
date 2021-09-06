import React, { useEffect, useRef } from "react";
import classnames from "classnames";

import { Button } from "components";
import { RollOutput } from "../models";
import { getRollStats } from "../utils";
import { RollResults } from "./RollResults";

interface RollHistoryProps {
    items: RollOutput[];
    onRemoveItem: (item: RollOutput) => void;
    onReroll: (item: RollOutput) => void;
}

export const RollHistory: React.FC<RollHistoryProps> = ({ items, onRemoveItem, onReroll }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to bottom when items change
        containerRef.current?.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [items]);

    return (
        <div ref={containerRef} className="border rounded flex-grow overflow-y-auto h-0">
            {items.length === 0 && <div className="p-5 text-center text-gray-300">Empty</div>}

            {items.map((item, itemIndex) => {
                const stats = getRollStats(item);
                const rerolls = item.rerolls || [];

                return (
                    <div key={itemIndex} className="p-3 even:bg-gray-50 flex border-b">
                        <div className="flex-1">
                            <div className="text-gray-400 text-xs">
                                {item.timestamp.toLocaleTimeString()}
                            </div>
                            <span className="font-mono text-gray-500 mr-5 text-lg">
                                {item.name}
                            </span>
                        </div>

                        <div className="flex-auto space-y-1">
                            <div>
                                <span>
                                    Rolled {item.nbDices}d{item.diceSize}
                                </span>

                                <span className="text-xs text-gray-400 ml-5">
                                    ({item.successValue} for success)
                                </span>
                            </div>

                            <div className="flex align-center space-x-2">
                                <RollResults data={item} />
                            </div>

                            {stats.maxRolls > 0 && (
                                <div className="flex align-center items-center space-x-2 mt-2">
                                    <span className="text-xs">Rerolls:</span>

                                    {rerolls.map((item, rerollItemIndex) => {
                                        return <RollResults key={rerollItemIndex} data={item} />;
                                    })}

                                    {rerolls.length < stats.maxRolls && (
                                        <Button size="sm" onClick={() => onReroll(item)}>
                                            {stats.maxRolls - rerolls.length} Rerolls
                                        </Button>
                                    )}
                                </div>
                            )}

                            <div
                                className={classnames("text-xl font-bold", {
                                    "text-green-500": stats.successes > 0,
                                    "text-red-500": stats.successes === 0,
                                })}
                            >
                                {stats.successes > 0
                                    ? `${stats.successes} SUCCESS${stats.successes > 1 ? "ES" : ""}`
                                    : "FAILURE"}
                            </div>
                        </div>

                        <div className="flex-none flex items-center">
                            <Button
                                noBg
                                size="sm"
                                className="hover:bg-gray-50 w-10 h-10"
                                onClick={() => onRemoveItem(item)}
                            >
                                X
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RollHistory;
