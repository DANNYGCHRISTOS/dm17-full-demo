const getProducts = (req, res) => {
  req.app
    .get('db')
    .get_products()
    .then(response => res.status(200).send(response))
    .catch(err => res.status(500).send(err));
};

module.exports = {
  getProducts
};
