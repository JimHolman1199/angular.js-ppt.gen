
export class LocalStorageService {
  constructor( $window ) {
    this.window = $window || window;
    this.storage = this.window.localStorage;
  }

  set(key, data) {
    return this.storage.setItem(key, JSON.stringify(data));
  }

  get(key) {
    return JSON.parse(this.storage.getItem(key));
  }

  remove(key) {
    this.storage.removeItem(key);
  }

  static LocalStorageServiceFactory($window) {
    let service = new LocalStorageService($window);
    return service;
  }
}

LocalStorageService.LocalStorageServiceFactory.$inject = ['$window'];
