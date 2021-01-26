import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngTouch from 'angular-touch';

import { SlideService } from './service/slide/slide.service';
import { ComponentsModule } from './components';
import { SharedModule } from './components/shared';
import { RoundToFilter } from './filter/roundTo/roundTo.filter';
import { PptxService } from './service/pptx/pptx.service';
import { ChartService } from './service/chart/chart.service';
import Snackbar from './directive/snackbar/snackbar.directive';
import routesConfig from './routes';

import './index.scss';

angular
    .module('app', [
        // dependencies
        uiRouter, ngAnimate, ngTouch,

        // modules
        ComponentsModule,
        SharedModule,
    ])
    .service('slideService', SlideService.slideServiceFactory)
    .service('pptxService', PptxService.PptxServiceFactory)
    .service('chartService', ChartService.ChartServiceFactory)
    .filter('roundTo', () => RoundToFilter.roundToFilterFactory)
    .directive('snackbar', Snackbar.SnackbarFactory)
    .config(routesConfig);
