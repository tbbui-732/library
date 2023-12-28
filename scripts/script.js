// --- MODAL MENU ANIMATION ---
// Retrieve DOM elements
const bookContainer = document.querySelector(".add-book-container");
const addBooksBtn   = document.querySelector(".add-books-btn");
const submitBtn     = document.querySelector(".submit-btn");
const cancelBtn     = document.querySelector(".cancel-btn");


// --SHOW BOOK CONTAINER MODAL--
addBooksBtn.addEventListener("pointerdown", () => {
    bookContainer.style.display = "block";
    setTimeout(() => { // gives a little delay
        bookContainer.classList.add("show");
    }, 0)
});


// --HIDE BOOK CONTAINER MODAL--
cancelBtn.addEventListener("pointerdown", () => {   // cancel button clicked on
    bookContainer.classList.remove("show");
});

document.addEventListener("pointerdown", (e) => {   // area outside modal window clicked on
    if (!e.composedPath().includes(bookContainer)) {
        bookContainer.classList.remove("show");
    }
});

document.addEventListener("keydown", (e) => {       // escape button pressed down
    if (e.code === "Escape" && bookContainer.classList.contains("show")) {
        bookContainer.classList.remove("show");
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

// --ADD NEW BOOK--
// (TODO: give functionality for adding books when hitting the submit button)
submitBtn.addEventListener("pointerdown", () => {
    bookContainer.classList.remove("show");
});
