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

            data: {pageTitle: 'Create your pizza'},
            resolve: {
                ingredients: function (CrudService) {
                    return CrudService.getIngredients();
                },
                sizes: function (CrudService) {
                    /*return CrudService.getSizes();*/
                },
                suggestions: function (CrudService) {
                    /*return CrudService.getSuggestions();*/
                }
            }
        });
    })

    .controller('CreatePizzaCtrl', function CreatePizza($scope, $state, ingredients, suggestions, sizes, CrudService) {
        //.controller('CreatePizzaCtrl', ['$scope','CrudService', function CreatePizza($scope, CrudService) {
        /*$scope.ingredients = [{"name": "Chicken", "price": 1, "category": "Meat"}, {"name": "Dough 1", "price": 1, "category": "Dough"}, {"name": "Dough 2", "price": 1, "category": "Dough"}];
         $scope.ingredients = [];
         CrudService.getIngredients().then(function(response){
         console.log(response);
         $scope.ingredients = response.data;
         console.log($scope.ingredients);
         });*/

        console.log(ingredients);
        initScopeVariables();

        function initScopeVariables() {
            $scope.selectedIngredients = [];
            // To get all types of cheese -> $scope.selectableCheese = $scope.getIngredientsByCategories(["Cheese"]);
            $scope.ingredients = ingredients.data;
            //$scope.suggestions = suggestions.data;
            //$scope.sizes = sizes.data;
            //$scope.selectedSize = sizes.data[0];
            $scope.price = 0;
        }

        function getIngredientByName(name) {
            for (var i = 0; i < $scope.ingredients.length; i++) {
                if ($scope.ingredients[i].name === name) {
                    return $scope.ingredients[i];
                }
            }
        }

        function createImagePathsFromIngredientNames() {
            for (var i = 0; i < $scope.ingredients.length; i++) {
                $scope.ingredients[i].imagePath = './assets/' + $scope.ingredients[i].name + '.png';
            }
        }

        $scope.getIngredientsByCategories = function (categories) {
            if (categories.constructor !== Array) {
                categories = [categories]
            }

            var ingredients = [];
            for (var i = 0; i < $scope.ingredients.length; i++) {
                if (categories.indexOf($scope.ingredients[i].category) !== -1) {
                    ingredients.push($scope.ingredients[i]);
                }
            }
            return ingredients;
        };

        $scope.findIngredientByName = function (name) {
            for (var i = 0; i < $scope.ingredients.length; i++) {
                if ($scope.ingredients[i].name === name) {
                    return $scope.ingredients[i];
                }
            }
        };

        $scope.resetIngredients = function () {
            $scope.selectedIngredients.splice(0, $scope.selectedIngredients.length);
        };
    });


