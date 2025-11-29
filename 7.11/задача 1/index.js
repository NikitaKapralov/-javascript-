let books = [
    "Мастер и Маргарита",
    "Гарри Поттер",
    "За пропастью во ржи",
    "Властелин колец",
    "Дюна",
    "Отцы и дети"
];

function displayBooks() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    
    books.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.textContent = `${index + 1}) ${book}`;
        bookList.appendChild(bookItem);
    });
}

function addBook() {
    const bookTitle = prompt('Введите название книги:');
    
    if (bookTitle === null) return;
    
    if (bookTitle.trim() === '') {
        alert('Название книги не введено!');
        return;
    }
    
    books.push(bookTitle);
    displayBooks();
}

function searchBook() {
    const searchTerm = prompt('Введите название книги для поиска:');
    
    if (searchTerm === null) return;
    
    if (searchTerm.trim() === '') {
        alert('Пожалуйста, введите название для поиска!');
        return;
    }
    
    const bookItems = document.querySelectorAll('.book-item');
    bookItems.forEach(item => item.classList.remove('highlight'));
    
    let found = false;
    bookItems.forEach(item => {
        if (item.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
            item.classList.add('highlight');
            found = true;
        }
    });
    
    if (!found) alert('Книга не найдена!');
}

document.addEventListener('DOMContentLoaded', function() {
    displayBooks();
    document.getElementById('add-book').addEventListener('click', addBook);
    document.getElementById('search-book').addEventListener('click', searchBook);
});