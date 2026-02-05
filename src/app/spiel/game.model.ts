import { GameCreateRequestWdto, GameStatusWdto, GameWdto, MoveRequestWdto } from '../../../openapi';

export type Game = GameWdto;

export type GameCreateRequest = GameCreateRequestWdto;

export type GameStatus = GameStatusWdto;
export const GameStatus = GameStatusWdto;

export type MoveRequest = MoveRequestWdto;
