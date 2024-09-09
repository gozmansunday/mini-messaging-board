// External Imports
import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("DATABASE_URL environment variable is missing.");
}

const createTableSQL = `
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  message VARCHAR,
  username VARCHAR(255),
  added TIMESTAMP
);
`;

const insertMessagesSQL = `
INSERT INTO messages (message, username, added)
VALUES ($1, $2, $3)
`;

const messages = [
  ["You should have done the deed, stranger!", "Gozman", "2024-08-28 03:23:00"],
  ["I told him, but he wouldn't listen.", "Saint", "2024-08-28 03:23:00"],
  [
    "I won't do the deed, and I won't listen to you guys.😛",
    "Awrific",
    "2024-08-28 03:27:00",
  ],
  ["What the actual fuck??? Are you insane?!", "Gozman", "2024-08-28 18:30:00"],
  ["asdfds", "anil", "2024-08-30 04:11:00"],
];

const main = async () => {
  console.log("Seeding the database...");

  const client = new Client({
    connectionString: dbUrl,
  });

  try {
    await client.connect();
    console.log("Connected to the database.");

    // Create the table
    await client.query(createTableSQL);
    console.log("Table created or already exists.");

    // Insert messages
    for (const message of messages) {
      await client.query(insertMessagesSQL, message);
    }
    console.log("Messages inserted successfully.");
  } catch (err) {
    console.error("Error during database operation:", err);
  } finally {
    await client.end();
    console.log("Database connection closed.");
  }
};

main();
