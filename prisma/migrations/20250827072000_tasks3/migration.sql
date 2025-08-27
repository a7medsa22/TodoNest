/*
  Warnings:

  - You are about to drop the column `priorty` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `tilte` on the `Task` table. All the data in the column will be lost.
  - Added the required column `title` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Task" DROP COLUMN "priorty",
DROP COLUMN "tilte",
ADD COLUMN     "priority" "public"."TaskPriorty" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "title" TEXT NOT NULL;
