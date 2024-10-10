function get_records(d) {
    if (!d || d.entry.length === 0) {
        return [];
    }

    let recordsByYear = {};
    let currBalance = 0;

    d.entry.forEach(element => {
        let year = element.entry_date.split("-")[0];
        let returns = element.addition * d.imp_disc_rate / 100;
        let final_balance = currBalance + element.addition + returns - element.withdraw;

        if (!recordsByYear[year]) {
            recordsByYear[year] = {
                year: year,
                initial_balance: 0,
                addition: 0,
                returns: 0,
                withdraw: 0,
                final_balance: 0,
                details: []
            };
        }

        recordsByYear[year].addition += element.addition;
        recordsByYear[year].returns += returns;
        recordsByYear[year].withdraw += element.withdraw;
        recordsByYear[year].final_balance = final_balance;

        recordsByYear[year].details.push({
            month: element.entry_date.split("-")[1],
            initial_balance: currBalance != 0 ? currBalance : "-",
            addition: element.addition,
            returns: returns,
            withdraw: element.withdraw,
            final_balance: final_balance,
        });

        currBalance = final_balance;
    });

    let sortedYears = Object.keys(recordsByYear).sort();
    let previousFinalBalance = 0;
    sortedYears.forEach(year => {
        recordsByYear[year].initial_balance = previousFinalBalance;
        previousFinalBalance = recordsByYear[year].final_balance;
    });

    let records = sortedYears.map(year => recordsByYear[year]);

    return records;
}

(() => {
    'use stricts';

    function ctrl($scope, $login, $get_company, $get_all_companies) {
        if (!$login.check()) {
            $login.redirect();
        }
        $scope.imp_disc_rate = 0;
        $scope.records = [];

        $get_all_companies.on($login.check()).then(d => {
            let entries = [];
            d.forEach(x => {
                entries.push(x.name + " - " + x.cnpj);
            });

            $scope.companies = entries;
        });

        $scope.initialLoad = () => {
            if (!$scope.selectedCompany) {
                return;
            }
            const cnpj = $scope.selectedCompany.split(" ")[2];
            $get_company.on($login.check(), cnpj).then(d => {
                $scope.imp_disc_rate = d.imp_disc_rate;
                $scope.records = get_records(d);
                $scope.totalAddition = d.entry.reduce((acc, cur) => acc + cur.addition, 0);
                $scope.totalReturns = d.entry.reduce((acc, cur) => acc + cur.addition * d.imp_disc_rate / 100, 0);
                $scope.totalWithdraw = d.entry.reduce((acc, cur) => acc + cur.withdraw, 0);
            });
        }

        $scope.selectYear = (year) => {
            $scope.selectedYear = year;
            $scope.details = $scope.records.filter(x => x.year == year)[0].details;
        };
    }

    angular
        .module('application')
        .controller('Irfs15', ctrl);

    ctrl.$inject = ['$scope', '$login', '$get_company', '$get_all_companies'];
})();
