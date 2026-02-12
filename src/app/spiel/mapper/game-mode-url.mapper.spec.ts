import { GameModeUrl } from '../../common/types';
import { GameMode } from '../game.model';
import { mapGameModeEnumToUrl, mapGameModeUrlToEnum } from './game-mode-url.mapper';

describe('GameModeUrlMapper', () => {
    const testCases = [
        { url: GameModeUrl.SINGLEPLAYER, api: GameMode.Singleplayer },
        { url: GameModeUrl.LOCAL_MULTIPLAYER, api: GameMode.LocalMultiplayer },
        { url: GameModeUrl.ONLINE_MULTIPLAYER, api: GameMode.OnlineMultiplayer },
    ];

    describe('mapGameModeUrlToEnum', () => {
        testCases.forEach(({ url, api }) => {
            it(`should map URL "${url}" to Enum "${api}"`, () => {
                expect(mapGameModeUrlToEnum(url)).toBe(api);
            });
        });

        it('should throw error for invalid input', () => {
            expect(() => mapGameModeUrlToEnum('invalid' as any)).toThrow();
        });
    });

    describe('mapGameModeEnumToUrl', () => {
        testCases.forEach(({ url, api }) => {
            it(`should map Enum "${api}" back to URL "${url}"`, () => {
                expect(mapGameModeEnumToUrl(api)).toBe(url);
            });
        });

        it('should throw error for invalid input', () => {
            expect(() => mapGameModeEnumToUrl('invalid' as any)).toThrow();
        });
    });
});
