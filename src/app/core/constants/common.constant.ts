import { RevisionType } from '../../admin/admin.model';

export const AUDIT_TYPE_MAP: Record<RevisionType, { label: string; color: string }> = {
    ADD: { label: 'ERSTELLEN', color: 'green' },
    MOD: { label: 'AKTUALISIEREN', color: 'blue' },
    DEL: { label: 'LOESCHEN', color: 'red' },
};
