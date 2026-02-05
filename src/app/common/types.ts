export enum GameMode {
    SINGLEPLAYER = 'singleplayer',
    MULTIPLAYER = 'multiplayer',
    // TODO: Unterscheidung zwischen lokalem und online Multiplayer
}

// TODO: besseren Namen finden
export type RotuingObj = {
    label: string;
    route: string;
    absolutePath?: boolean; // Optional, standardmäßig false, wenn true, wird die Route als absolute URL behandelt
};
