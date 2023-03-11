const prisma = require('./prisma');


const getEmoji = async (word) => {
    const results = await prisma.emoji.findMany({
        select: {
            emoji: true
        },
        where: {
            OR: [
                {
                    word: word.toLowerCase().trim(),
                },
                {
                    word: {
                        startsWith: word.toLowerCase().trim() + " ",
                    },
                },
                {
                    word: {
                        endsWith: " " + word.toLowerCase().trim(),
                    },
                },
                {
                    word: {
                        contains: " " + word.toLowerCase().trim() + " ",
                    },
                },
            ],
        },
    });
    const emojis = results.map(entry => entry.emoji);
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    return randomEmoji || null;
};

export default getEmoji;
