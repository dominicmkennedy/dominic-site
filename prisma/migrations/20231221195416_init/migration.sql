-- CreateTable
CREATE TABLE "Album" (
    "mbid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "credits" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "numberTracks" INTEGER NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    "coverUrl" TEXT NOT NULL,
    "dominicScore" INTEGER,
    "currentElo" INTEGER,
    "reviewText" TEXT
);

-- CreateTable
CREATE TABLE "Track" (
    "mbid" TEXT NOT NULL PRIMARY KEY,
    "albumId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "credits" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "trackNumber" INTEGER NOT NULL,
    "relAlbumScore" INTEGER,
    CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album" ("mbid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_elo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_elo_A_fkey" FOREIGN KEY ("A") REFERENCES "Album" ("mbid") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_elo_B_fkey" FOREIGN KEY ("B") REFERENCES "Album" ("mbid") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_elo_AB_unique" ON "_elo"("A", "B");

-- CreateIndex
CREATE INDEX "_elo_B_index" ON "_elo"("B");
