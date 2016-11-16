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
            data: {pageTitle: 'Pizza profile'},
            resolve : {
                myaddresses: function (CrudService) {
                    return CrudService.getAddressesFromcustomer();
                }
            }

        });
    })


    .controller('PizzaProfileCtrl', function PizzaProfile($scope, $state, myaddresses, CrudService) {
        $scope.addAddressToCustomer = function (address) {
            CrudService.addAddressToCustomer(address).then(
                $state.go('home')

            );
        };
        $scope.myaddresses = myaddresses.data;

    });



