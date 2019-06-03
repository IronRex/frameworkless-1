const path = require('path');
const fs = require('fs');

const express = require('express');

const script = fs.readFileSync('./scripts/index.js').toString('utf8');
const style = fs.readFileSync('./styles/index.css').toString('utf8');

console.log('script', script);
console.log('style', style);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.render('index', {
		script,
		style
	});
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});