const express = require('express');
const { open } = require('sqlite');
const path = require('path');
const sqlite3 = require('sqlite3');
const dbPath = path.join(__dirname, 'goodreads.db');
const app = express();

let db = null;

const initializedbAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
        app.listen(3000, () => {
            console.log("Server is running on port 3000")
        });
    } catch (e) {
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
};

app.get('/books/', async (req, res) => {
    const getBooks = `SELECT * FROM book ORDER BY book_id;`;
    const booksArray = await db.all(getBooks);
    response.send(booksArray);
})
initializedbAndServer();


