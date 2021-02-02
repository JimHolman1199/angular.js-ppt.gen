
module.exports.routes = {

  'GET /api/slides/data': { action: 'slide/slide' },

  'POST /auth/signup': 'AuthController.signup',
  'POST /auth/signin': 'AuthController.signin',
  'GET /auth/signout': 'AuthController.signout',

  'GET /admin/users' : 'AdminController.users',
};
