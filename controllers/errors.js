const get404ErrorPage = (req, res, next) => {
  res.status(404).render("404-page", { docTitle: "Page Not Found 404" });
};

module.exports = {
  get404ErrorPage,
};
