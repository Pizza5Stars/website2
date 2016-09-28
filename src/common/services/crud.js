angular.module('services.crud', ['app.config'])
    .factory('CrudService', function ($http, API_URL) {
        return {
            createUser: function (customer) {
                return $http.post(API_URL + '/customer', customer, {headers: {'Content-Type': 'application/json'}});
            }
            //getIngredient: function (ingredient) {
            //   return $http.get(API_URL + '/ingredient', ingredient, {headers: {'Content-Type': 'application/json'}});
            //}
        }
    });
