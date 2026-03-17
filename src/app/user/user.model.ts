import { UserStatusWdto, UserUpdateRequestWdto, UserWdto } from '../../../openapi';

export type User = UserWdto;

export type UserPatchRequest = UserPatchRequestWdto;

export type UserStatus = UserStatusWdto; // TODO: später in user.model.ts überführen
export const UserStatus = UserStatusWdto;
