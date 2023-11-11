const { PrismaClient } = require('@prisma/client');
import { withAccelerate } from '@prisma/extension-accelerate'

let prisma;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient().$extends(withAccelerate());
    }
    prisma = global.prisma;
}

module.exports = prisma;
