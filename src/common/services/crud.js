angular.module('services.crud', ['app.config'])
    .factory('CrudService', function ($http, API_URL) {
        return {
            createUser: function (customer) {
                return $http.post(API_URL + '/customer', customer, {headers: {'Content-Type': 'application/json'}});
            },
            getIngredients: function () {
                return $http.get(API_URL + '/ingredients');
            },
            getPizzasByIds: function (ids) {
                //http://localhost:1337/pizza/?ids=1&ids=2
                var params = "?";
                for (var i = 0; i < ids.length; i++) {
                    params += "&ids=" + ids[i];
                }
                return $http.get(API_URL + '/pizza' + params)
            },

            getSuggestions: function () {
                return $http.get(API_URL + '/pizza/suggestions')
            },

            getSizes: function () {
                return $http.get(API_URL + '/pizza/sizes');
            },
            createPizza: function (pizza) {
                return $http.post(API_URL + '/pizza', pizza, {headers: {'Content-Type': 'application/json'}});
            },
            addAddressToCustomer: function (address) {
                console.log(address);
                return $http.post(API_URL + '/customer/address', address, {headers: {'Content-Type': 'application/json'}});
            },

            createAddress: function (address) {
                return $http.post(API_URL + '/address', address, {headers: {'Content-Type': 'application/json'}});
            },

            getAddressesFromcustomer: function () {
                return $http.get(API_URL + '/customer/addresses');
            },

            getPizzaFromcustomer: function () {
                return $http.get(API_URL + '/customer/pizzas');
            }

        }
    });
