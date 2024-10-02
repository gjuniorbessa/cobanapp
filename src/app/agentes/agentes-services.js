(function () {

    angular
        .module('app')
        .factory('agentesServices', agentesServices);

    agentesServices.$inject = ['$firebaseArray'];
    function agentesServices($firebaseArray) {

        var baseRef = firebase.database().ref();

        var srv = {
            getAgentes: getAgentes,
        }

        function getAgentes() {
            return $firebaseArray(baseRef.child('agentes')).$loaded();
        }

        return srv;
    }
})()