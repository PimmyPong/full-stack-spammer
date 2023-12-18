/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "likes" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Post_text_key" ON "Post"("text");
