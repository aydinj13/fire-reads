/*
document.addEventListener('DOMContentLoaded', function() {
    searchBooks(); // Display default search results on page load
    fetchOurBooks(); // Fetch and display Harry Potter books
});


function fetchOurBooks() {
    fetch('https://www.googleapis.com/books/v1/volumes?q=intitle:harry%20potter')
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                displayOurBooks(data.items); // Display all Harry Potter books
            } else {
                const ourPicksContainer = document.getElementById('our-picks-container');
                ourPicksContainer.innerHTML = '<p>No Harry Potter books found.</p>';
            }
        })
        .catch(error => console.error('Error:', error));
}


function displayOurBooks(books) {
    const ourPicksContainer = document.getElementById('our-picks-container');

    if (!books || books.length === 0) {
        ourPicksContainer.innerHTML = '<p>No Harry Potter books found.</p>';
        return;
    }

    books.forEach(book => {
        const volumeInfo = book.volumeInfo;
        const bookElement = createBookElement(volumeInfo);
        ourPicksContainer.appendChild(bookElement);
    });
}
*/


/* Searches for a book */
function searchBooks() {
    const searchInput = document.getElementById('search-input').value;

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`)
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