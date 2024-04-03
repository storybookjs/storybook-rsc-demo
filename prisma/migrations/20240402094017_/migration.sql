-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Note" ("id", "title", "body", "createdBy", "createdAt", "updatedAt")
SELECT "id", "title", "body", "created_by", "updated_at", "updated_at" FROM "Note";

DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
