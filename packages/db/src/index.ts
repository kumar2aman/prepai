import { PrismaClient } from "../generated/client/index.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

<<<<<<< HEAD
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
export * from "@prisma/client";
=======
export const prisma = new PrismaClient({
  adapter,
});
>>>>>>> ed7ff94 (fixed prisma not working)
