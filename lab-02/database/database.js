
require("dotenv").config();

const path = require("path");
const { pathToFileURL } = require("url");
const { createClient } = require("@libsql/client");

const useTurso = process.env.DATABASE_MODE === "turso";

let db;

if (useTurso) {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error("Turso database credentials are missing.");
  }

  db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
  });

  console.log("Using Turso cloud database");
} else {
  const localDatabasePath = path.join(__dirname, "campus.db");

  db = createClient({
    url: pathToFileURL(localDatabasePath).href
  });

  console.log("Using local SQLite database");
}

const dbReady = db.execute(`
  CREATE TABLE IF NOT EXISTS equipment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK(quantity >= 0),
    location TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Available'
  )
`);

module.exports = { db, dbReady };
