const prisma = require('./prisma');

const getEmoji = async (word) => {
    const entry = await prisma.emoji.findUnique({
        where: {
            word: word.toLowerCase()
        }
    });
    return entry ? entry.emoji : null;
};

export default getEmoji;
