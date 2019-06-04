const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const express = require('express');

async function main() {
	const script = fs.readFileSync('./scripts/index.js').toString('utf8');
	const style = fs.readFileSync('./styles/index.css').toString('utf8');

	const dataFileName = './data/quotes.json';

	let quotes = JSON.parse(fs.readFileSync(dataFileName));

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
		const quote = req.query.quote;
		res.render('item', { quote: quote });
		quotes.push(quote);
		fs.writeFileSync(dataFileName, JSON.stringify(quotes));
	});

	app.get('/remove', (req, res) => {
		const quote = req.query.quote;
		quotes = quotes.filter(it => it !== quote);
		fs.writeFileSync(dataFileName, JSON.stringify(quotes));
		res.send('OK');
	});

	app.get('/fetch', (req, res) => {
		fetch('https://favqs.com/api/qotd')
			.then(res => res.json())
			.then(json => res.send(json.quote.body));
	});

	const port = process.env.PORT || 8080;
	app.listen(port, () => {
		console.log(`Listening on port ${port}`);
	});
}

main();