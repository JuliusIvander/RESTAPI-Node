const mongoose = require("mongoose");
const Book = require("../model/book");
const shortid = require("shortid");
const Hashid = require("hashids");

// create 1 book
const create_book = (req, res) => {
  //   Making unique isbn
  const hashid = new Hashid(shortid.generate(), 5);
  const hash = hashid.encode(1);
  const isbn = req.body.code + hash;

  book = new Book({
    title: req.body.title,
    author: req.body.author,
    isbn: isbn,
  });

  book
    .save()
    .then((result) => {
      res.status(200).json({
        status: true,
        message: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: err,
      });
    });
};

// create many book
// this condition where they have more than 1 book with the same author and title
// but they want to make their isbn unique
const createMany_book = (req, res) => {
  let obj = [];
  for (i = 1; i <= req.body.number; i++) {
    //   Creating unique isbn
    const hashid = new Hashid(shortid.generate(), 5);
    const hash = hashid.encode(i);
    const isbn = req.body.code + hash;

    // Keeping each data
    let data = {
      title: req.body.title,
      author: req.body.author,
      isbn: isbn,
    };

    obj.push(data);
  }

  Book.insertMany(obj)
    .then((result) => {
      res.status(200).json({
        status: true,
        message: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: err,
      });
    });
};

// find all book
const getAll_book = (req, res) => {
  Book.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.status(200).json({
        status: true,
        message: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        error: err,
      });
    });
};

// find book by id
const get_book = (req, res) => {
  id = req.params.id;
  Book.findById(id)
    .then((result) => {
      res.status(200).json({
        status: true,
        message: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        error: err,
      });
    });
};

// update book by id
const update_book = (req, res) => {
  id = req.params.id;

  const hashid = new Hashid(shortid.generate(), 5);
  const hash = hashid.encode(1);
  const isbn = req.body.code + hash;

  Book.findOneAndUpdate(
    { _id: id },
    {
      title: req.body.title,
      author: req.body.author,
      isbn: isbn,
    }
  )
    .then((result) => {
      res.status(200).json({
        status: true,
        message: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: err,
      });
    });
};

// delete book by id
const delete_book = (req, res) => {
  id = req.params.id;

  Book.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({
        status: true,
        message: "Data berhasil dihapus",
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        error: err,
      });
    });
};

module.exports = {
  create_book,
  createMany_book,
  getAll_book,
  get_book,
  update_book,
  delete_book,
};
