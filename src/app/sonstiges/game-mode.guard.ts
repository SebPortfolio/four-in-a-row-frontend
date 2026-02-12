import { CanActivateFn } from '@angular/router';
import { GameModeUrl } from '../common/types';

export const gameModeGuard: CanActivateFn = route => {
    const gameMode = route.paramMap.get('gameMode');
    if (!gameMode) {
        console.error('Kein Spielmodus angegeben');
        return false;
    }
    return Object.values(GameModeUrl).includes(gameMode as GameModeUrl);
};
