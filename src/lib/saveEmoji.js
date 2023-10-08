import { v4 as uuidv4 } from 'uuid';

const prisma = require('./prisma');

export const saveEmoji = async (word, emoji, source, prismaInstance = prisma) => {
    if (typeof word !== 'string' || typeof emoji !== 'string' || typeof source !== 'string') {
        console.error(`Error saving emoji: Invalid input type(s)`);
        return;
    }

    try {
        await prismaInstance.emoji.create({
            data: {
                word: word.toLowerCase().trim() + "_" + uuidv4(),
                emoji,
                source: source.trim(),
            },
        });
    } catch (error) {
        console.error(`Error saving emoji: ${error.message}`);
    }
};

export default saveEmoji;
