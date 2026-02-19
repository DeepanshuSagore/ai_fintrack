import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis;

const adapter =
  globalForPrisma.prismaAdapter ||
  new PrismaPg(
    new Pool({
      connectionString: process.env.DATABASE_URL,
    })
  );

export const db = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaAdapter = adapter;
  globalForPrisma.prisma = db;
}