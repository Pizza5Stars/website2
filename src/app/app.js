var app = angular.module('app', [
        'app.home',
        'app.register',
        'app.login',
        'app.config',
        'app.createpizza',
        'app.pizzaprofile',
        'app.my_pizzas',
        'app.pizzamenu',
        'services.auth',
        'services.crud',
        'ui.bootstrap',
        'ui.router',
        'am.multiselect'])

    .config(function appConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    })


    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }])


    .controller('AppCtrl', function AppCtrl($scope, $rootScope, $state, AuthService, AUTH_EVENTS, SUCCESS_EVENTS) {
        $scope.currentUser = null;

        if (AuthService.getToken() !== null) {
            AuthService.authenticate().then(function (data) {
                $scope.currentUser = data
            });
        }

        $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
            console.log('login success')
        });

        $scope.isAuthorized = AuthService.isAuthorized;

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        };

        $scope.setCurrentAddress = function (address) {
            $scope.currentAddress = address;
        };


        $scope.logout = function () {
            AuthService.logout();
            $state.go('home');
            $scope.currentUser = null;
        };

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            /*if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | pizza5stars';
            }*/
        });

        $scope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            $state.current = toState;
            var protectedStates = ['profile'];
            if (protectedStates.indexOf(toState.name) > -1) {
                if (!AuthService.isAuthenticated() || !AuthService.isAuthorized()) {
                    alert('Not authorized, please login first');
                    $state.transitionTo("login");
                    event.preventDefault();
                }
            } else {

            }
        });
    });
