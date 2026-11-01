
require("dotenv").config();

const { createClient } = require("@libsql/client");

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

async function testConnection() {
  try {
    const result = await db.execute("SELECT 1 AS connected");
    console.log("Turso connected successfully!");
    console.log(result.rows);
  } catch (error) {
    console.error("Connection failed:", error.message);
    process.exitCode = 1;
  } finally {
    db.close();
  }
}

testConnection();
