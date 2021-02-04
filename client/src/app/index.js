import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngTouch from 'angular-touch';
import uiBootstrap from 'angular-ui-bootstrap';

import { SlideService } from './service/slide/slide.service';
import { ComponentsModule } from './components';
import { SharedModule } from './components/shared';
import { RoundToFilter } from './filter/roundTo/roundTo.filter';
import { PptxService } from './service/pptx/pptx.service';
import { ChartService } from './service/chart/chart.service';
import { AuthService } from './service/auth/auth.service';
import { LocalStorageService } from './service/localStorage/localStorage.service';
import { AdminService } from './service/admin/admin.service';
import { AccessGuard } from './guard/access.guard';
import Snackbar from './directive/snackbar/snackbar.directive';
import { AuthModule } from './components/auth/index';
import routesConfig from './routes';

import './index.scss';

angular
    .module('app', [
        // dependencies
        uiRouter, 
        ngAnimate, 
        ngTouch, 
        uiBootstrap,
        // modules
        ComponentsModule,
        SharedModule,
        AuthModule
    ])
    .service('slideService', SlideService.slideServiceFactory)
    .service('pptxService', PptxService.PptxServiceFactory)
    .service('chartService', ChartService.ChartServiceFactory)
    .service('authService', AuthService.AuthServiceFactory)
    .service('localStorageService', LocalStorageService.LocalStorageServiceFactory)
    .service('adminService', AdminService.AdminServiceFactory)
    .service('accessGuard', AccessGuard.AccessGuardFactory)
    .filter('roundTo', () => RoundToFilter.roundToFilterFactory)
    .directive('snackbar', Snackbar.SnackbarFactory)
    .config(routesConfig)
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }]);
