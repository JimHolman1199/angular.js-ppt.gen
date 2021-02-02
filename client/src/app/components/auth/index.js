import angular from 'angular';

import signIn from './sign-in/signIn.component';
import signUp from './sign-up/signUp.component';

export const AuthModule = 'app.auth';

angular
    .module(AuthModule, [])
    .controller('appSignIn', signIn)
    .controller('appSignUp', signUp);
