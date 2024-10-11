function getInicialBalance(data) {
    let currBalance = 0;
    let i = 0;
    const currYear = data.entry_date.getFullYear();
    const company = data.company;

    if (!company) {
        return 0;
    }
    if (company.entry.length === 0) {
        return 0;
    }

    const entriesSorted = company.entry.sort((a, b) => a.year - b.year);

    while (entriesSorted[i].year < currYear) {
        currBalance += entriesSorted[i].addition + (entriesSorted[i].addition * data.imp_disc_rate / 100) - entriesSorted[i].withdraw;
        i++;
    }

    return currBalance;
}

(() => {
    'use stricts';

    function ctrl($scope, $login, $location, $save_entry, $get_company) {
        if (!$login.check()) {
            $login.redirect();
        }
        
        $scope.newInput = {};
        $scope.newInput.headers = $login.check();
        $scope.newInput.entry_date = new Date();

        $get_company.on($scope.newInput.headers).then(d => {
            $scope.newInput.company = d;
            $scope.newInput.imp_disc_rate = d.imp_disc_rate;
            $scope.updateInitialBalance();
        });

        $scope.updateInitialBalance = () => {
            console.log("updateInitialBalance");
            $scope.initial_balance = getInicialBalance($scope.newInput);
        }

        $scope.validateImpDiscRate = () => {
            if ($scope.newInput.imp_disc_rate < 0) {
                alert('O valor do desconto não pode ser negativo');
                $scope.newInput.imp_disc_rate = 0;
            } else if ($scope.newInput.imp_disc_rate > 100) {
                alert('O valor do desconto não pode ser maior que 100%');
                $scope.newInput.imp_disc_rate = $scope.newInput.company.imp_disc_rate;
            }
            if ($scope.newInput.addition != null || $scope.newInput.withdraw != null) {
                $scope.updateInitialBalance();
                $scope.calculate();
            }
        }

        $scope.calculate = () => {
            if (!$scope.newInput.imp_disc_rate) {
                return;
            }
            $scope.newInput.returns = ($scope.initial_balance + $scope.newInput.addition) * ($scope.newInput.imp_disc_rate / 100);
            $scope.newInput.final_balance = $scope.newInput.returns + $scope.initial_balance
            if ($scope.newInput.withdraw)
                $scope.newInput.final_balance -= $scope.newInput.withdraw;
        }
        
        $scope.save = () => {
            if (!$scope.newInput.addition && !$scope.newInput.withdraw) {
                alert('Informe um valor de adição ou retirada');
                return;
            }
            if (!$scope.newInput.entry_date) {
                alert('Informe uma data');
                return;
            }
            
            $save_entry.on($scope.newInput);
        }
    }

    angular
        .module('application')
        .controller('VehicleRegistration', ctrl);

    ctrl.$inject = ['$scope', '$login', '$location', '$save_entry', '$get_company'];
})();
