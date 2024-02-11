-- AlterTable
ALTER TABLE "Map" ADD COLUMN     "playerCount" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "Stories" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 DAYS';
