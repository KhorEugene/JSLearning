function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
    }
}

const book1 = new Book('The Hobbit', 'JRR Tolkien', '295', true);
console.log(book1.info()); // logs 'The Hobbit by JRR Tolkien, 295 pages, read'
console.log(book1.valueOf());
console.log(book1.hasOwnProperty('valueOf')); // false
console.log(Object.prototype.hasOwnProperty('valueOf')); // true

console.log(Object.getPrototypeOf(book1) === Book.prototype) // true
Book.prototype.sayHello = function() {
    console.log('Hello');
}

book1.sayHello();

console.log(Object.getPrototypeOf(Book.prototype));

// Don't do this!
// Player.prototype = Person.prototype;
// Do this instead
// Object.setPrototypeOf(Player.prototype, Person.prototype)


https://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@github.com/KhorEugene/JSLearning.git
https://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@github.com/KhorEugene/JSLearning.git
