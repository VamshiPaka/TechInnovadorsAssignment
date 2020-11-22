const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
require('dotenv').config()


//database connection
const uri = `mongodb+srv://vamshi:${process.env.DB_PASSWORD}@library.5cvhr.mongodb.net/${process.env.DB_UNAME}?retryWrites=true&w=majority`;  

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('MongoDB Connected…');
	})
	.catch((err) => console.log(err));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
