
export class SlideService {
  constructor($http) {
    'ngInject';
    this.$http = $http;
  }

  getSlidesData() {
    return this.$http.get('http://localhost:1337/api/slides/data');
  }

  generateSlidesFile() {
    return this.$http.get('http://localhost:1337/api/presentation/generate');
  }

  saveChanges(data) {
    return this.$http.post('http://localhost:1337/api/slides/save', JSON.stringify(data));
  }

  static slideServiceFactory($http) {
    let service = new SlideService($http);
    return service;
  }
}

SlideService.slideServiceFactory.$inject = ['$http'];
