// --- MODAL MENU ANIMATION ---

// retrieve dom elements
const bookContainer = document.querySelector(".add-book-container");
const addBooksBtn   = document.querySelector(".add-books-btn");
const submitBtn     = document.querySelector(".submit-btn");
const cancelBtn     = document.querySelector(".cancel-btn");

// show book container if "add book" button is clicked on
addBooksBtn.addEventListener("pointerdown", () => {
    bookContainer.style.display = "block";
    setTimeout(() => {
        bookContainer.classList.add("show");
    }, 0)
});

// hide book container if "cancel" button is clicked on
cancelBtn.addEventListener("pointerdown", () => {
    bookContainer.classList.remove("show");
});

// add dummy function (TODO: give functionality for adding books when hitting the submit button)
submitBtn.addEventListener("pointerdown", () => {
    bookContainer.classList.remove("show");
});

// update book container when a transition ends
bookContainer.addEventListener("transitionend", function(e) {
    if (!this.classList.contains("show")) {
        if (e.propertyName == "transform") {
            this.style.display = "";
        }
    }
});
