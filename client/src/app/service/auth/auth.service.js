
export class AuthService {
  constructor( $http ) {
    this.$http = $http;
  }

  signIn(user) {
    return this.$http.post('http://localhost:1337/auth/signin', JSON.stringify(user));
  }

  signUp(user) {
    return this.$http.post('http://localhost:1337/auth/signup', JSON.stringify(user));
  }

  signOut() {
    return this.$http.get('http://localhost:1337/auth/signout');
  }

  static AuthServiceFactory($http) {
    let service = new AuthService($http);
    return service;
  }
}

AuthService.AuthServiceFactory.$inject = ['$http'];
