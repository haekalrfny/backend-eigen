const express = require("express");
const router = express.Router();
const Book = require("../models/book.js");

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API untuk mengelola buku
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Mendapatkan daftar semua buku
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Daftar buku
 *       404:
 *         description: Buku tidak ditemukan
 */
router.get("/", async (req, res) => {
  const books = await Book.findAll({
    where: { isBorrow: false },
  });
  res.json(books);
});

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Menambahkan buku baru
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Buku berhasil ditambahkan
 */
router.post("/", async (req, res) => {
  const { code, title, author, stock } = req.body;
  const newBook = await Book.create({ code, title, author, stock });
  res.json(newBook);
});

module.exports = router;
