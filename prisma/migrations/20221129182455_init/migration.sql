-- CreateTable
CREATE TABLE "Council" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author" TEXT,
    "description" TEXT,
    "committees" TEXT,

    CONSTRAINT "Council_pkey" PRIMARY KEY ("id")
);
