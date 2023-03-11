const prisma = require('./prisma');

const saveEmoji = async (word, emoji, source) => {
    await prisma.emoji.create({
        data: {
            word: word.toLowerCase().trim(),
            emoji,
            source
        },
    });
};

export default saveEmoji;
