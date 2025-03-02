const prisma = require('./prisma');

export const getRecentEmojis = async (prismaInstance = prisma) => {
    try {
        const translations = await prisma.recentTranslation.findMany({
            orderBy: {
                created_at: 'desc'
            },
            take: 40,
            select: {
                word: true,
                emoji: true
            }
            ,
        });
        return translations;
    } catch (error) {
        console.error('Error retrieving recen emojis:', error);
        return null;
    }
};

export default getRecentEmojis;
