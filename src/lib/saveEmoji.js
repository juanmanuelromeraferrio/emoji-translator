const prisma = require('./prisma');

const saveEmoji = async (word, emoji, source) => {
    await prisma.emoji.create({
        data: {
            word,
            emoji,
            source
        },
    });
};

export default saveEmoji;
