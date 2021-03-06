import angular from 'angular';

import home from './home/home.component';
import dashboard from './dashboard/dashboard.component';
import chart from './chart/chart.component';
import admin from './admin/admin.component';

export const ComponentsModule = 'app.components';

angular
    .module(ComponentsModule, [])
    .component('app', home)
    .component('dashboard', dashboard)
    .component('chart', chart)
    .component('admin', admin);
