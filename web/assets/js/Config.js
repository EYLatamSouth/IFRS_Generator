(() => {
    'use strict';

    const config = ($routerProvider, $locationProvider) => {
        $routerProvider
            .when('/', {
                controller: 'Start',
                templateUrl: 'assets/pages/Start.view.html'
            })
            .when('/irfs15.input.login', {
                controller: 'VehicleRegistration',
                templateUrl: 'assets/pages/Vehicle.lock.view.html'
            })
            .when('/irfs15.login', {
                controller: 'Irfs15',
                templateUrl: 'assets/pages/irfs15.view.html'
            })
            .otherwise({
                controller: 'Login',
                templateUrl: 'assets/pages/Login.view.html'
            });
    };

    angular
        .module('application', ['ngInputCurrency', 'ngRoute', 'ngSanitize'])
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];
})();