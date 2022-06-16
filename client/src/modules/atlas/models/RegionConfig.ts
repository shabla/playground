export interface RegionConfig {
    id: string;
    config: RegionDetails;
    name: string;
}

export interface RegionDetails {
    path: string;
    contentX: number;
    contentY: number;
}