const router = require("express").Router();
const userRoutes = require("./userRoutes");
const hobbyRoutes = require("./hobbyRoutes");

router.use("/users", userRoutes);
router.use("/hobbies", hobbyRoutes);

module.exports = router;
