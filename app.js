(function (angular) {
    'use strict'

    var app = angular.module('app', [
        'ui.router',
        'ngTable',
        'ngSanitize',
        'ngAnimate',
        'toastr',
        'angular-loading-bar',
        'angular.filter',
        'ui.mask',
        'ui.utils.masks',
        'angularMoment',
        'ngFileSaver',
        'ngSanitize',
        'ui.bootstrap',
        'angularFileUpload',
        'bb.alert',
        'bb.datepicker',
        'bb.inputTag',
        'bb.droplist',
        'bb.chip',
        'bb.timeline',
        'bb.fileUpload',
        'bb.dropdown',
        'bb.badge',
        'vs-repeat',
        'siyfion.sfTypeahead'
    ]);

    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {

            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'src/app/inicial/inicial.tpl.html'
                }).state('naoAutorizado', {
                    url: '/naoAutorizado/:papeis',
                    templateUrl: 'src/app/naoAutorizado/naoAutorizado.tpl.html'
                });
        }
    ]);

    /* Loading Bar Progress */
    app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.spinnerTemplate = '<div id="loading-mask"><div id="loading-bar-spinner"><div class="spinner-icon"></div></div></div>';
    }]);

    /* Registrar os interceptadores */
    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('requestInterceptor');
    }]);

    // Evita erros no console ao clicar fora da modal do bootstrap
    app.config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }]);

    app.config(function (toastrConfig) {
        angular.extend(toastrConfig, {
            extendedTimeOut: 1000,
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning'
            },
            progressBar: true,
            tapToDismiss: true,
            timeOut: 3000,
            titleClass: 'toast-title',
            toastClass: 'toast',
            // positionClass: 'toast-bottom-center',
        });
    });

    /* RUN da aplicação */
    app.run(['amMoment', function (amMoment) {

        amMoment.changeLocale('pt-br');
        moment.locale('pt-br');

        window.swal = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn--primary',
                cancelButton: 'btn btn--line btn--danger'
            },
            buttonsStyling: false,
            reverseButtons: true,
            cancelButtonText: 'Cancelar'
        })
    }]);

    app.directive(
        "mAppLoading",
        function ($animate) {

            return ({
                link: link,
                restrict: "C"
            });

            function link(scope, element, attributes) {

                $animate.leave(element.children().eq(1)).then(
                    function cleanupAfterAnimation() {

                        element.remove();
                        scope = element = attributes = null;
                        var wrap = document.querySelector(".wrap");
                        wrap.style.display = "flex";
                    }
                );
            }
        }
    );

    angular.element(document).ready(function () {

        console.info('[App] :: Run...');
        angular.bootstrap(document, ['app']);

    });

})(angular);