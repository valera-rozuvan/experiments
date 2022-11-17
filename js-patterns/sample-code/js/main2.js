// handler2 = catalog1
// collection of books about cars
var Handler1 = function () {
    // Do something.
    this.catalogType = 'cars';
    this.nextCatalog = null;

    this.bookList = [];
};
Handler1.prototype.handleRequest = function (obj) {
    if (obj.type === this.catalogType) {
        this.bookList.push(obj);
    }

    if (this.nextCatalog !== null) {
        this.nextCatalog.handleRequest(obj);
    }
};

// handler2 = catalog2
// collection of books about nature
var Handler2= function () {
    // Do something.
    this.catalogType = 'nature';
    this.nextCatalog = null;
};
Handler2.prototype.handleRequest = function (obj) {
    if (obj.type === this.catalogType) {
        this.bookList.push(obj);
    }

    if (this.nextCatalog !== null) {
        this.nextCatalog.handleRequest(obj);
    }
};

// manager = library
function manager() {
    var allCatalogs = [],
        allBooks = [];

    function addBook(newBook) {
        if (allCatalogs.length) {
            allCatalogs[0].handleRequest(newBook);
        }
    }

    function addNewCatalog(newCatalog) {
        allCatalogs.push(newCatalog);

        if (allCatalogs.length - 2 >= 0) {
            allCatalogs[allCatalogs.length - 2].nextCatalog = newCatalog;
        }
    }

    return {
        addBook: addBook
        addNewCatalog: addNewCatalog
    };
}

var cat1 = new Handler1(); // cars
var cat2 = new Handler2(); // nature

var library1 = manager();

library1.addNewCatalog(cat1);
library1.addNewCatalog(cat2);

// client = person who brings new book
function client() {
    var newCatalog, newBook;

    while() {
        if (newCatalog = newCatalogIsCreated()) {
            library1.addNewCatalog(newCatalog);
        }

        if (newBook = newBookArives()) {
            library1.addBook(newBook);
        }
    }
}
