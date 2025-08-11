import SQLite from "react-native-sqlite-storage"

SQLite.DEBUG(true)
SQLite.enablePromise(true)

const database_name = "BusinessTracker.db"
const database_version = "1.0"
const database_displayname = "Business Tracker Database"
const database_size = 200000

let db: SQLite.SQLiteDatabase

export const initializeDatabase = async () => {
  try {
    db = await SQLite.openDatabase(database_name, database_version, database_displayname, database_size)
    console.log("Database opened successfully")
    await createTables()
  } catch (error) {
    console.error("Database initialization error:", error)
    throw error
  }
}

const createTables = async () => {
  try {
    // Create customers table
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS customers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT,
        address TEXT,
        email TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // Create sales table
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS sales (
        id TEXT PRIMARY KEY,
        customer_id TEXT,
        amount REAL NOT NULL,
        cost REAL NOT NULL,
        profit REAL NOT NULL,
        description TEXT,
        sale_date TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers (id)
      );
    `)

    // Create transactions table
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        customer_id TEXT,
        type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
        amount REAL NOT NULL,
        description TEXT,
        category TEXT,
        transaction_date TEXT NOT NULL,
        is_temporary INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers (id)
      );
    `)

    // Create lending table
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS lending (
        id TEXT PRIMARY KEY,
        customer_id TEXT,
        type TEXT NOT NULL CHECK (type IN ('given', 'taken')),
        amount REAL NOT NULL,
        description TEXT,
        due_date TEXT,
        is_paid INTEGER DEFAULT 0,
        lending_date TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers (id)
      );
    `)

    console.log("All tables created successfully")
  } catch (error) {
    console.error("Error creating tables:", error)
    throw error
  }
}

export { db }
