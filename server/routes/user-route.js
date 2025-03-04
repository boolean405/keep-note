const router = require("express").Router();

const {
  loginUser,
  registerUser,
  profile,
  editUser,
  deleteUser,
} = require("../controllers/user-controller");
const { UserSchema } = require("../utils/schema");
const { validateToken, validateBody } = require("../utils/validator");

router.route("/register").post(validateBody(UserSchema.register), registerUser);
router.post("/login", [validateBody(UserSchema.login), loginUser]);
router.route("/profile").get(validateToken(), profile);

router
  .route("/edit")
  .patch(validateToken(), validateBody(UserSchema.editUser), editUser);
router
  .route("/delete")
  .delete(validateToken(), validateBody(UserSchema.userId), deleteUser);

module.exports = router;
