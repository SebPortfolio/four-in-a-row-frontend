export enum GameModeUrl {
    SINGLEPLAYER = 'singleplayer',
    LOCAL_MULTIPLAYER = 'local',
    ONLINE_MULTIPLAYER = 'online',
}

// TODO: besseren Namen finden
export type RoutingObj = {
    label: string;
    route: string;
    absolutePath?: boolean; // Optional, standardmäßig false, wenn true, wird die Route als absolute URL behandelt
};

export interface AppLanguage {
    code: string;
    label: string; // Übersetzungsstring
    nativeName: string; // Name Originalsprache
    flagPath: string;
}

export type DateFormatType = 'date' | 'dateTime' | 'dateTimeFull' | 'time' | 'timeFull';
