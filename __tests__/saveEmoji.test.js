import { v4 as uuidv4 } from 'uuid';
const { saveEmoji } = require('../src/lib/saveEmoji');

const mockCreate = jest.fn();
const mockPrisma = {
    emoji: {
        create: mockCreate,
    },
};
const mockConsoleError = jest.fn();

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'fixed-uuid-value'),
}));

describe('saveEmoji function', () => {
    beforeEach(() => {
        mockConsoleError.mockClear();
        console.error = mockConsoleError;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('saves the emoji for a given word and source', async () => {
        await saveEmoji('hello', '😀', 'test', mockPrisma);

        expect(mockCreate).toHaveBeenCalledTimes(1);
        expect(mockCreate).toHaveBeenCalledWith({
            data: {
                word: 'hello_fixed-uuid-value',
                emoji: '😀',
                source: 'test',
            },
        });
    });

    test('trims and converts word to lowercase before saving', async () => {
        await saveEmoji('   HElLo   ', '😀', 'test', mockPrisma);

        expect(mockCreate).toHaveBeenCalledTimes(1);
        expect(mockCreate).toHaveBeenCalledWith({
            data: {
                word: 'hello_fixed-uuid-value',
                emoji: '😀',
                source: 'test',
            },
        });
    });

    test('logs an error message if saving fails', async () => {
        const error = new Error('Database connection error');
        mockCreate.mockRejectedValueOnce(error);

        await saveEmoji('hello', '😀', 'test', mockPrisma);

        expect(mockCreate).toHaveBeenCalledTimes(1);
        expect(mockConsoleError).toHaveBeenCalledWith(`Error saving emoji: ${error.message}`);
    });

    test('logs an error message if given invalid input types', async () => {
        await saveEmoji(123, {}, [], mockPrisma);

        expect(mockCreate).not.toHaveBeenCalled();
        expect(mockConsoleError).toHaveBeenCalledWith('Error saving emoji: Invalid input type(s)');
    });
});
