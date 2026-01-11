const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/tokenhandler");
const isAdmin = require("../middleware/adminHandler");

const {
  getAllUsers,
  getAllMemos,
} = require("../controllers/adminControler");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only APIs
 */

router.use(validateToken);
router.use(isAdmin);

/**
 * @swagger
 * /api/v1/admin/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/users", getAllUsers);

/**
 * @swagger
 * /api/v1/admin/memos:
 *   get:
 *     summary: Get all memos (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of memos
 */
router.get("/memos", getAllMemos);

module.exports = router;
