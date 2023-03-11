-- CreateTable
CREATE TABLE "Emoji" (
    "word" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "source" TEXT NOT NULL,

    CONSTRAINT "Emoji_pkey" PRIMARY KEY ("word")
);
