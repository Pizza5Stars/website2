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
                }
            }
        });
    })

    .controller('PizzaMenuCtrl', function PizzaMenu($scope, $state, pizzaSuggestions, pizzas, CrudService) {
        $scope.pizzaSuggestions = pizzaSuggestions.data;
        $scope.pizzas = pizzas.data;
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


    });




