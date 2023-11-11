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
            },
            cacheStrategy: {
                swr: 86_400, // 1 day
                ttl: 7_200, // 2 hours
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
