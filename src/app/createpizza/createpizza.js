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
                    return CrudService.getSizes();
                },
                suggestions: function (CrudService) {
                    /*return CrudService.getSuggestions();*/
                }
            }
        });
    })

    .controller('CreatePizzaCtrl', function CreatePizza($scope, $state, ingredients, suggestions, sizes, CrudService) {
        initScopeVariables();

        function initScopeVariables() {
            $scope.selectedIngredients = [];
            $scope.selectedSize = [];
            $scope.selectedDough = [];
            $scope.selectedSauce = [];
            $scope.selectedMeat = [];
            $scope.selectedCheese = [];
            $scope.selectedVegetables = [];

            $scope.sizes = sizes.data;
            $scope.ingredients = ingredients.data;
            $scope.totalPrice = 0;
            //$scope.suggestions = suggestions.data;
            $scope.selectVegetables = [];
            $scope.dropdownSetting = {
                scrollable: true,
                scrollableHeight : '200px'
            }
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

        //fetch data from database for show in multiselect dropdown
        $scope.getIngredientsByCategories2 = function(categories){
            var ingredients = [];
            $http.get('/ingredients').then(function (data) {
                angular.forEach(data.data, function (value, index) {
                    ingredients.push({ category_name: value.CategoryName, name: value.Name });
                });
            })
        }

        $scope.findIngredientByName = function (name) {
            for (var i = 0; i < $scope.ingredients.length; i++) {
                if ($scope.ingredients[i].name === name) {
                    return $scope.ingredients[i];
                }
            }
        };

        $scope.findPriceByName = function (name) {
            for (var i = 0; i < $scope.ingredients.length; i++) {
                if ($scope.ingredients[i].name === name) {
                    return $scope.ingredients[i].price;
                }
            }
        };

        $scope.resetIngredients = function () {
            $scope.selectedIngredients.splice(0, $scope.selectedIngredients.length);
        };

        $scope.calculatePrice = function() {
            $scope.selectedIngredients = $scope.selectedCheese.concat($scope.selectedSauce).concat($scope.selectedMeat).concat($scope.selectedVegetables);
            if(!angular.isArray($scope.selectedDough)){
                $scope.selectedIngredients.push($scope.selectedDough)
            }
            $scope.totalPrice = 0;
            for (var i = 0; i < $scope.selectedIngredients.length; i++){
                $scope.totalPrice = $scope.totalPrice + $scope.findPriceByName($scope.selectedIngredients[i]);
            }

            // getSize price factor and multiply it with the total
            var priceFactor;
            for (i = 0; i < $scope.sizes.length; i++) {
                if ($scope.sizes[i].name === $scope.selectedSize) {
                    priceFactor = $scope.sizes[i].priceFactor;
                }
            }
            $scope.totalPrice *= priceFactor;

            console.log($scope.selectedSize);
        };

    });


