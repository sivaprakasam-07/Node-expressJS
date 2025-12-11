const express = require('express')
const { open } = require('sqlite')
const path = require('path')
const sqlite3 = require('sqlite3')
const dbPath = path.join(__dirname, 'goodreads.db')
const app = express()

app.use(express.json)

let db = null

const initializedbAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        })
        app.listen(4000, () => {
            console.log('Server is running on port 4000')
        })
    } catch (e) {
        console.log(`DB Error: ${e.message}`)
        process.exit(1)
    }
}

app.get('/books/', async (req, res) => {
    const getBooks = `SELECT * FROM book ORDER BY book_id;`
    const booksArray = await db.all(getBooks)
    res.send(booksArray)
})

app.get('/books/:bookId', async (req, res) => {
    const { bookId } = req.params
    const getBooks_id = `SELECT * FROM book WHERE book_id=${bookId};`
    const book = await db.get(getBooks_id)
    res.send(book)
})

app.post('/books/', async (req, res) => {
    const bookDetails = req.body
    const {
        title,
        authorId,
        rating,
        ratingCount,
        reviewCount,
        description,
        pages,
        dateOfPublication,
        editionLanguage,
        price,
        onlineStores,
    } = bookDetails
    const addBookQuery = `
    INSERT INTO
      book (title,author_id,rating,rating_count,review_count,description,pages,date_of_publication,edition_language,price,online_stores)
    VALUES
      (
        '${title}',
         ${authorId},
         ${rating},
         ${ratingCount},
         ${reviewCount},
        '${description}',
         ${pages},
        '${dateOfPublication}',
        '${editionLanguage}',
         ${price},
        '${onlineStores}'
      );`

    const addBook = await db.run(addBookQuery)
    res.send(addBook)
})
initializedbAndServer()
