angular.module('app.createpizza', [
    'services.crud',
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('createpizza', {
            url: '/createpizza',
            views: {
                "main": {
                    controller: 'CreatePizzaCtrl',
                    templateUrl: 'app/createpizza/createpizza.tpl.html'

                }
            },
           // data: {pageTitle: 'Create your pizza'}
        });
    })

    .controller('CreatePizzaCtrl', ['$scope','CrudService', function CreatePizza($scope, CrudService) {
        //$scope.ingredients = [{"name": "Chicken", "price": 1, "category": "Meat"}, {"name": "Dough 1", "price": 1, "category": "Dough"}, {"name": "Dough 2", "price": 1, "category": "Dough"}];
        $scope.ingredients = [];
        CrudService.getIngredients().then(function(response){
            $scope.ingredients = response.data;
        });
            }]);
