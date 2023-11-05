/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `subredditId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - The `gender` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentVote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subreddit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vote` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `caption` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_replyToId_fkey";

-- DropForeignKey
ALTER TABLE "CommentVote" DROP CONSTRAINT "CommentVote_commentId_fkey";

-- DropForeignKey
ALTER TABLE "CommentVote" DROP CONSTRAINT "CommentVote_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_subredditId_fkey";

-- DropForeignKey
ALTER TABLE "Subreddit" DROP CONSTRAINT "Subreddit_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_subredditId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_postId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_userId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
DROP COLUMN "subredditId",
DROP COLUMN "title",
ADD COLUMN     "caption" TEXT NOT NULL,
ADD COLUMN     "location" TEXT,
ALTER COLUMN "authorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "website" TEXT,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "CommentVote";

-- DropTable
DROP TABLE "Subreddit";

-- DropTable
DROP TABLE "Subscription";

-- DropTable
DROP TABLE "Vote";

-- DropEnum
DROP TYPE "VoteType";

-- CreateTable
CREATE TABLE "Stories" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "media_url" TEXT NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '1 DAYS',
    "caption" TEXT,

    CONSTRAINT "Stories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryViews" (
    "userId" TEXT NOT NULL,
    "storiesId" TEXT NOT NULL,

    CONSTRAINT "StoryViews_pkey" PRIMARY KEY ("userId","storiesId")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateTable
CREATE TABLE "CommentLikes" (
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follows" (
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("followerId","followingId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_name_key" ON "Image"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CommentLikes_userId_commentId_key" ON "CommentLikes"("userId", "commentId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stories" ADD CONSTRAINT "Stories_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryViews" ADD CONSTRAINT "StoryViews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryViews" ADD CONSTRAINT "StoryViews_storiesId_fkey" FOREIGN KEY ("storiesId") REFERENCES "Stories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentLikes" ADD CONSTRAINT "CommentLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentLikes" ADD CONSTRAINT "CommentLikes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
