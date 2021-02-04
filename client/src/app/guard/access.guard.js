export class AccessGuard {
  constructor($q, $rootScope, localStorageService, $location) {
    this._q = $q;
    this._rootScope = $rootScope;
    this._localStorageService = localStorageService;
    this._location = $location;
    this.status = {
      OK: 200,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
    };
  }

  isAdmin() {
    const user = this._rootScope.user || this._localStorageService.get('user');
    if (!user) {
      this._rootScope.message = 'You are not authorized !';
      this._location.path('/');
      return this._q.reject(this.status.UNAUTHORIZED);
    } else if(user.role === 'admin') {
      return this.status.OK;
    } else {
      this._location.path('/');
      this._rootScope.message = 'You are not admin !';
      return this._q.reject(this.status.FORBIDDEN);
    }
  }

  isAuthenticated() {
    const user = this._rootScope.user || this._localStorageService.get('user');
    if(user) {
      return this.status.OK;
    } else {
      this._location.path('/');
      this._rootScope.message = 'You are not authorized !';
      return this._q.reject(this.status.UNAUTHORIZED);
    }
  }

  static AccessGuardFactory($q, $rootScope, localStorageService, $location) {
    let guard = new AccessGuard($q, $rootScope, localStorageService, $location);
    return guard;
  }
}

AccessGuard.$inject = ['$q', '$rootScope', 'localStorageService', '$location'];
