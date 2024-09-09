// Local Imports
import pool from "./pool";

export const getAllMessages = async () => {
  const { rows } = await pool.query(`
    SELECT * FROM messages
  `);

  return rows;
};

export const getMessageById = async (id: number) => {
  const { rows } = await pool.query(
    `
    SELECT * FROM messages
    WHERE id = $1
    `,
    [id]
  );

  return rows[0];
};

export const insertMessage = async (text: string, author: string) => {
  await pool.query(
    `
    INSERT INTO messages (message, username, added)
    VALUES ($1, $2, $3)
    `,
    [text, author, new Date()]
  );
};
