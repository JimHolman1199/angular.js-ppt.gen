import angular from 'angular';

import app from './app/app'
import about from './about/about'
import dashboard from './dashboard/dashboard'


export const ComponentsModule = 'app.components';

angular
    .module(ComponentsModule, [])
    .component('app', app)
    .component('about', about)
    .component('dashboard', dashboard)