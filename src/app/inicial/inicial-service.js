(function () {
    'use strict';

    angular
        .module('app')
        .factory('InicialService', InicialService)

    InicialService.$inject = ['$http'];
    function InicialService($http) {

        var baseApi = '/api'

        var service = {
            
        };

        return service;
    }
})();