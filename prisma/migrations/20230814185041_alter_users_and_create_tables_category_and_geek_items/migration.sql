-- CreateEnum
CREATE TYPE "user_profile_type" AS ENUM ('ADMIN', 'CLIENT_REGULAR', 'CLIENT_SUBSCRIBER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "profile" "user_profile_type" NOT NULL DEFAULT 'CLIENT_REGULAR';

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeekItem" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "comment" TEXT,
    "rating" INTEGER NOT NULL,
    "dateAdd" TIMESTAMP(3),
    "photo" TEXT,
    "user_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeekItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeekItem" ADD CONSTRAINT "GeekItem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeekItem" ADD CONSTRAINT "GeekItem_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
