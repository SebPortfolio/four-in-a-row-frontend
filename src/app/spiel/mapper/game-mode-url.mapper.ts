import { GameModeUrl } from '../../common/types';
import { GameMode } from '../game.model';

const URL_TO_ENUM: Record<GameModeUrl, GameMode> = {
    [GameModeUrl.SINGLEPLAYER]: GameMode.Singleplayer,
    [GameModeUrl.LOCAL_MULTIPLAYER]: GameMode.LocalMultiplayer,
    [GameModeUrl.ONLINE_MULTIPLAYER]: GameMode.OnlineMultiplayer,
};

const ENUM_TO_URL: Record<GameMode, GameModeUrl> = {
    [GameMode.Singleplayer]: GameModeUrl.SINGLEPLAYER,
    [GameMode.LocalMultiplayer]: GameModeUrl.LOCAL_MULTIPLAYER,
    [GameMode.OnlineMultiplayer]: GameModeUrl.ONLINE_MULTIPLAYER,
};

export const mapGameModeUrlToEnum = (urlMode: GameModeUrl): GameMode => {
    const mode = URL_TO_ENUM[urlMode];
    if (!mode) {
        throw new Error(`Unmapped GameModeUrl: ${urlMode}`);
    }
    return mode;
};

export const mapGameModeEnumToUrl = (gameMode: GameMode): GameModeUrl => {
    const urlMode = ENUM_TO_URL[gameMode];
    if (!urlMode) {
        throw new Error(`Unmapped GameMode: ${gameMode}`);
    }
    return urlMode;
};
