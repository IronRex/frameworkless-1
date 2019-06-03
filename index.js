const path = require('path');
const fs = require('fs');
const util = require('util');

const express = require('express');
const pug = require('pug');

async function main() {
	const script = fs.readFileSync('./scripts/index.js').toString('utf8');
	const style = fs.readFileSync('./styles/index.css').toString('utf8');

	const listItemView = pug.compileFile('./views/item.pug');

	const dataFileName = './data/quotes.json';

	const quotes = JSON.parse(fs.readFileSync(dataFileName));

	const app = express();

	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'pug');

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.get('/', (req, res) => {
		res.render('index', {
			quotes,
			script,
			style
		});
	});

	app.get('/add', (req, res) => {
		quotes.push(req.query.quote);
		res.send(JSON.stringify(listItemView({ quote: req.query.quote })));
		fs.writeFileSync(dataFileName, JSON.stringify(quotes));
	});

	const port = process.env.PORT || 8080;
	app.listen(port, () => {
		console.log(`Listening on port ${port}`);
	});
}

main();