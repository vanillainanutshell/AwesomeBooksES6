// Local Storage class
const bookContainer = document.querySelector('.book-container');
export class Storage {
    static getBookFromStorage() {
        let bookList;
        if (localStorage.getItem('bookList') === null) {
            bookList = [];
        } else {
            bookList = JSON.parse(localStorage.getItem('bookList'));
        }
        return bookList;
    }

    static addBookToStorage(book) {
        const bookList = Storage.getBookFromStorage();
        bookList.push(book);
        localStorage.setItem('bookList', JSON.stringify(bookList));
    }

    static removeFromStorage(id) {
        const bookList = Storage.getBookFromStorage();
        // eslint-disable-next-line eqeqeq
        const filteredBooks = bookList.filter((book) => book.id != id);
        localStorage.setItem('bookList', JSON.stringify(filteredBooks));
    }
}
// The dummy data class
export class DummyData {
    static displayData() {
        const collections = Storage.getBookFromStorage();
        collections.forEach((book) => DummyData.addBook(book));
    }

    static addBook(book) {
        const bookList = document.createElement('tr');
        bookList.classList.add('table-row');
        bookList.innerHTML = `
      <td>"${book.title}" by <span>${book.author}</span></td>
      <input class="hidden" type="hidden" value="${book.id}">
      <td><button class="delete">Remove</button></td>
      `;
        bookContainer.appendChild(bookList);
    }

    // Delete Book Method

    static removeBook(target) {
        if (target.classList.contains('delete')) {
            target.parentElement.parentElement.remove();
        }
    }
}