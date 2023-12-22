import type { Config } from "drizzle-kit";
import { env } from "@/lib/env.mjs";

export default {
  schema: "./lib/db/schema",
  out: "./lib/db/migrations",
  driver: "better-sqlite",
  dbCredentials: {
    url: env.DATABASE_URL,
  }
} satisfies Config;