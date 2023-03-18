const prisma = require('./prisma');

export const getEmoji = async (word, prismaInstance = prisma) => {
    try {
        const results = await prismaInstance.emoji.findMany({
            select: {
                emoji: true,
            },
            where: {
                OR: [
                    {
                        word: word.toLowerCase().trim(),
                    },
                    {
                        word: {
                            startsWith: word.toLowerCase().trim() + ' ',
                        },
                    },
                    {
                        word: {
                            endsWith: ' ' + word.toLowerCase().trim(),
                        },
                    },
                    {
                        word: {
                            contains: ' ' + word.toLowerCase().trim() + ' ',
                        },
                    },
                ],
            },
        });
        const emojis = results.map(({ emoji }) => emoji);
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        return randomEmoji || null;
    } catch (error) {
        console.error('Error retrieving emoji:', error);
        return null;
    }
};

export default getEmoji;
