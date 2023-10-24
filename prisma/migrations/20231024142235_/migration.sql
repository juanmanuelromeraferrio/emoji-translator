-- CreateTable
CREATE TABLE "RecentTranslation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "word" TEXT,
    "emoji" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recents_pkey" PRIMARY KEY ("id")
);
