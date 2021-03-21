module.exports = {
  isAuthenticated: (req) => {
    if (req.isAuthenticated()) {
      return true;
    }
    return false;
  },
};
