const myLibrary = [];
const bookCardsContainer = document.getElementById("books-container");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookCard(title, author, pages) {
    const newCardHTML = `
      <div class="book-card">
        <div class="book-title">${title}</div>
        <div class="book-author">${author}</div>
        <div class="book-pages">${pages} pages</div>
      </div>
    `;
    bookCardsContainer.insertAdjacentHTML('beforeend', newCardHTML); 
}

function addBookToLibrary(title, author, pages) {
    const mybook = new Book(title, author, pages, false)
    myLibrary.push(mybook);
    // replace with loading from library db in future
    bookCardsContainer.innerHTML = "";
    myLibrary.forEach(book => addBookCard(book.title, book.author, book.pages));
}








