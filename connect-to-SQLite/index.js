const express = require('express')
const path = require('path')

const { open } = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()
const dbPath = path.join(__dirname, 'goodreads.db')

let db = null

const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        })
        app.listen(3000, () => {
            console.log('Server Running at PORT 3000')
        })
    } catch (e) {
        console.log(`DB Error: ${e.message}`)
        process.exit(1)
    }
}
initializeDBAndServer()

// Get Books API
app.get('/books/', async (request, response) => {
    const getBooksQuery = `
    SELECT
      *
    FROM
      book
    ORDER BY
      book_id;`
    const booksArray = await db.all(getBooksQuery)
    response.send(booksArray)
})

app.get('/books/:bookId/', async (req, res) => {
    const { bookId } = req.params;
    const getBookQuery = `
    SELECT
      *
    FROM
      book
    WHERE
      book_id=${bookId};`
    const book = await db.get(getBookQuery);
    res.send(book);
})


