import angular from 'angular';

import footer from './footer/footer.component';
import header from './header/header.component';
import snackbar from './snackbar/snackbar.component';

export const SharedModule = 'app.shared';

angular
    .module(SharedModule, [])
    .component('appFooter', footer)
    .component('appHeader', header)
    .component('appSnackbar', snackbar);
