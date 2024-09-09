// External Imports
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const dbUrl =
  process.env.DATABASE_URL ??
  "postgresql://postgres:AMvmsyUumLhVsYCelIKrInqvihkBUuyU@junction.proxy.rlwy.net:37273/railway";

const pool = new Pool({
  connectionString: dbUrl,
});

export default pool;
