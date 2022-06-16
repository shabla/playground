export const RegionId = {
    HaewarkHamlet: "haewark_hamlet",
    TirnsEnd: "tirns_end",
    LexProxima: "lex_proxima",
    LexEjoris: "lex_ejoris",
    NewVastir: "new_vastir",
    GlennachCairns: "glennach_cairns",
    ValdosRest: "valdos_rest",
    LiraArthain: "lira_arthain",
} as const;

export type RegionIdType = typeof RegionId[keyof typeof RegionId];
