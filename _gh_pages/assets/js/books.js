
const BOOKS_API = 'http://localhost:8000/api/v1'

class Books {
  constructor () {
    this.addNewButton = document.getElementById('addNewBook');
    this.title = document.getElementById('bookTitle');
    this.price = document.getElementById('bookPrice');
    this.createBookBtn = document.getElementById('createBook');

    this.bodyTable = $('#bodyTable');

    this.handleNewBook = this.handleNewBook.bind(this);
    this.createBook = this.createBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.initListeners();
    this.loadBooksAsyncAwait();
  }

  initListeners () {
    this.addNewButton.addEventListener('click', this.handleNewBook);
    this.createBookBtn.addEventListener('click', this.createBook);
    $(document).delegate(".deleteBook", "click", this.deleteBook)
  }

  deleteBook(evt) {
    this.loadBooksAsyncAwait()
    console.log($(evt.currentTarget).data("id"))
  }

  resetForm () {
    this.title.value = '';
    this.price.value = '';
  }

  handleNewBook (e) {
    e.preventDefault();
    this.resetForm();
    $("#bookModal").modal();
  }

  createBook(e) {
    e.preventDefault();

    const title = this.title.value;
    const price = this.price.value;

    axios.post(`${BOOKS_API}/books`, {
      title: title,
      price: parseFloat(price)
    })
    .then(result => {
      if (result.status === 200) {
        this.loadBooks()
        this.resetForm()
        $("#bookModal").modal('hide');
      }
    })
    .catch(err => {
      if (err.response.status === 400) {
        alert("La richiesta inviata non è corretta")
      }
    })
  }

  loadBooks() {
    this.bodyTable.empty();

    axios.get(`${BOOKS_API}/books`)
      .then(result => {
        const books = result.data;

        console.log(books)

        for (const book of books) {
          this.bodyTable.append(`
            <tr>
              <td>${book.id}</td>
              <td>${book.title}</td>
              <td>${new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(book.price)}</td>
            </tr>
          `)
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  async loadBooksAsyncAwait () {
    this.bodyTable.empty();

    try {
      const result = await axios.get(`${BOOKS_API}/books`);
      const books = result.data;

      for (const book of books) {
        this.bodyTable.append(`
          <tr>
            <td><a href="#" class="btn btn-danger btn-sm deleteBook" data-id="${book.id}">Elimina</a></td>
            <td>${book.title}</td>
            <td>${new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(book.price)}</td>
          </tr>
        `)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export default new Books();