function get_records(d) {
    console.log(d);
    if (!d) {
        return [];
    }
    if (d.entry.length === 0) {
        return [];
    }
    let records = [];
    let currBalance = 0;
    d.entry.forEach(element => {
        let returns = element.addition * d.imp_disc_rate / 100;
        let final_balance = currBalance + element.addition + returns - element.withdraw;
        records.push({
            year: element.year,
            initial_balance: currBalance != 0 ? currBalance : "-",
            addition: element.addition,
            returns: returns,
            withdraw: element.withdraw,
            final_balance: final_balance
        });
        currBalance += element.addition + (element.addition * d.imp_disc_rate / 100) - element.withdraw;
    });

    return records.sort((a, b) => a.year - b.year);
}

(() => {
    'use stricts';

    function ctrl($scope, $login, $get_company) {
        if (!$login.check()) {
            $login.redirect();
        }
        $scope.imp_disc_rate = 0;
        $scope.records = [];

        $get_company.on($login.check()).then(d => {
            $scope.imp_disc_rate = d.imp_disc_rate;
            $scope.records = get_records(d);
            $scope.totalAddition = d.entry.reduce((acc, cur) => acc + cur.addition, 0);
            $scope.totalReturns = d.entry.reduce((acc, cur) => acc + cur.addition * d.imp_disc_rate / 100, 0);
            $scope.totalWithdraw = d.entry.reduce((acc, cur) => acc + cur.withdraw, 0);
        });
    }

    angular
        .module('application')
        .controller('Irfs15', ctrl);

    ctrl.$inject = ['$scope', '$login', '$get_company'];
})();
