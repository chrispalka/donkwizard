module.exports = {
  isAuthenticated: (req) => {
    if (req.isAuthenticated()) {
      console.log('User is logged in');
      return true;
    }
    console.log('User is NOT logged in');
    return false;
  },
};
