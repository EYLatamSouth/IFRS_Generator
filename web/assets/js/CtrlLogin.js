(() => {
    'use stricts';

    function ctrl($scope, $login, $location) {

        $scope.user = {};

        $scope.exec = () => {
            const query = $location.search();
            $scope.user.company = (query.c) ? parseInt(query.c) : 0;
            console.log($scope);
            $login.on($scope.user);
        };
    }

    angular
        .module('application')
        .controller('Login', ctrl);

    ctrl.$inject = ['$scope', '$login', '$location'];
})();