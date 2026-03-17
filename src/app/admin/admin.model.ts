import {
    BanAuditWdto,
    BanCreateRequestWdto,
    BanPermanentCreateRequestWdto,
    BanReasonWdto,
    BanUpdateRequestWdto,
    BanWdto,
    CancelBanRequestWdto,
    PlayerPatchRequestWdto,
    UserAdminCreateRequestWdto,
    UserAdminPatchRequestWdto,
    UserAdminResponseWdto,
    UserAuditWdto,
} from '../../../openapi';

export type UserAdminResponse = UserAdminResponseWdto;

export type UserAdminCreateRequest = UserAdminCreateRequestWdto;

export type UserAdminPatchRequest = UserAdminPatchRequestWdto;

export type BanReason = BanReasonWdto;
export const BanReason = BanReasonWdto;

export type BanCreateRequest = BanCreateRequestWdto;

export type BanPermanentCreateRequest = BanPermanentCreateRequestWdto;

export type BanUpdateRequest = BanUpdateRequestWdto;

export type CancelBanRequest = CancelBanRequestWdto;

export type BanResponse = BanWdto;

export type BanAudit = BanAuditWdto;

export type PlayerPatchRequest = PlayerPatchRequestWdto;

export type UserAudit = UserAuditWdto;

export type RevisionType = UserAuditWdto.RevisionTypeEnum;
export const RevisionType = UserAuditWdto.RevisionTypeEnum;
