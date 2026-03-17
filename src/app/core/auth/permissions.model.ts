// Spiegelung der BE-Permissions
export const APP_PERMISSIONS = {
    // User / Auth
    USER_SELF_VIEW: 'user.self.view',
    USER_SELF_WRITE: 'user.self.write',
    USER_ALL_VIEW: 'user.all.view',
    USER_ALL_ADMIN: 'user.all.admin',

    // Sessions
    SESSION_VIEW: 'user.session.view',
    SESSION_DELETE: 'user.session.delete',

    // Player Profile
    PLAYER_VIEW: 'player.profile.view',
    PLAYER_WRITE: 'player.profile.write',
    PLAYER_STATS_VIEW: 'player.stats.view',

    // Game Logic
    GAME_VIEW: 'game.match.view',
    GAME_CREATE: 'game.match.create',
    GAME_PLAY: 'game.match.play',
    GAME_SURRENDER: 'game.match.surrender',
    GAME_DELETE: 'game.delete',
} as const;

export type AppPermission = (typeof APP_PERMISSIONS)[keyof typeof APP_PERMISSIONS];
