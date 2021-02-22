// Globals
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system

const dbFileName = "flash.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);  // object, not database.

// Initialize table.
// If the table already exists, causes an error.
// Fix the error by removing or renaming flash.db
const cmdStr = 'CREATE TABLE flashcards (user INT , en TEXT, es TEXT, seen INT, correct INT, score INT)';
const addTable = 'CREATE TABLE users(userID INT , firstName TEXT, lastName TEXT)';
db.run(addTable,tableCreationCallback);
db.run(cmdStr,tableCreationCallback);

// Always use the callback for database operations and print out any
// error messages you get.
// This database stuff is hard to debug, give yourself a fighting chance.

function tableCreationCallback(err) {
    if (err) {
	console.log("Table creation error",err);
    } else {
	console.log("Database created");
	db.close();
    }
}