const myLibrary = [];
const bookCardsContainer = document.getElementById('main-content');

function generateUniqueId() {
  // Get the current timestamp in milliseconds
  const timestamp = Date.now().toString(36); // Base 36 for shorter IDs

  // Generate a random string of 8 characters
  const randomString = Math.random().toString(36).substring(2, 10);

  // Combine timestamp and random string to create a unique ID
  return `${timestamp}-${randomString}`; 
}

class Book{
  constructor(title, author, pages, read, bookId) {
    // invokes the setter
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read1 = read;
    this.bookId = bookId;
  }

  set done(value) {
      this.read = value;
  }
}

function rerenderPage(library){
  bookCardsContainer.innerHTML = "";
  library.forEach(book => addBookCard(book.title, book.author, book.pages, book.read, book.bookId));
}

function addBookCard(title, author, pages, read, bookId, imageUrl) {
  const newCardHTML = `
    <div class="book-card ${read ? 'read' : ''}" data-book-id="${bookId}">
      <div class="card-metadata">
        <div class="book-title">${title}</div>
        <div class="book-author">${author}</div>
        <div class="book-pages">${pages} pages</div>
      </div>
      <div class="book-cover">
        <img src="${imageUrl || 'default-image.jpg'}" alt="${title} cover">
      </div>
      <div class="button-container">  </div>
    </div>
  `;
  bookCardsContainer.insertAdjacentHTML('beforeend', newCardHTML); 


  const buttonContainer = bookCardsContainer.lastElementChild.querySelector('.button-container'); // Select the new button container

  const readButton = document.createElement('button');
  readButton.textContent = read ? 'Not Read' : 'Read';
  readButton.classList.add('toggle-read-button');
  buttonContainer.appendChild(readButton);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('show-id-button');
  buttonContainer.appendChild(deleteButton);

  const bookCoverDiv = bookCardsContainer.lastElementChild.querySelector('.book-cover');
  if (!imageUrl) { // Only add default text if no image URL is provided
    bookCoverDiv.textContent = "No Image Available"; // You can style this further with CSS
  }
}

function getReadStatus(bookId) {
  const book = myLibrary.find(book => book.bookId === bookId);

  if (book) {
    return book.read ? "Read" : "Not Read";
  } else {
    return null; // Or you could return "Not Found" or another suitable message
  }
}

function toggleReadStatus(bookId) {
  const bookIndex = myLibrary.findIndex(book => book.bookId === bookId);

  if (bookIndex !== -1) {
    myLibrary[bookIndex].done = !myLibrary[bookIndex].read; 
    return true; // Indicate success
  } else {
    return false; // Indicate book not found
  }
}

function addBookToLibrary(title, author, pages, read) {
    const bookId = generateUniqueId();
    const mybook = new Book(title, author, pages, read, bookId)
    myLibrary.push(mybook);  // replace with adding from db
    // add loading new myLibrary loading from library db
    rerenderPage(myLibrary)
}

function deleteBook(bookId) {
  const index = myLibrary.findIndex(book => book.bookId === bookId);

  if (index > -1) {
    myLibrary.splice(index, 1);
  } // replace with deleting from db
  // add loading new myLibrary loading from library db
  rerenderPage(myLibrary)
}

addBookToLibrary("Sinistro", "Jonathan Brooks", 221, false)
addBookToLibrary("Robinson Thomas", "Eugene Khor", 30, false)
addBookToLibrary("Adventures of Billy Johnson", "Johnson", 534, false)
addBookToLibrary("Telly Bubbies", "Momo Ron", 121, false)

const addBookForm = document.getElementById('add-book-form');

addBookForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from reloading the page
    console.log("print");

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;

    addBookToLibrary(title, author, pages);

    addBookForm.reset();
});


document.addEventListener('click', function(event) {
  if (event.target.classList.contains('show-id-button')) {  // Or another suitable selector
    const bookCard = event.target.closest('.book-card');  
    const bookId = bookCard.dataset.bookId;
    deleteBook(bookId);
  }

  if (event.target.classList.contains('toggle-read-button')) {  // Or another suitable selector
    const bookCard = event.target.closest('.book-card');
    const bookId = bookCard.dataset.bookId;
    toggleReadStatus(bookId);  // replace with updating DB directly
    // add loading new myLibrary loading from library db
    rerenderPage(myLibrary)
  }
});








