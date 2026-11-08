import "dotenv/config";
import { defineConfig } from "prisma/config";

const NEON_DIRECT_URL =
  "postgresql://neondb_owner:npg_bO89kXYrFGaM@ep-jolly-math-aogd14kc.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url:
      process.env["DIRECT_URL"] ||
      process.env["DATABASE_URL_UNPOOLED"] ||
      process.env["DATABASE_URL"] ||
      NEON_DIRECT_URL,
  },
});
