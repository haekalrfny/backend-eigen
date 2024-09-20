const express = require("express");
const router = express.Router();
const Member = require("../models/member.js");

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: API untuk mengelola anggota
 */

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Mendapatkan daftar semua anggota
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: Daftar anggota
 */
router.get("/", async (req, res) => {
  const members = await Member.findAll();
  res.json(members);
});

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Menambahkan anggota baru
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Anggota berhasil ditambahkan
 */
router.post("/", async (req, res) => {
  const { code, name } = req.body;
  const newMember = await Member.create({ code, name });
  res.json(newMember);
});

module.exports = router;
