import { getEmojis } from '../src/lib/getEmojis';

const mockFindMany = jest.fn();

const mockPrisma = {
    emoji: {
        findMany: mockFindMany,
    },
};

describe('getEmojis', () => {
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

        const emojis = await getEmojis(word, mockPrisma);
        expect(mockFindMany).toHaveBeenCalled();
        expect(emojis).toEqual(mockEmojis.map(entry => entry.emoji));
    });

    test('returns null if no matching emoji is found', async () => {
        const word = 'nonexistentword';
        mockFindMany.mockResolvedValue([]);

        const emojis = await getEmojis(word, mockPrisma);
        expect(mockFindMany).toHaveBeenCalled();
        expect(emojis).toHaveLength(0);
    });

    test('returns null if there is an error retrieving the emoji', async () => {
        const word = 'error';
        const mockPrisma = {
            emoji: {
                findMany: jest.fn(() => { throw new Error('Oops!'); }),
            },
        };
        const emojis = await getEmojis(word, mockPrisma);
        expect(mockPrisma.emoji.findMany).toHaveBeenCalled();
        expect(emojis).toBeNull();
    });
});
