-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailToken" TEXT,
ADD COLUMN     "emailTokenExpiry" TIMESTAMP(3),
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false;
