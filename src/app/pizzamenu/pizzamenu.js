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
                },
                pizzas: function (CrudService) {
                    return CrudService.getPizzasFromCustomer();
                },
                ingredients: function (CrudService) {
                    return CrudService.getIngredients();
                },
                sizes: function (CrudService) {
                    return CrudService.getSizes();
                },
            }
        });
    })

    .controller('PizzaMenuCtrl', function PizzaMenu($scope, $state, pizzaSuggestions, pizzas,ingredients,sizes, CrudService) {
        $scope.pizzaSuggestions = pizzaSuggestions.data;
        $scope.pizzas = pizzas.data;
        $scope.sizes = sizes.data;
        $scope.ingredients = ingredients.data;
        CrudService.getAddressesFromCustomer().then(function (res) {
            $scope.addresses = res.data;
        });


        function createOrderObject(id) {
            return {
                addressId: $scope.addresses[0].id,
                pizzaIds: [id]
            };
        }

        $scope.addOrderToCustomer = function(id) {
            if ($scope.addresses.length < 1) {
                $state.go("pizzaprofile");
                alert("Please add an address first!");

            }
            else {
                var order = createOrderObject(id);
                CrudService.addOrderToCustomer(order).then(function (res) {
                    alert("Order created");
                    $state.go("my_pizzas");
                })
            }
        }

        $scope.calculatePrice = function(pizza) {
            totalPrice = 0;
            for (var i = 0; i < pizza.ingredients.length; i++){
                totalPrice = totalPrice + $scope.findPriceByName(pizza.ingredients[i]);
            }

            // getSize price factor and multiply it with the total
            var priceFactor;
            for (i = 0; i < $scope.sizes.length; i++) {
                if ($scope.sizes[i].name === pizza.sizeName) {
                    priceFactor = $scope.sizes[i].priceFactor;
                }
            }
            totalPrice *= priceFactor;

            return totalPrice;
        };

        $scope.findPriceByName = function (name) {
            for (var i = 0; i < $scope.ingredients.length; i++) {
                if ($scope.ingredients[i].name === name) {
                    return $scope.ingredients[i].price;
                }
            }
        };

    });




