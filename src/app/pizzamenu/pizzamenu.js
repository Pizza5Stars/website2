angular.module('app.pizzamenu', [
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

    .controller('PizzaMenuCtrl', function PizzaProfile($scope) {
    });


