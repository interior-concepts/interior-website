import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "@prisma/client";

// Neon PostgreSQL connection strings
const NEON_DATABASE_URL =
  "postgresql://neondb_owner:npg_bO89kXYrFGaM@ep-jolly-math-aogd14kc-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function getPrismaClient(): PrismaClient {
  const rawUrl =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DIRECT_URL ||
    NEON_DATABASE_URL

  const connectionString = rawUrl.trim().replace(/^["']|["']$/g, "")
  const adapter = new PrismaPg({ connectionString })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? getPrismaClient()

globalForPrisma.prisma = prisma
