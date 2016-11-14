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
            data: {pageTitle: 'My Pizzas'}
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

    .controller('MyPizzasCtrl', function MyPizzas($scope) {


    });



