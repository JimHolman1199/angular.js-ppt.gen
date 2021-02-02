import template from './admin.component.html';
import './admin.component.scss';

class Controller {
    /** @ngInject */
    constructor(adminService) {
        this._adminService = adminService;
        this.users = [];
        this.onGetAllUsers();
    }

    onGetAllUsers() {
        this._adminService.getAllUsers()
            .then(res => this.users = [...this.users,...res.data]);
    }

}

Controller.$inject = ['adminService'];

export default {
    template,
    controller: Controller
};
