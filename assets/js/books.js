class Books {
  constructor () {
    this.addNewButton = document.getElementById('addNewBook');
    this.title = document.getElementById('bookTitle');
    this.price = document.getElementById('bookPrice');

    this.handleNewBook = this.handleNewBook.bind(this);
    this.initListeners();
  }

  initListeners () {
    this.addNewButton.addEventListener('click', this.handleNewBook);
  }

  resetForm () {
    this.title.value = '123123';
    this.price.value = '12331132';
  }

  handleNewBook (e) {
    e.preventDefault();
    this.resetForm();
    $("#bookModal").modal();
  }
}

export default new Books();