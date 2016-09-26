angular.module('app.createpizza', [
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('createpizza', {
            url: '/createpizza',
            views: {
                "other": {
                    controller: 'CreatePizzaCtrl',
                    templateUrl: 'app/createpizza/createpizza.tpl.html'

                }
            },
            data: {pageTitle: 'Create your pizza'}
        });
    })

    .controller('CreatePizzaCtrl', function CreatePizza($scope) {
    });
