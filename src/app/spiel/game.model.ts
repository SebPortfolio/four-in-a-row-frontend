import {
    GameCreateRequestWdto,
    GameModeWdto,
    GameResultWdto,
    GameStatusWdto,
    GameWdto,
    MoveRequestWdto,
} from '../../../openapi';

export type Game = GameWdto;

export type GameCreateRequest = GameCreateRequestWdto;

export type GameStatus = GameStatusWdto;
export const GameStatus = GameStatusWdto;

export type GameResult = GameResultWdto;
export const GameResult = GameResultWdto;

export type GameMode = GameModeWdto;
export const GameMode = GameModeWdto;

export type MoveRequest = MoveRequestWdto;
