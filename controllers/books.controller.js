const {createError} = require('../helpers');
const {booksService} = require('../services');
const path = require('path');
const fs = require('fs/promises');

const findAll = async (req, res, next) => {
  const books = await booksService.findAll();
  res.json(books);
};

const findOne = async (req, res, next) => {
  const { id } = req.params;
  const book = await booksService.findOne(id);
  if (!book) {
    throw createError(404, 'Book not found');
  }
  res.json(book);
};

const add = async (req, res, next) => {
  const { title, author, rating, isbn, genre } = req.body;
  const book = await booksService.create({ title, author, rating, isbn, genre });
  res.status(201).json(book);
};

const addImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { path: filePath, originalname } = req.file;
    const booksDirectoryName = 'books';
    const booksDirectoryPath = path.join(__dirname, '../', 'public', booksDirectoryName);
    const newImagePath = path.join(booksDirectoryPath, originalname);
    const imagePath = `${booksDirectoryName}/${originalname}`;

    await fs.rename(filePath, newImagePath);

    const book = await booksService.update(id, { image: imagePath });
    res.json(book);
  } catch (error) {
    await fs.unlink(filePath);
    throw error;
  }
};

const updateById = async (req, res, next) => {
  const { title, author, rating, isbn, genre } = req.body;
  const { id } = req.params;
  const book = await booksService.update(id, { title, author, rating, isbn, genre });
  res.json(book);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const book = await booksService.remove(id);
  res.json(book);
};

module.exports = {
  findAll,
  findOne,
  add,
  updateById,
  deleteById,
  addImage,
};
