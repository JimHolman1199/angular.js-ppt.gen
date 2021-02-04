module.exports = {
    users: async function(req, res) {
      await User.find(function(err, user) {
        if (err) {
          return err;
        }
        return res.send(user);
      });
    },
};
