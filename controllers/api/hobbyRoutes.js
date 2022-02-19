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

router.delete("/:id", withApiAuth, async (req, res) => {
  try {
    const hobbyData = await Hobby.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!hobbyData) {
      res.status(404).json({ message: "No hobby found with this id!" });
      return;
    }

    res.status(200).json(hobbyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
