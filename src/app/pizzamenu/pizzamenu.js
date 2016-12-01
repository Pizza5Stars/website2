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
            data: {pageTitle: 'Pizza menu'},
            resolve: {
                pizzaSuggestions: function (CrudService) {
                    return CrudService.getPizzaSuggestions();
                }
            }
        });
    })

    .controller('PizzaMenuCtrl', function PizzaMenu($scope, $state, pizzaSuggestions, CrudService) {

        $scope.pizzaSuggestions = pizzaSuggestions.data;
        console.log($scope.pizzaSuggestions);

    });




