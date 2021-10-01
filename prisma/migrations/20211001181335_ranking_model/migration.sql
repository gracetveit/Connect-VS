-- CreateTable
CREATE TABLE "Ranking" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 1500,
    "gamesPlayed" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_userId_gameId_key" ON "Ranking"("userId", "gameId");

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
