const router = require("express").Router();
const { User, Hobby, Category } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    res.render("login", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    const hobbyData = await Hobby.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const hobbies = hobbyData.map((hobby) => hobby.get({ plain: true }));

    res.render("profile", {
      ...user,
      hobbies,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/newhobby", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    const categoryData = await Category.findAll();

    const categories = categoryData.map((category) =>
      category.get({ plain: true })
    );

    res.render("newhobby", {
      ...user,
      categories,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile/:id", async (req, res) => {
  try {
    const profileData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Hobby,
          attributes: ["name"],
        },
      ],
    });

    const profile = profileData.get({ plain: true });

    res.render("profile", {
      ...profile,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
