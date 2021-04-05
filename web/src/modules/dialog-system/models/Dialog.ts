export type Dialog = {
    steps?: DialogStep[];
    end?: boolean;
};

export type DialogOption = {
    text: string;
    next: string;
};

export type DialogStep = {
    text?: string;
    options?: DialogOption[];
    next?: string;
    end?: boolean;
};

export type Character = {
    id: string;
    name: string;
    worldImage: string;
    portraitImage: string;
    initialDialog: string;
    dialogs: Record<string, Dialog>;
}