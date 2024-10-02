(function (angular) {
    'use strict'

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$rootScope', '$timeout', 'toastr', 'menu'];
    function AppController($rootScope, $timeout, toastr, menu) {

        var vm = this;

        $rootScope.messages = [];

        vm.mouseEnterNav = false;
        vm.item = null;
        vm.menu = menu;

        $rootScope.showToastr = function (message, timeout, type) {

            toastr[type || 'success'](message, '.Box', {
                timeOut: timeout || 3000,
            });
        }

        vm.init = function () {
            console.info('[APP Controller] :: Inicio');
        }

        vm.closeMessage = function (index) {
            $rootScope.messages.splice(index, 1);
        };

        vm.mouseEnter = function (item) {
            if (vm.mouseEnterNav)
                vm.item = item;
            else {
                vm.mouseEnterNav = true;
                $timeout(function () {
                    if (vm.mouseEnterNav)
                        vm.item = item;
                }, 300);
            }
        }

        vm.mouseLeave = function () {
            vm.mouseEnterNav = false;
            vm.item = null
        }
    }

})(angular);