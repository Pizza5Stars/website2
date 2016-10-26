angular.module('app.pizzaprofile', [
    'services.crud',
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('pizzaprofile', {
            url: '/pizzaprofile',
            views: {
                "main": {
                    controller: 'PizzaProfileCtrl',
                    templateUrl: 'app/pizzaprofile/pizzaprofile.tpl.html'

                }
            },
            data: {pageTitle: 'Pizza profile'}
        });
    })

    .controller('PizzaProfileCtrl', function PizzaProfile($scope, $state, CrudService) {
        $scope.addAddressToCustomer = function (address) {
            CrudService.addAddressToCustomer(address).then(
                $state.go('home')

            );

            $scope.setCurrentAddress(address);




        };

    });



