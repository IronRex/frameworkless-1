(function() {
	const listOfQuotes = document.querySelector('.list-of-quotes');
	const addButton = document.querySelector('.add-quote-button');
	const addTextField = document.querySelector('.add-quote-text');

	addButton.addEventListener('click', () => {
		if(addTextField.value) {
			fetch(`/add?quote=${addTextField.value}`)
				.then(response => response.json())
				.then((html => {
					listOfQuotes.innerHTML = listOfQuotes.innerHTML += html;
					addTextField.value = '';
				}));
		}
	});
})();
