const prisma = require('./prisma');

export const getEmojisCount = async (prismaInstance = prisma) => {
    try {
        const count = await prismaInstance.recentTranslation.count();
        return count
    } catch (error) {
        console.error('Error retrieving emoji count:', error);
        return null;
    }
};

export default getEmojisCount;
