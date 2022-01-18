/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import Book from './modules/book.js';
import { DummyData, Storage } from './modules/localstorage.js';
// import { currentTime } from './modules/time.js';
const form = document.querySelector('#form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const bookContainer = document.querySelector('.book-container');
const listLink = document.querySelector('.list');
const addNew = document.querySelector('.add-new');
const contact = document.querySelector('.contact-link');
const contactPage = document.querySelector('.contact');
const table = document.querySelector('.table-head');
const time = document.querySelector('.time');
const title = document.querySelector('.title');

// Event: display Books
document.addEventListener('DOMContentLoaded', DummyData.displayData);

// ADD A BOOK EVENT
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // get the form values, instantiate the Book class, add to collection, clear the input on submit.
    const title = titleInput.value;
    const author = authorInput.value;
    const id = Math.floor(Math.random() * 100);
    const book = new Book(title, author, id);
    if (!title || !author) {
        // eslint-disable-next-line no-alert
        alert('Please Input a title and author of a book');
    } else {
        DummyData.addBook(book);
        Storage.addBookToStorage(book);
        titleInput.value = '';
        authorInput.value = '';
    }
});

// REMOVE A BOOK EVENTs
bookContainer.addEventListener('click', (e) => {
    DummyData.removeBook(e.target);
    Storage.removeFromStorage(e.target.parentElement.previousElementSibling.value);
});

// this section handles the page navigation
listLink.addEventListener('click', () => {
    title.classList.remove('toggle');
    table.classList.remove('toggle');
    form.classList.add('toggle');
    contactPage.classList.add('toggle');
});

addNew.addEventListener('click', () => {
    form.classList.remove('toggle');
    table.classList.add('toggle');
    title.classList.add('toggle');
    contactPage.classList.add('toggle');
});

contact.addEventListener('click', () => {
    contactPage.classList.remove('toggle');
    form.classList.add('toggle');
    table.classList.add('toggle');
});

import { DateTime } from '../node_modules/luxon/src/luxon.js';

const startTime = () => {
    const now = DateTime.now();
    document.getElementById('time').innerHTML = now.toLocaleString(
        DateTime.DATETIME_MED,
    );
    setTimeout(startTime, 1000);
};

time.textContent = startTime();