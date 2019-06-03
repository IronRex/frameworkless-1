(function() {
	const listOfQuotes = document.querySelector('.list-of-quotes');
	const addButton = document.querySelector('.add-quote-button');
	const addTextField = document.querySelector('.add-quote-text');

	addButton.addEventListener('click', () => {
		if(addTextField.value) {
			fetch(`/add?quote=${addTextField.value}`)
				.then(response => response.text())
				.then((html => {
					listOfQuotes.innerHTML = listOfQuotes.innerHTML += html;
					addTextField.value = '';
				}));
		}
	});

	listOfQuotes.addEventListener('click', (event) => {
		if (event.target.classList.contains('delete-quote-button')) {
			const quote = event.target.getAttribute('data-text');
			fetch(`/remove?quote=${quote}`)
				.then(response => response.text())
				.then((() => {
					const elements = document.querySelectorAll(`.list-of-quotes li button[data-text='${quote}']`);
					for (let i = 0; i < elements.length; i++) {
						elements[i].parentElement.remove();
					}
				}));
		}
	});
})();
