const {createError} = require('../helpers');
const {Book} = require('../models');

const findAll = async () => {
  return await Book.find();
};

const findOne = async id => {
  return await Book.findById(id);
};

const create = async book => {
  try {
    return await Book.create(book);
  } catch (error) {
    throw createError(400, error.message);
  }
};

const update = async (id, book) => {
  const updatedBook = await Book.findByIdAndUpdate(id, book, { new: true });

  if (!updatedBook) {
    throw createError(404, 'Book with this id not found');
  }

  return updatedBook;
};

const remove = async (id, book) => {
  const removedBook = await Book.findByIdAndRemove(id, book, { new: true });

  if (!removedBook) {
    throw createError(404, 'Book with this id not found');
  }

  return removedBook;
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
};
