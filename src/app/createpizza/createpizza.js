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
        //var ingredients = [];

        function initScopeVariables() {
            $scope.selectedIngredients = [];
            $scope.sizes = sizes.data;
            $scope.totalPrice = 0;
            // To get all types of cheese -> $scope.selectableCheese = $scope.getIngredientsByCategories(["Cheese"]);
            $scope.ingredients = ingredients.data;
            //$scope.suggestions = suggestions.data;
            //$scope.sizes = sizes.data;
            //$scope.selectedSize = sizes.data[0];
            //$scope.ingredientSettings = {enableSearch: true}
            $scope.selectVegetables = [];
            $scope.exampleVegg = [{
                "label": "Alabama",
                "id": "AL"
            }, {
                "label": "Alaska",
                "id": "AK"
            }, {
                "label": "American Samoa",
                "id": "AS"
            }]
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
            $scope.totalPrice = 0;
            for (var i = 0; i < selectedIngredients.length; i++){
                $scope.totalPrice = $scope.totalPrice + $scope.findPriceByName(newIngredients[i]);
            }
            return totalPrice;
            /*$scope.$watchCollection('selectedIngredients', function(newIngredients, oldIngredients, scope) {
             for (var i = newIngredients.length; i > oldIngredients.length; i--){
             $scope.totalPrice = $scope.totalPrice + $scope.findPriceByName(newIngredients[i]);
             }
             })*/
        };


        /* $scope.calculatePriceOfPizza = function (pizza) {
         $scope.price = 0;
         for (var i = 0; i < pizza.ingredients.length; i++) {
         var ingredientName = pizza.ingredients[i];
         var ingredient = getIngredientByName(ingredientName);
         $scope.price += ingredient.price;
         }
         var priceFactor;
         for(i = 0; i < $scope.sizes.length; i++) {
         if ($scope.sizes[i].name === pizza.sizeName){
         priceFactor = $scope.sizes[i].priceFactor;
         }
         $scope.price *= priceFactor;
         }
         }

         /*function getTotal() {
         $scope.selectedIngredients = [];
         $scope.value = function (isSelected, ingredient) {
         if (isSelected == true) {
         $scope.selectedIngredients.push(ingredient);
         } else {
         console.log(ingredient.name);
         angular.forEach($scope.selectedIngredients, function (ingredientRmv, $index) {
         if (ingredientRmv.name == ingredient.name) {
         $scope.selectedIngredients.splice($index, 1);
         }
         })
         }
         }
         };*/
    });


