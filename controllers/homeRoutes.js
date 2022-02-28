const router = require("express").Router();
const { User, Hobby, Category } = require("../models");
const withAuth = require("../utils/auth");

//---------------------------- LOGIN GET --------------------------------//
router.get("/", async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    // Refers to login.handlebars
    res.render("login", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//--------------------- MIDDLEWARE FOR PROFILE --------------------------//
// Use withAuth middleware to prevent access to route
// render the active user's page
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    const hobbyData = await Hobby.findAll({
      include: Category,
      where: {
        user_id: req.session.user_id,
      },
    });

    const allUsersData = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    const hobbies = hobbyData.map((hobby) => hobby.get({ plain: true }));
    const users_list = allUsersData.map((user) => user.get({ plain: true }));

    //name of profile.handlebars
    res.render("profile", {
      ...user,
      hobbies,
      users_list,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//-------------------------- RENDER NEW HOBBY PAGE --------------------//
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


// ----------------------------- RENDER SINGLE HOBBY ---------------------//
router.get("/hobby/:id", async (req, res) => {
  try {
    const hobbyData = await Hobby.findByPk(req.params.id, {
      where: {
        id: req.session.id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const hobby = await hobbyData.get({ plain: true });

    res.render("singlehobby", {
      ...hobby,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//-------------------------- RENDER SINGLE OTHER USER ------------------//
router.get("/users/:id", async (req, res) => {
  try {
    // get the selected user's hobbies
    const profileData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Hobby,
          attributes: ["name"],
        },
      ],
    });

    // get the categories of the hobbies
    const hobbyData = await Hobby.findAll({
      include: Category,
      where: {
        user_id: req.params.id,
      },
    });


    const hobbies = hobbyData.map((hobby) => hobby.get({ plain: true }));
    const profile = profileData.get({ plain: true });

    // render the other users' page
    res.render("otherUserProfile", {
      ...profile,
      hobbies,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//---------------------------- RENDER LOGIN REDIRECT -------------------//
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
