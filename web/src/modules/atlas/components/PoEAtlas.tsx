import React from "react";

import "./PoEAtlas.css";

import { RegionConfig, RegionId, RegionIdType } from "../models";
import { AtlasRegion } from "./AtlasRegion";

export const regionConfigs: RegionConfig[] = [
    {
        id: RegionId.HaewarkHamlet,
        name: "Haewark Hamlet",
        config: {
            path:
                "M0.5 197.189V0.500221L202.833 0.500123L67.3132 142.774L14.6013 190.099L0.5 197.189Z",
            contentX: 75,
            contentY: 50,
        },
    },

    {
        id: RegionId.TirnsEnd,
        name: "Tirn's End",
        config: {
            path:
                "M247.895 207.433L66.3955 143.784L202.395 0.836052L295.363 167.052L247.895 207.433Z",
            contentX: 185,
            contentY: 120,
        },
    },
    {
        id: RegionId.LexProxima,
        name: "Lex Proxima",
        config: {
            path: "M380.94 0.5L538.88 231.479L417.571 385.602L202.352 0.5H380.94Z",
            contentX: 350,
            contentY: 100,
        },
    },
    {
        id: RegionId.LexEjoris,
        name: "Lex Ejoris",
        config: {
            path: "M538.264 230.5L380.948 0.5H594.5V230.5H538.264Z",
            contentX: 520,
            contentY: 60,
        },
    },
    {
        id: RegionId.NewVastir,
        name: "New Vastir",
        config: {
            path: "M0.5 424.5V197.3L14.8825 189.629L217.409 424.5L0.5 424.5Z",
            contentX: 65,
            contentY: 360,
        },
    },
    {
        id: RegionId.GlennachCairns,
        name: "Glenncach Cairns",
        config: {
            path:
                "M247.604 207.391L263.977 256.013L216.77 423.969L14.6997 190.045L66.1136 144.069L247.604 207.391Z",
            contentX: 160,
            contentY: 250,
        },
    },
    {
        id: RegionId.ValdosRest,
        name: "Valdo's Rest",
        config: {
            path: "M417.5 385.63V424.5H216.659L263.888 255.967L341.222 249.027L417.5 385.63Z",
            contentX: 315,
            contentY: 350,
        },
    },
    {
        id: RegionId.LiraArthain,
        name: "Lira Arthain",
        config: {
            path: "M417.521 424.5L417.521 385.617L538.244 230.5H594.5V424.5H417.521Z",
            contentX: 525,
            contentY: 360,
        },
    },
];

export interface PoEAtlasProps {
    watchstones?: Record<string, number>;
}

export const PoEAtlas: React.FC<PoEAtlasProps> = ({ watchstones }) => {
    const countWatchstones = (watchstones: Record<string, number>): number => {
        return Object.keys(watchstones).reduce((acc, regionId) => {
            return acc + watchstones[regionId];
        }, 0);
    };

    return (
        <div>
            <svg width="595" height="425" viewBox="0 0 595 425" xmlns="http://www.w3.org/2000/svg">
                {regionConfigs.map((region) => (
                    <AtlasRegion
                        key={region.id}
                        id={region.id}
                        config={region.config}
                        name={region.name}
                        watchstones={watchstones?.[region.id as RegionIdType]}
                    />
                ))}

                <g>
                    <circle
                        id="center"
                        cx="300"
                        cy="215"
                        r="58"
                        fill="#C4C4C4"
                        stroke="black"
                    />
                    <text textAnchor="middle" x="300" y="215" fill="black" fontSize="12" transform="translate(0,-15)">
                        Awakener Level
                    </text>
                    <text textAnchor="middle" x="300" y="215" fill="red" fontSize="48" transform="translate(0, 30)">
                        {watchstones ? Math.floor(countWatchstones(watchstones) / 4) : 0}
                    </text>
                </g>
            </svg>
        </div>
    );
};

export default PoEAtlas;
