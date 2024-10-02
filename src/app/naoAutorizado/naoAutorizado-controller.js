(function (angular) {
    'use strict';

    angular
        .module('app')
        .controller('NaoAutorizadoController', NaoAutorizadoController)

    NaoAutorizadoController.$inject = ['$stateParams'];
    function NaoAutorizadoController($stateParams) {
        
        var vm = this;
        
        
        vm.init = function () { 
            vm.papeis = $stateParams.papeis;
            vm.papeis = vm.papeis.replace(/,/gi, ' ou ');
        }
    }
})(angular);