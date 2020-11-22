const express = require('express');
const router = express.Router();

const Book = require('../models/books');

//route to get list of all books
router.get('/', async (req, res) => {
	try {
		const books = await Book.find();
		res.json(books);
	} catch (err) {
		res.json({ message: err });
	}
});

//adds a book
router.post('/', async (req, res) => {
	const book = new Book({
		title: req.body.title,
		publication: req.body.publication,
		author: req.body.author,
		publishedAt: req.body.publishedAt,
		category: req.body.category,
		cost: req.body.cost
	});
	//save to database
	try {
		const savedBook = await book.save();
		res.json(savedBook);
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
