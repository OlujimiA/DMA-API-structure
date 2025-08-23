
/**
 * @swagger
 * /api/users/:
 *  get:
 *      tags: [user]
 *      summary: Returns the list of all users
 *      responses:
 *          200:
 *              description: The list of all users
 */

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *      tags: [user]
 *      summary: Returns a user
 *      
 *  put:
 *      tags: [user]
 *      summary: Updates a user
 *      responses:
 *          200:
 *              description: Updated user
 *  post: 
 *      tags: [user]
 *      summary: Complete a user's profile
 * 
 *  delete:
 *      tags: [user]
 *      summary: Delete a user
 */

const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authmiddleware");
const userController = require("../controllers/userControllers");
const { authorizeRoles } = require("../middlewares/authenticate");
const upload = require("../middlewares/multer");

router.get("/", authorizeRoles("admin"), auth, userController.getAllusers);
router.post(
  "/profile/:id",
  upload.fields([
    { name: "profile-pic", maxCount: 1 },
    { name: "IDs", maxCount: 5 },
  ]),
  auth,
  userController.profile
);
router.get("/:id", auth, userController.getuserById);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", authorizeRoles("admin"), auth, userController.deleteUser);

module.exports = router;
