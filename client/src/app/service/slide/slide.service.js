
export class SlideService {
  constructor($http) {
    'ngInject';
    this.$http = $http;
  }

  getSlidesData() {
    return this.$http.get('http://localhost:1337/api/slides/data');
  }

  static slideServiceFactory($http) {
    let service = new SlideService($http);
    return service;
  }
}

SlideService.slideServiceFactory.$inject = ['$http'];
