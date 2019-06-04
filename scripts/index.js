(function() {
	const listOfQuotes = document.querySelector('.list-of-quotes');
	const addQuoteButton = document.querySelector('.add-quote-button');
	const randomQuoteButton = document.querySelector('.random-quote-button');
	const addQuoteText = document.querySelector('.add-quote-text');

	addQuoteButton.addEventListener('click', () => {
		if(addQuoteText.value) {
			fetch(`/add?quote=${addQuoteText.value}`)
				.then(response => response.text())
				.then((html => {
					listOfQuotes.innerHTML = listOfQuotes.innerHTML += html;
					addQuoteText.value = '';
				}));
		}
	});

	listOfQuotes.addEventListener('click', event => {
		if (event.target.classList.contains('delete-quote-button')) {
			const quote = event.target.getAttribute('data-text');
			fetch(`/remove?quote=${quote}`)
				.then(response => response.text())
				.then((() => {
					const elements = document.querySelectorAll(`.list-of-quotes li button[data-text='${quote.replace("'", "\\'")}']`);
					for (let i = 0; i < elements.length; i++) {
						elements[i].parentElement.remove();
					}
				}));
		}
	});

	randomQuoteButton.addEventListener('click', () => {
		fetch('/fetch')
			.then(response => response.text())
			.then(text => {
				addQuoteText.value = text;
			});
	});


})();
