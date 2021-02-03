
export class AdminService {
  constructor( $http ) {
    this.$http = $http;
  }

  getAllUsers() {
    return this.$http.get('http://localhost:1337/admin/users', {withCredentials: true});
  }

  static AdminServiceFactory($http) {
    let service = new AdminService($http);
    return service;
  }
}

AdminService.AdminServiceFactory.$inject = ['$http'];
