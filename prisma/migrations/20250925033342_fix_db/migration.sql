/*
  Warnings:

  - You are about to drop the column `link` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseTopic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[token]` on the table `Invite` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Course" DROP CONSTRAINT "Course_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Course" DROP CONSTRAINT "Course_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CourseItem" DROP CONSTRAINT "CourseItem_courseTopicId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CourseProgress" DROP CONSTRAINT "CourseProgress_courseItemId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CourseProgress" DROP CONSTRAINT "CourseProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CourseTopic" DROP CONSTRAINT "CourseTopic_courseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Notification" DROP CONSTRAINT "Notification_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Note" DROP COLUMN "link",
DROP COLUMN "photo";

-- DropTable
DROP TABLE "public"."Course";

-- DropTable
DROP TABLE "public"."CourseItem";

-- DropTable
DROP TABLE "public"."CourseProgress";

-- DropTable
DROP TABLE "public"."CourseTopic";

-- DropTable
DROP TABLE "public"."Notification";

-- CreateIndex
CREATE UNIQUE INDEX "Invite_token_key" ON "public"."Invite"("token");
