-- DropIndex
DROP INDEX "user_email_roll_key";

-- DropIndex
DROP INDEX "user_roll_key";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "roll" DROP NOT NULL;
