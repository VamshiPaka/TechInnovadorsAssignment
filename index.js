const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

//import routes
const booksRoute = require('./routes/books');

//database connection

mongoose
	.connect(process.env.DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('MongoDB Connected…');
	})
	.catch((err) => console.log(err));

//Middlewares(functions that are executed when a specific route is hit)

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/books', booksRoute);

app.get('/', (req, res) => {
	res.send('This is Home Route');
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
