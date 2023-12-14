

/* Searches for a book */
function searchBooks() {
    const searchInput = document.getElementById('search-input').value;

    fetch(`https://www.googleapis.com/books/v1/volumes?q=genre:${searchInput}`)
        .then(response => response.json())
        .then(data => displayBooks(data.items))
        .catch(error => console.error('Error:', error));
}

/* Displays results */
function displayBooks(books) {
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = '';

    if (!books || books.length === 0) {
        booksContainer.innerHTML = '<p>No books found.</p>';
        return;
    }

    books.forEach(book => {
        const volumeInfo = book.volumeInfo;
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        const title = volumeInfo.title ? volumeInfo.title : 'Title not available';
        const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Author not available';
        const thumbnail = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '';
        const infoLink = volumeInfo.infoLink ? volumeInfo.infoLink : '#';

        bookElement.innerHTML = `
            <a href="${infoLink}" target="_blank">
                <img src="${thumbnail}" alt="${title}">
                <p class="book-title">${title}</p>
                <p>By: ${authors}</p>
            </a>
        `;

        booksContainer.appendChild(bookElement);
    });
}

function goBack() {
    window.history.back();
}

document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to book elements to display the description on click
    const bookElements = document.querySelectorAll('.book');
    bookElements.forEach(book => {
        book.addEventListener('click', () => {
            const description = book.getAttribute('data-description');
            displayModal(description);
        });
    });

    // Function to display the modal with the description
    function displayModal(description) {
        const modalDescription = document.getElementById('modal-description');
        modalDescription.textContent = description;

        const modal = document.getElementById('modal');
        modal.style.display = 'block';

        // Close the modal when the 'x' (close) button is clicked
        const closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close the modal when clicking outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});