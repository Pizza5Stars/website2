angular.module('app.pizzamenu', [
    'services.crud',
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('pizzamenu', {
            url: '/pizzamenu',
            views: {
                "main": {
                    controller: 'PizzaMenuCtrl',
                    templateUrl: 'app/pizzamenu/pizzamenu.tpl.html'

                }
            },
            data: {pageTitle: 'Pizza menu'}
        });
    })

    .controller('PizzaMenuCtrl', function PizzaMenu($scope) {
        $scope.pizza = CrudService.getPizza();
    });


