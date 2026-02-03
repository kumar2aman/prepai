/*
  Warnings:

  - You are about to drop the column `totalSession` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `UserData` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Session" DROP COLUMN "totalSession";

-- AlterTable
ALTER TABLE "public"."UserData" ADD COLUMN     "totalSession" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "progress" SET DEFAULT '0',
ALTER COLUMN "score" SET DEFAULT 0,
ALTER COLUMN "level" SET DEFAULT 0,
ALTER COLUMN "accuracy" SET DEFAULT 0,
ALTER COLUMN "streak" SET DEFAULT 0,
ALTER COLUMN "achievements" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "UserData_userId_key" ON "public"."UserData"("userId");
