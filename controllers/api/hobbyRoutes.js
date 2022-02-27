const router = require("express").Router();
const { Hobby } = require("../../models");
const withApiAuth = require("../../utils/auth");


//------------------- GET ALL HOBBIES OF CURRENT LOGIN USER ---------------//
router.get("/", withApiAuth, async (req, res) => {
  try {
    const hobbies = await Hobby.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(hobbies);
  } catch (err) {
    res.status(400).json(err);
  }
});


//------------------------------ POST NEW HOBBY ---------------------------//
router.post("/", withApiAuth, async (req, res) => {
  try {
    const hobbies = await Hobby.create({
      //Spreading the data
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(hobbies);
  } catch (err) {
    res.status(400).json(err);
  }
});


//------------------------------ DELETE HOBBY ID ---------------------------//
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
