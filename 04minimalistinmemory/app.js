// NodeJS and Express application
// With in memory database

var http    = require('http');
var express = require('express');
var swig    = require('swig');
var _       = require('underscore');

var app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', 'views/');

swig.setFilter('currency',  function(value) {
  return '$' + value.toFixed(2);
});

var booksData = [
    {
        bookName: "The art of computer programming",
        bookAuthor: "Donald Knuth",
        genre: 'Programming',
        bookPrice: 999.99,
        img: 'http://ecx.images-amazon.com/images/I/41gCSRxxVeL._SY429_BO1,204,203,200_.jpg',
        inStock: 4,
        likes: 35
    },
    {
        bookName: "Code complete: a practial handbook",
        bookAuthor: "Steve McConnell",
        genre: 'Programming',
        bookPrice: 28.99,
        img: 'http://ecx.images-amazon.com/images/I/41gCSRxxVeL._SY429_BO1,204,203,200_.jpg',
        inStock: 9,
        likes: 17
    },
    {
        bookName: "JavaScript the Definitive Guide",
        bookAuthor: "David Flannagan",
        genre: 'Programming',
        bookPrice: 22.10,
        img: 'http://ecx.images-amazon.com/images/I/51WD-F3GobL._SX379_BO1,204,203,200_.jpg',
        inStock: 83,
        likes: 1
    },
    {
        bookName: "Harry Potter and the Philosopher's Stone",
        bookAuthor: "J.K. Rowling",
        genre: 'Fantasy',
        bookPrice: 17.59,
        img: 'http://ecx.images-amazon.com/images/I/51MU5VilKpL._SX338_BO1,204,203,200_.jpg',
        inStock: 44,
        likes: 2099
    },
    {
        bookName: "Harry Potter and the Chamber of Secrets",
        bookAuthor: "J.K. Rowling",
        genre: 'Fantasy',
        bookPrice: 19.59,
        img: 'http://ecx.images-amazon.com/images/I/51jNORv6nQL._SX340_BO1,204,203,200_.jpg',
        inStock: 56,
        likes: 1902
    }
];
    
app.get('/', function(request, response) {
    var mostLikedBook = _.max(booksData, function(book) { return book.likes; });
    response.render('index.html', { mostLikedBook: mostLikedBook });
});

app.get('/catalog', function(request, response) {
    response.render('catalog.html', { books: booksData });
});

app.get('/catalog/:bookName', function(request, response) {
    var book = _.findWhere(booksData, { bookName: request.params.bookName });
    
    if (!book) {
        response.status(404);
        response.end();
    }
        
    response.render('book-profile.html', book);
});

var server = http.createServer(app);
server.listen(8000)
