import angular from 'angular';

import footer from './footer/footer'
import navbar from './header/header'

export const SharedModule = 'app.shared';

angular
    .module(SharedModule, [])
    .component('myFooter', footer)
    .component('navbar', navbar);
