/*
  Warnings:

  - The primary key for the `Map` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Map` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `mapId` on the `Banner` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Banner" DROP CONSTRAINT "Banner_mapId_fkey";

-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "mapId",
ADD COLUMN     "mapId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Map" DROP CONSTRAINT "Map_pkey",
ADD COLUMN     "ageLimit" INTEGER,
ADD COLUMN     "approved" BOOLEAN DEFAULT false,
ADD COLUMN     "cat" TEXT[],
ADD COLUMN     "editor" BOOLEAN DEFAULT false,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "userLimit" DROP NOT NULL,
ADD CONSTRAINT "Map_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Stories" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 DAYS';

-- AddForeignKey
ALTER TABLE "Banner" ADD CONSTRAINT "Banner_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;
