(function (angular) {

    angular
        .module('app')
        .factory('requestInterceptor', ['$rootScope', '$q', function ($rootScope, $q) {

            var requestInterceptor = {
                response: function (response) {
                    if (response && response.config && response.config.url && response.config.url.indexOf('/api') > -1) {
                        // console.info('response ok', response)
                        //$rootScope.messages = [];
                    }

                    return response;
                },
                responseError: function (response) {

                    console.error(response);

                    if (response.config && response.config.ignoreError === true) {
                        return $q.reject(response);
                    }

                    if (!response.data || !response.data.message) $q.reject(response);

                    // Objeto não encontrado
                    if (response.status == 404 || response.status == 406) {
                        $rootScope.messages.push({
                            text: response.data.message,
                            type: 'warn'
                        })
                    }

                    // ERRO
                    if (response.status == 500 || response.status == 401 || response.status == 400) {
                        $rootScope.messages.push({
                            text: response.data.message,
                            type: 'error'
                        })
                    }

                    return $q.reject(response);
                }
            };

            return requestInterceptor;
        }]);

})(angular)
