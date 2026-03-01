import { UserStatusWdto, UserUpdateRequestWdto, UserWdto } from '../../../openapi';

export type User = UserWdto;

export type UserUpdateRequest = UserUpdateRequestWdto;

export type UserStatus = UserStatusWdto; // TODO: später in user.model.ts überführen
export const UserStatus = UserStatusWdto;
