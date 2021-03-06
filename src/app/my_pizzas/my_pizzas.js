angular.module('app.my_pizzas', [
    'services.crud',
    'ui.router'
])

    .config(function config($stateProvider) {
        $stateProvider.state('my_pizzas', {
            url: '/my_pizzas',
            views: {
                "main": {
                    controller: 'MyPizzasCtrl',
                    templateUrl: 'app/my_pizzas/my_pizzas.tpl.html'

                }
            },
            data: {pageTitle: 'My Pizzas'},
            resolve : {
                mypizzas_saved: function (CrudService) {
                    return CrudService.getPizzasFromCustomer();
                },
                mypizzas_ordered: function (CrudService) {
                    return CrudService.getReceiptsFromCustomer();
                }
            }

        });
    })


    .controller('MyPizzasCtrl', function MyPizzas($scope, $state, mypizzas_saved, mypizzas_ordered, CrudService) {
        $scope.pizzas = mypizzas_saved.data;
        $scope.orderedpizzas = mypizzas_ordered.data;
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
            else{
                var order = createOrderObject(id);
                CrudService.addOrderToCustomer(order).then(function (res) {
                    alert("Order created");
                })
                $state.reload();
            }

        }


    });



