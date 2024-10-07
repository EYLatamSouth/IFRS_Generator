(() => {
    'use stricts';

    function ctrl($scope, $login) {
        const menu = document.getElementById('navbarNavDropdown');

        menu.style.visibility = ($login.check() === null) ? 'hidden' : 'visible';

        console.log(menu.style.visibility);
    }

    angular
        .module('application')
        .controller('Start', ctrl);

    ctrl.$inject = ['$scope', '$login'];
})();