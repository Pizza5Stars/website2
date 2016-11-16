angular.module('app.my_pizzas', [
    'services.crud',
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('my_pizzas', {
            url: '/my_pizzas',
            views: {
                "main": {
                    controller: 'MyPizzasCtrl',
                    templateUrl: 'app/my_pizzas/my_pizzas.tpl.html'

                }
            },
            data: {pageTitle: 'My Pizzas'},
            resolve : {
                mypizzas: function (CrudService) {
                    return CrudService.getPizzaFromcustomer();
                }
            }
        });
    })

    .config(function config($stateProvider) {
        $stateProvider.state('my_pizzas_details', {
            url: '/my_pizzas_details',
            views: {
                "main": {
                    controller: 'MyPizzasCtrl',
                    templateUrl: 'app/my_pizzas/pizza_details.tpl.html'

                }
            },
            data: {pageTitle: 'My Pizzas details'}
        });
    })

    .controller('MyPizzasCtrl', function MyPizzas($scope, $state, mypizzas, CrudService) {

        //console.log(mypizzas);
        $scope.pizzas = mypizzas.data;
        console.log($scope.pizzas[0]);

    });



