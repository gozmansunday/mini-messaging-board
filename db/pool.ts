// External Imports
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const dbUrl = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: dbUrl,
});

export default pool;
