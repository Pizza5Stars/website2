angular.module('app.pizzaprofile', [
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

    .controller('PizzaProfileCtrl', function PizzaProfile($scope) {
    });


