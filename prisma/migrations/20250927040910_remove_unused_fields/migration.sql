/*
  Warnings:

  - You are about to drop the column `reply_to` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Message" DROP COLUMN "reply_to";
