const router = require("express").Router();

const {
  paginateUser,
  loginUser,
  registerUser,
  profile,
  searchUser,
  deleteUser,
} = require("../controllers/user-controller");
const { UserSchema } = require("../utils/schema");
const {
  validateToken,
  validateParam,
  validateBody,
} = require("../utils/validator");

router.route("/register").post(validateBody(UserSchema.register), registerUser);
router.route("/search").get(validateToken(), searchUser);

router.post("/login", [validateBody(UserSchema.login), loginUser]);
router.get("/paginate/:pageNum", paginateUser);
router.get("/profile", [validateToken(), profile]);

router.delete("/", [
  validateToken(),
  // validateParam(UserSchema.params.userId, "userId"),
  validateBody(UserSchema.userId),
  deleteUser,
]);

const userRoute = router;

module.exports = {
  userRoute,
};
