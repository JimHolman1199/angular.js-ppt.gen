import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngTouch from 'angular-touch';
import uiBootstrap from 'angular-ui-bootstrap';

import { SlideService } from './service/slide/slide.service';
import { ComponentsModule } from './components';
import { SharedModule } from './components/shared';
import { RoundToFilter } from './filter/roundTo/roundTo.filter';
import routesConfig from './routes';

import './index.scss';

angular
    .module('app', [
        // dependencies
        uiRouter, ngAnimate, ngTouch, uiBootstrap,

        // modules
        ComponentsModule,
        SharedModule,
    ])
    .service('slideService', SlideService.slideServiceFactory)
    .filter('roundTo', () => RoundToFilter.roundToFilterFactory)
    .config(routesConfig);
