(function () {

    angular
        .module('app')
        .factory('fopagServices', fopagServices);

    fopagServices.$inject = ['$http'];
    function fopagServices($http) {

        var srv = {
            getEstilos: getEstilos,
            getEmpresas: getEmpresas,
            getAgentes: getAgentes,
            getTaxas: getTaxas,
        }

        function getEstilos() {
            return $http.get('src/app/fopag/estilos.json');
        }

        function getEmpresas() {
            return $http.get('src/app/fopag/db/empresas.json');
        }

        function getAgentes() {
            return $http.get('src/app/fopag/db/agentes.json');
        }

        function getTaxas() {
            return $http.get('src/app/fopag/db/taxas.json');
        }

        return srv;
    }
})()