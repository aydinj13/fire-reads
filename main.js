document.addEventListener('DOMContentLoaded', function() {
    fetchTrendingBooks();
});

function fetchTrendingBooks() {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:bestsellers`)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                displayTrendingBooks(data.items.slice(0, 6)); // Displaying up to 6 books
            } else {
                throw new Error('No trending books found');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const trendingBooksContainer = document.getElementById('trending-books-container');
            trendingBooksContainer.innerHTML = '<p>No trending books found.</p>';
        });
}

function displayTrendingBooks(books) {
    const trendingBooksContainer = document.getElementById('trending-books-container');

    books.forEach(book => {
        const volumeInfo = book.volumeInfo;
        const bookElement = createBookElement(volumeInfo);
        trendingBooksContainer.appendChild(bookElement);
    });
}

function searchBooks() {
    const searchInput = document.getElementById('search-input').value;

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`)
        .then(response => response.json())
        .then(data => displayBooks(data.items))
        .catch(error => console.error('Error:', error));
}

function displayBooks(books) {
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = '';

    if (!books || books.length === 0) {
        booksContainer.innerHTML = '<p>No books found.</p>';
        return;
    }

    books.forEach(book => {
        const volumeInfo = book.volumeInfo;
        const bookElement = createBookElement(volumeInfo);
        booksContainer.appendChild(bookElement);
    });
}

function createBookElement(volumeInfo) {
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

    return bookElement;
}

