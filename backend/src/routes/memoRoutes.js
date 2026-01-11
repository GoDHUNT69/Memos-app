const express = require("express");
const router = express.Router();

const {
  getMemos,
  getMemo,
  createMemo,
  updateMemo,
  deleteMemo,
} = require("../controllers/memoControler");

const validateToken = require("../middleware/tokenhandler");

/**
 * @swagger
 * tags:
 *   name: Memos
 *   description: Memo management APIs
 */

router.use(validateToken);

/**
 * @swagger
 * /api/v1/memos:
 *   get:
 *     summary: Get all memos of logged-in user
 *     tags: [Memos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of memos
 */
router.get("/", getMemos);

/**
 * @swagger
 * /api/v1/memos:
 *   post:
 *     summary: Create a new memo
 *     tags: [Memos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Memo created
 */
router.post("/", createMemo);

/**
 * @swagger
 * /api/v1/memos/{id}:
 *   get:
 *     summary: Get a memo by ID
 *     tags: [Memos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Memo details
 */
router.get("/:id", getMemo);

/**
 * @swagger
 * /api/v1/memos/{id}:
 *   put:
 *     summary: Update a memo
 *     tags: [Memos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Memo updated
 */
router.put("/:id", updateMemo);

/**
 * @swagger
 * /api/v1/memos/{id}:
 *   delete:
 *     summary: Delete a memo
 *     tags: [Memos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Memo deleted
 */
router.delete("/:id", deleteMemo);

module.exports = router;
