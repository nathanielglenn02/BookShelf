document.addEventListener('DOMContentLoaded', function () {
    const bookForm = document.getElementById('bookForm');
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const year = document.getElementById('year');
    const isComplete = document.getElementById('isComplete');
    const unfinishedBooks = document.getElementById('unfinishedBooks');
    const finishedBooks = document.getElementById('finishedBooks');

    bookForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });

    function addBook() {
        const book = {
            id: +new Date(),
            title: title.value,
            author: author.value,
            year: parseInt(year.value),
            isComplete: isComplete.checked
        };
        let books = getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
        renderBooks();
        bookForm.reset();
    }

    function getBooks() {
        return JSON.parse(localStorage.getItem('books')) || [];
    }

    function renderBooks() {
        unfinishedBooks.innerHTML = '';
        finishedBooks.innerHTML = '';
        const books = getBooks();
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');
            bookElement.innerHTML = `
                <p>${book.title} (${book.year}) by ${book.author}</p>
                <button onclick="removeBook(${book.id})">Delete</button>
                <button onclick="toggleBook(${book.id})">${book.isComplete ? 'Move to Unfinished' : 'Move to Finished'}</button>
            `;
            if (book.isComplete) {
                finishedBooks.appendChild(bookElement);
            } else {
                unfinishedBooks.appendChild(bookElement);
            }
        });
    }

    window.removeBook = function (id) {
        let books = getBooks();
        books = books.filter(book => book.id !== id);
        localStorage.setItem('books', JSON.stringify(books));
        renderBooks();
    };

    window.toggleBook = function (id) {
        let books = getBooks();
        const book = books.find(book => book.id === id);
        book.isComplete = !book.isComplete;
        localStorage.setItem('books', JSON.stringify(books));
        renderBooks();
    };

    renderBooks();
});