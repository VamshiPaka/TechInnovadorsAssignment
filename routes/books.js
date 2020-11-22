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
router.post('/addbook', async (req, res) => {
	const book = new Book({
		title: req.body.title,
		publication: req.body.publication,
		author: req.body.author,
		publishedAt: req.body.publishedAt,
		category: req.body.category,
		cost: req.body.cost,
		isBestSeller: req.body.isBestSeller
	});
	//save to database
	try {
		const savedBook = await Book.save();
		res.json(savedBook).status(200);
	} catch (err) {
		res.json({ message: err }).status(500);
	}
});

//get books by authors JK Rowling and JRR Tolkien
router.get('/author', async (req, res) => {
	try {
		const findBookByJK = await Book.find({ author: { $eq: 'J. K. Rowling' } });
		const findBookByRR = await Book.find({ author: { $eq: 'J. R. R. Tolkien' } });
		const findBooks = findBookByJK.concat(findBookByRR);
		res.json(findBooks);
	} catch (error) {
		res.send(error);
	}
});

// Get all books by multiple authors
router.get('/:authorname', async (req, res) => {
	try {
		const data = req.params.author;
		const search = data.split('&');
		const findBooks = await Book.aggregate([
			{ $match: { $and: [ { author: search[0] }, { author: search[1] } ] } }
		]);
		res.json(findBooks);
	} catch (error) {
		res.json({ message: error });
	}
});

//Get all books Published in between years 1997 and 1980

router.get('/year', async (req, res) => {
	try {
		const findBooks = await Book.find({ publishedAt: { $gte: 1997, $lte: 1980 } });
		res.json(findBooks);
	} catch (error) {
		res.json({ message: error });
	}
});

//get all books that cost between Rs 1000 and 2000
router.get('/allBooksByCost', async (req, res) => {
	try {
		const findBooks = await Book.find({ cost: { $gte: 1000, $lte: 2000 } });
		res.json(findBooks);
	} catch (error) {
		res.json({ message: error });
	}
});

//get average cost of all books
router.get('/avgCost', async (req, res) => {
	try {
		const avgBooks = await Book.aggregate([ { $match: {} }, { $group: { _id: '_id', count: { $avg: '$cost' } } } ]);
		res.json(avgBooks);
	} catch (error) {
		res.json({ message: error });
	}
});

//update the cost by Rs 100 by finding category
router.post('/updateCost', async (req, res) => {
	try {
		const update = await Book.find({ category: req.body.category });

		update.map(async (val) => {
			var UpdateCost = val.cost + 100;
			await Book.findByIdAndUpdate({ _id: val._id }, { cost: UpdateCost }, { new: true });
		});

		res.json({ message: 'Cost Updated' });
	} catch (error) {
		res.json({ message: error });
	}
});

//delete book by title
router.delete('/delete', async (req, res) => {
	try {
		const deleteBook = await Book.findOneAndDelete({ title: req.body.title });
		res.json({ message: deleteBook });
	} catch (error) {
		res.json({ message: error });
	}
});

//update Id
router.post('/update/:id', async (req, res) => {
	try {
		const update = await Book.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
		res.json({ message: update });
	} catch (error) {
		res.json({ message: error });
	}
});

module.exports = router;
