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
        $scope.createAddress = function (address) {
            CrudService.createAddress(address).then();


        };

    });



