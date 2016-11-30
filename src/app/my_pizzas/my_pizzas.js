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
                mypizzas_saved: function (CrudService) {
                    return CrudService.getPizzaFromcustomer();
                },
                mypizzas_ordered: function (CrudService) {
                    return CrudService.getReceiptFromcustomer();
                }
            }

        });
    })


    .controller('MyPizzasCtrl', function MyPizzas($scope, $state, mypizzas_saved, mypizzas_ordered, CrudService) {
        $scope.pizzas = mypizzas_saved.data;
        console.log(mypizzas_ordered);
        console.log(mypizzas_saved);

        $scope.orderedpizzas = mypizzas_ordered.data;


    });



