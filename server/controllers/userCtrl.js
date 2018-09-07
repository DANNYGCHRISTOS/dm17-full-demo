const getUser = (req, res) => {
  if (!req.user) res.sendStatus(401);
  else res.status(200).send(req.user);
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('http://localhost:3000/');
  });
};

module.exports = {
  getUser,
  logout
};
