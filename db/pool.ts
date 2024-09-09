// External Imports
import { Pool } from "pg";

const dbUrl = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: dbUrl,
});

export default pool;
