import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function getPrismaClient(): PrismaClient {
  const connectionString = (process.env.DATABASE_URL || "").trim().replace(/^["']|["']$/g, "")
  if (!connectionString) {
    console.error("❌ CRITICAL: DATABASE_URL is not set in environment variables!")
  }
  const adapter = new PrismaPg({ connectionString })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? getPrismaClient()

globalForPrisma.prisma = prisma
