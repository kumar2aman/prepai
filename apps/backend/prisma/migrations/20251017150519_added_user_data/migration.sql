-- CreateTable
CREATE TABLE "public"."UserData" (
    "id" TEXT NOT NULL,
    "progress" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "session" INTEGER NOT NULL,
    "accuracy" INTEGER NOT NULL,
    "streak" INTEGER NOT NULL,
    "achievements" INTEGER NOT NULL,

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("id")
);
