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
