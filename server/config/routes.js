
module.exports.routes = {

  'GET /api/slides/data': 'PresentationController.get',
  'POST /api/slides/add': 'PresentationController.add',

  'POST /auth/signup': 'AuthController.signup',
  'POST /auth/signin': 'AuthController.signin',
  'GET /auth/signout': 'AuthController.signout',

  'GET /admin/users' : 'AdminController.users',
};
