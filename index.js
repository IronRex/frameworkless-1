const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const script = fs.readFileSync('./scripts/index.js').toString('utf8');
const style = fs.readFileSync('./styles/index.css').toString('utf8');

const express = require('express');

const dataFileName = './data/quotes.json';
let quotes = JSON.parse(fs.readFileSync(dataFileName));

async function main() {
	const app = express();

	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'pug');

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.get('/', defaultHandler);
	app.get('/add', addHandler);
	app.get('/remove', removeHandler);
	app.get('/fetch', fetchHandler);

	const port = process.env.PORT || 8080;
	app.listen(port, () => {
		console.log(`Listening on port ${port}`);
	});
}

function defaultHandler(req, res) {
	res.render('index', {
		quotes,
		script,
		style
	});
}

function addHandler(req, res) {
	const quote = req.query.quote;
	res.render('item', { quote: quote });
	quotes.push(quote);
	fs.writeFileSync(dataFileName, JSON.stringify(quotes));
}

function removeHandler(req, res) {
	const quote = req.query.quote;
	quotes = quotes.filter(it => it !== quote);
	fs.writeFileSync(dataFileName, JSON.stringify(quotes));
	res.send('OK');
}

function fetchHandler(req, res) {
	fetch('https://favqs.com/api/qotd')
		.then(res => res.json())
		.then(json => res.send(json.quote.body));
}

main();