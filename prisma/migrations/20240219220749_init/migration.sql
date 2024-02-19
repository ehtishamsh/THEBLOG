/*
  Warnings:

  - You are about to drop the column `userID` on the `Blog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_userID_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "userID";

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "tagName" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogDetail" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "tagID" TEXT NOT NULL,
    "blogID" TEXT NOT NULL,

    CONSTRAINT "BlogDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_tagName_key" ON "Tag"("tagName");

-- AddForeignKey
ALTER TABLE "BlogDetail" ADD CONSTRAINT "BlogDetail_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogDetail" ADD CONSTRAINT "BlogDetail_tagID_fkey" FOREIGN KEY ("tagID") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogDetail" ADD CONSTRAINT "BlogDetail_blogID_fkey" FOREIGN KEY ("blogID") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
