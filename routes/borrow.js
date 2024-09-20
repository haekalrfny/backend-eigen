const express = require("express");
const router = express.Router();
const Borrow = require("../models/borrow.js");
const Book = require("../models/book.js");
const Member = require("../models/member.js");

/**
 * @swagger
 * tags:
 *   name: Borrows
 *   description: API untuk mengelola peminjaman
 */

/**
 * @swagger
 * /borrows:
 *   get:
 *     summary: Mendapatkan daftar semua peminjaman
 *     tags: [Borrows]
 *     responses:
 *       200:
 *         description: Daftar peminjaman
 */
router.get("/", async (req, res) => {
  const borrows = await Borrow.findAll({ include: [Book, Member] });
  res.json(borrows);
});

/**
 * @swagger
 * /borrows:
 *   post:
 *     summary: Meminjam buku
 *     tags: [Borrows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *     responses:
 *       201:
 *         description: Buku berhasil dipinjam
 *       404:
 *         description: Member atau buku tidak ditemukan
 *       400:
 *         description: Member tidak dapat meminjam buku
 *       403:
 *         description: Member sedang terkena penalti
 */
router.post("/", async (req, res) => {
  const { memberCode, bookCode } = req.body;

  // Check member conditions
  const member = await Member.findByPk(memberCode);
  if (!member) {
    return res.status(404).json({ message: "Member tidak ditemukan." });
  }

  // Check penalty status
  const currentDate = new Date();
  if (member.isPenalty && member.penaltyEndDate > currentDate) {
    return res.status(403).json({
      message: "Member sedang terkena penalti dan tidak dapat meminjam buku.",
    });
  }

  // Check how many books the member has borrowed
  const borrowedCount = await Borrow.count({
    where: {
      memberCode,
      isReturned: null,
    },
  });

  if (borrowedCount >= 2) {
    return res
      .status(400)
      .json({ message: "Member tidak boleh meminjam lebih dari 2 buku." });
  }

  // Check book availability
  const book = await Book.findByPk(bookCode);
  if (!book || book.isBorrow) {
    return res
      .status(400)
      .json({ message: "Buku tidak tersedia untuk dipinjam." });
  }

  const borrow = await Borrow.create({ memberCode, bookCode });
  await book.update({ isBorrow: true });
  res.status(201).json(borrow);
});

/**
 * @swagger
 * /borrows/{code}/return:
 *   put:
 *     summary: Mengembalikan buku
 *     tags: [Borrows]
 *     parameters:
 *       - name: code
 *         in: path
 *         required: true
 *         description: Code peminjaman
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Buku telah dikembalikan
 *       404:
 *         description: Peminjaman tidak ditemukan
 *       400:
 *         description: Buku dikembalikan terlambat, member dikenakan penalti
 */
router.put("/:id/return", async (req, res) => {
  const borrowId = req.params.id;

  // Find borrow record
  const borrow = await Borrow.findByPk(borrowId);
  if (!borrow) {
    return res.status(404).json({ message: "Peminjaman tidak ditemukan." });
  }

  const book = await Book.findByPk(borrow.bookCode);
  const member = await Member.findByPk(borrow.memberCode);
  const borrowDate = new Date(borrow.borrowDate);
  const currentDate = new Date();
  const differenceInTime = currentDate - borrowDate;
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  // Check if the book is returned after 7 days
  if (differenceInDays > 7) {
    const penaltyEndDate = new Date();
    penaltyEndDate.setDate(penaltyEndDate.getDate() + 3);
    member.isPenalty = true;
    member.penaltyEndDate = penaltyEndDate;
    await member.save();
    return res.status(400).json({
      message: "Buku dikembalikan terlambat, member dikenakan penalti.",
    });
  }

  await borrow.update({ isReturned: true, returnDate: currentDate });
  await book.update({ isBorrow: false });

  res.json({ message: "Buku telah dikembalikan." });
});

/**
 * @swagger
 * /borrows/status:
 *   get:
 *     summary: Mendapatkan status anggota dan jumlah buku yang dipinjam
 *     tags: [Borrows]
 *     responses:
 *       200:
 *         description: Daftar anggota dengan jumlah buku yang dipinjam
 */
router.get("/status", async (req, res) => {
  const members = await Member.findAll({ include: { model: Borrow } });
  const memberStatus = members.map((member) => ({
    code: member.code,
    name: member.name,
    borrowedCount: member.borrows.length,
  }));
  res.json(memberStatus);
});

module.exports = router;
