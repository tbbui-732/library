// --- MODAL MENU ANIMATION ---
// Retrieve DOM elements
const bookContainer = document.querySelector(".add-book-container");
const addBooksBtn   = document.querySelector(".add-books-btn");
const submitBtn     = document.querySelector(".submit-btn");
const cancelBtn     = document.querySelector(".cancel-btn");
const modalBlur     = document.querySelector(".modal-blur");
// const deleteBookBtn = document.querySelector(".delete");


// --SHOW BOOK CONTAINER MODAL--
addBooksBtn.addEventListener("pointerdown", () => {
    bookContainer.style.display = "block";
    setTimeout(() => {                                      // Gives a little delay
        bookContainer.classList.add("show");
        modalBlur.classList.add("active");
    }, 0)
});


// --HIDE BOOK CONTAINER MODAL--
cancelBtn.addEventListener("pointerdown", () => {           // Cancel button clicked on
    bookContainer.classList.remove("show");
    modalBlur.classList.remove("active");
});

document.addEventListener("pointerdown", (e) => {           // Area outside modal window clicked on
    if (!e.composedPath().includes(bookContainer)) {
        bookContainer.classList.remove("show");
        modalBlur.classList.remove("active");
    }
});

document.addEventListener("keydown", (e) => {               // Escape button pressed down
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

        this.library.forEach((libBook) => {
            if (book.id == libBook.id) {
                alert("Book already exists in library! Create a new title!");
                throw new Error("Book already exists in library");
            }
        });

        this.library.push(book);
    }

    removeBook(book) {
        const book_idx = this.library.indexOf(book);
        if (book_idx > -1) {
            this.library.splice(book_idx, 1);
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

    display() {
        const libraryContainer = document.querySelector(".library-container");
        libraryContainer.innerHTML = "";                                // Clear existing content

        this.library.forEach((book) => {
            const bookDiv       = document.createElement("div");        // Create HTML book elements
            const titleHeader   = document.createElement("h2"); 
            const authorPg      = document.createElement("p");
            const pageCountPg   = document.createElement("p");
            const readButton    = document.createElement("button");
            const deleteButton  = document.createElement("button");

            bookDiv.classList.add("book");                              // Set each element's classname
            titleHeader.classList.add("title");
            authorPg.classList.add("author");
            pageCountPg.classList.add("page-count");
            readButton.classList.add("read");
            deleteButton.classList.add("delete");

            titleHeader.innerHTML   = `${book.title}`;                  // Set element content
            authorPg.innerHTML      = `Author: ${book.author}`;
            pageCountPg.innerHTML   = `Page count: ${book.page_count}`;
            readButton.innerHTML    = `Read: ${book.read}`;
            deleteButton.innerHTML  = "Delete";
    
            readButton.addEventListener("click", () => {
                console.log("Updating read status");
                if (book.read === "no") {
                    book.read = "yes";
                } else {
                    book.read = "no";
                }
                library.display();
            });

            deleteButton.addEventListener("click", () => {              // Delete book event listener
                console.log(`Deleting ${book.title}`);
                library.removeBook(book);
                library.display();
            });

            bookDiv.appendChild(titleHeader);                           // Append children elements to book div
            bookDiv.appendChild(authorPg);
            bookDiv.appendChild(pageCountPg);
            bookDiv.appendChild(readButton);
            bookDiv.appendChild(deleteButton);

            libraryContainer.appendChild(bookDiv);                      // Append books to library
        });
    }
}

function createBookID(title, author, page_count) {                      // Hashing function based off of djb2 [http://www.cse.yorku.ca/~oz/hash.html]
    const combinedStr = `${title}${author}${page_count}`;
    let hash = 5381;
    for (let i = 0; i < combinedStr.length; i++) {
        const charCode = combinedStr.charCodeAt(i);
        hash = ((hash << 5) + hash) + charCode;
    }

    return hash >>> 0;
}

class Book {
    constructor(title, author, page_count, read) {
        this.title = title ? title : "";
        this.author = author ? author : "";
        this.page_count = page_count ? page_count : 0;
        this.read = read ? "yes" : "no";
        this.id = createBookID(this.title, this.author, this.page_count);
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
    library.display();
    // library.printContent();

    bookContainer.classList.remove("show");                         // Hide modal window
    modalBlur.classList.remove("active");
}
