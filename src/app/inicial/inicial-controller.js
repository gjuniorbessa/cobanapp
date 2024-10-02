(function (angular) {
    'use strict';

    angular
        .module('app')
        .controller('InicialController', InicialController)

    InicialController.$inject = [];

    function InicialController() {

        var vm = this;

        vm.init = function () {}
    }
})(angular);