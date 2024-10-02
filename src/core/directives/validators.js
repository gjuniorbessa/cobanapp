(function (angular) {
    'use strict'

    angular
        .module('app')
        .directive('gedipValidator', ['$q', '$http', function ($q, $http) {
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {

                    ctrl.$asyncValidators.gedipValidator = function (modelValue, viewValue) {

                        scope.pesquisandoGedip = true;

                        console.info(scope.pesquisandoGedip);                        

                        if (ctrl.$isEmpty(modelValue)) {
                            scope.pesquisandoGedip = false;
                            return $q.resolve();
                        }

                        var gedip = parseInt(modelValue, 10);

                        if (isNaN(gedip)) {
                            scope.pesquisandoGedip = false;
                            return $q.reject();
                        }

                        var def = $q.defer();

                        $http.get('/api/v1/gedip/estado/' + gedip, { ignoreLoadingBar: true }).then(function (resp) {
                            
                            scope.pesquisandoGedip = false;
                            
                            console.info(resp);

                            if (resp && resp.data > 0) {
                                def.resolve();
                            }
                            else {
                                def.reject();
                            }
                        });

                        return def.promise;
                    };
                }
            };
        }]);

})(angular)