const router = require("express").Router();
const users = require("../users/users-model");
const bcrypt = require("bcryptjs");



router.post("/register", async (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(use.password, 10);
  user.password = hash;

  try {
    const savedUser = await users.add(user);
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error registering user", error: error });
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  try {
    const user = await users.findBy({ username }).first();

    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
      res.status(200).json({ message: `welcome ${user.username}` });
    } else {
      res.status(401).json({ message: "invalid creds" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error registering user", error: error });
  }
});

module.exports = router;