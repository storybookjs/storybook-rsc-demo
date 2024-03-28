-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "created_by" TEXT NOT NULL
);
