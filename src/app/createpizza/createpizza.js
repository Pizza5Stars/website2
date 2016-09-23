angular.module('app.createpizza', [
    'services.crud',
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('createpizza', {
            url: '/createPizza',
            views: {
                "main": {
                    controller: 'CreatePizzaCtrl',
                    templateUrl: 'app/createpizza/createpizza.tpl.html'

                }
            },
            data: {pageTitle: 'Create your pizza'}
        });
    })

    .controller('CreatePizzaCtrl', function CreatePizza($scope) {
    });
