import React from "react";

import { RegionDetails } from "../models";
import CrusaderIcon from "assets/Crusader-symbol.webp";
import HunterIcon from "assets/Hunter-symbol.webp";
import RedeemerIcon from "assets/Redeemer-symbol.webp";
import WarlordIcon from "assets/Warlord-symbol.webp";

export interface AtlasRegionProps {
    id: string;
    config: RegionDetails;
    name?: string;
    watchstones?: number;
}

const iconXOffset = 2 * -13.5;
const iconYOffset = -25 + -13.5;

export const AtlasRegion: React.FC<AtlasRegionProps> = ({ id, config, name, watchstones }) => {
    return (
        <>
            <path className="atlas-zone" id={id} d={config.path} fill="#C4C4C4" stroke="black" />

            <g>
                <image
                    href={CrusaderIcon}
                    height="27"
                    width="27"
                    x={config.contentX}
                    y={config.contentY}
                    transform={`translate(${-27 + iconXOffset}, ${iconYOffset})`}
                />
                <image
                    href={HunterIcon}
                    height="27"
                    width="27"
                    x={config.contentX}
                    y={config.contentY}
                    transform={`translate(${0 + iconXOffset}, ${iconYOffset})`}
                />
                <image
                    href={RedeemerIcon}
                    height="27"
                    width="27"
                    x={config.contentX}
                    y={config.contentY}
                    transform={`translate(${27 + iconXOffset}, ${iconYOffset})`}
                />
                <image
                    href={WarlordIcon}
                    height="27"
                    width="27"
                    x={config.contentX}
                    y={config.contentY}
                    transform={`translate(${54 + iconXOffset}, ${iconYOffset})`}
                />

                {name && (
                    <text
                        id="name"
                        className="zone-name"
                        x={config.contentX}
                        y={config.contentY}
                        textAnchor="middle"
                    >
                        {name}
                    </text>
                )}

                {watchstones && (
                    <text
                        id="watchstones"
                        className="watchstones-count"
                        x={config.contentX}
                        y={config.contentY}
                        textAnchor="middle"
                        transform="translate(0,30)"
                    >
                        {watchstones}
                    </text>
                )}
            </g>
        </>
    );
};
