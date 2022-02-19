const router = require("express").Router();
const { User, Hobby } = require("../../models");
const withApiAuth = require("../../utils/auth");

router.get("/", withApiAuth, async (req, res) => {
  const hobbies = await Hobby.findAll({
    where: {
      user_id: req.session.user_id,
    },
  });
  res.json(hobbies);
});

router.post("/", withApiAuth, async (req, res) => {
  const hobbies = await Hobby.create({
    ...req.body,
    user_id: req.session.user_id,
  });
  res.json(hobbies);
});
module.exports = router;
