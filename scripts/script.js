// --- MODAL MENU ANIMATION ---
// Retrieve DOM elements
const bookContainer = document.querySelector(".add-book-container");
const addBooksBtn   = document.querySelector(".add-books-btn");
const submitBtn     = document.querySelector(".submit-btn");
const cancelBtn     = document.querySelector(".cancel-btn");
const modalBlur     = document.querySelector(".modal-blur");


// --SHOW BOOK CONTAINER MODAL--
addBooksBtn.addEventListener("pointerdown", () => {
    bookContainer.style.display = "block";
    setTimeout(() => {                              // gives a little delay
        bookContainer.classList.add("show");
        modalBlur.classList.add("active");
    }, 0)
});


// --HIDE BOOK CONTAINER MODAL--
cancelBtn.addEventListener("pointerdown", () => {   // cancel button clicked on
    bookContainer.classList.remove("show");
    modalBlur.classList.remove("active");
});

document.addEventListener("pointerdown", (e) => {   // area outside modal window clicked on
    if (!e.composedPath().includes(bookContainer)) {
        bookContainer.classList.remove("show");
        modalBlur.classList.remove("active");
    }
});

document.addEventListener("keydown", (e) => {       // escape button pressed down
    if (e.code === "Escape" && bookContainer.classList.contains("show")) {
        bookContainer.classList.remove("show");
        modalBlur.classList.remove("active");
    }
})

// --UPDATE BOOK CONTAINER--
bookContainer.addEventListener("transitionend", function(e) {
    if (!this.classList.contains("show")) {
        if (e.propertyName == "transform") {
            this.style.display = "";
        }
    }
});


// --- LOGIC FOR ADDING AND REMOVING BOOKS ---
// --DEFINING LIBRARY CLASSES--
class Library {
    constructor(library = []) {                     // Array of Book objects
        if (!Array.isArray(library)) {
            throw new Error('Library must be an array');
        }
        this.library = library;
    }

    addBook(book) {
        if (!Book.isBook(book)) {
            throw new Error('New book must be a Book object');
        }
        this.library.push(book);
    }

    removeBook(book) {
        const book_idx = library.indexOf(book);
        if (book_idx > -1) {
            library.splice(book_idx, 1);
        } else {
            throw new Error("{book} not found");
        }
    }
    printContent() {
        console.log("books currently in the library");
        this.library.forEach((book) => {
            console.log(book.title);
        })
    }
}


class Book {
    constructor(title, author, page_count, read) {
        this.title = title;
        this.author = author;
        this.page_count = page_count;
        this.read = read ? "yes" : "no";
    }
    printContent() {
        console.log(`Title: ${this.title}
Author: ${this.author}
Page count: ${this.page_count}
Read: ${this.read}`)
    }
    static isBook(book) {
        return book instanceof Book;
    }
}


// INSTANTIATING NEW LIBRARY OBJECT
const library = new Library();


function storeNewBookData(book) {
    const bookFormData = new FormData(book);                        // Convert form to FormData
    const bookFormDataObject = Object.fromEntries(bookFormData);
    const newBook = new Book(                                       // Create new Book object
        bookFormDataObject.title,
        bookFormDataObject.author,
        bookFormDataObject.page_count,
        bookFormDataObject.read
    );
    newBook.printContent();                                         // Log book information

    library.addBook(newBook);                                       // Add book to library
    // library.printContent();

    bookContainer.classList.remove("show");                         // Hide modal window
    modalBlur.classList.remove("active");
}
