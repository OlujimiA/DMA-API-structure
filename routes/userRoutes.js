const express = require("express");
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
