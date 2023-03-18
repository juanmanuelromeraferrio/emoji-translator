import { getEmoji } from './getEmoji';

const mockFindMany = jest.fn();

const mockPrisma = {
    emoji: {
        findMany: mockFindMany,
    },
};

describe('getEmoji', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('returns a random emoji for a given word', async () => {
        const word = 'happy';
        const mockEmojis = [
            { emoji: '😀' },
            { emoji: '😍' },
        ];

        mockFindMany.mockResolvedValue(mockEmojis);

        const emoji = await getEmoji(word, mockPrisma);
        expect(mockFindMany).toHaveBeenCalled();
        expect(mockEmojis.some((entry) => entry.emoji === emoji)).toBeTruthy();
    });

    test('returns null if no matching emoji is found', async () => {
        const word = 'nonexistentword';
        mockFindMany.mockResolvedValue([]);

        const emoji = await getEmoji(word, mockPrisma);
        expect(mockFindMany).toHaveBeenCalled();
        expect(emoji).toBeNull();
    });

    test('returns null if there is an error retrieving the emoji', async () => {
        const word = 'error';
        const mockPrisma = {
            emoji: {
                findMany: jest.fn(() => { throw new Error('Oops!'); }),
            },
        };
        const emoji = await getEmoji(word, mockPrisma);
        expect(mockPrisma.emoji.findMany).toHaveBeenCalled();
        expect(emoji).toBeNull();
    });
});
