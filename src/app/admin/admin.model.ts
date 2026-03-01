import {
    BanPermanentRequestWdto,
    BanReasonWdto,
    BanRequestWdto,
    UnbanRequestWdto,
    UserAdminCreateRequestWdto,
    UserAdminUpdateRequestWdto,
    UserAdminWdto,
} from '../../../openapi';

export type UserAdmin = UserAdminWdto;

export type UserAdminCreateRequest = UserAdminCreateRequestWdto;

export type UserAdminUpdateRequest = UserAdminUpdateRequestWdto;

export type BanRequest = BanRequestWdto;

export type BanPermanentRequest = BanPermanentRequestWdto;

export type BanReason = BanReasonWdto;
export const BanReason = BanReasonWdto;

export type UnbanRequest = UnbanRequestWdto;
