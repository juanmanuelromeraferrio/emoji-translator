const prisma = require('./prisma');

export const saveRecentTranslation = async (word, emoji, prismaInstance = prisma) => {
    if (typeof word !== 'string' || typeof emoji !== 'string') {
        console.error(`Error saving recent translation: Invalid input type(s)`);
        return;
    }

    try {
        await prismaInstance.recentTranslation.create({
            data: {
                word: word.toLowerCase().trim(),
                emoji
            },
        });
    } catch (error) {
        console.error(`Error saving recents: ${error.message}`);
    }
};

export default saveRecentTranslation;
