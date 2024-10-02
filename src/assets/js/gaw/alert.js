/*! gaw-alert - v1.0.14 - 2017-02-07 */

(function() {
'use strict';

angular.module('bb.alert.tmpl', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('bb/alert-content.html',
        '<div class="alert__area">\n' +
        '    <i class="mi" \n' +
        'ng-show="$parent.icon">{{$parent.icon}}</i>\n' +
        '    <div class="alert__desc" ng-transclude></div>\n' +
        '    <button class="alert__button" ng-click="$parent.vm.openDetails()" \n' +
        'ng-show="$parent.vm.details.hasTranscluded">\n' +
        '        <i \n' +
        'class="mi" ng-show="!$parent.vm.details.open">keyboard-arrow-down</i>\n' +
        '        <i class="mi" ng-show="$parent.vm.details.open">keyboard-arrow-up\n' +
        '</i>\n' +
        '    </button>\n' +
        '    <button class="btn btn--xs btn--line btn--default" \n' +
        'ng-click="$parent.vm.openDetails()" \n' +
        'ng-show="$parent.vm.details.hasTranscluded">Detalhar</button>\n' +
        '    <button \n' +
        'type="button" class="alert__close" ng-show="$parent.vm.closeable" \n' +
        'ng-click="$parent.close({$event: $event})">\n' +
        '        <span aria-hidden="true">\n' +
        '&times;</span>\n' +
        '        <span class="sr-only">Fechar</span>\n' +
        '    </button>\n' +
        '</div>\n' +
        '\n' +
        '');
    $templateCache.put('bb/alert-details.html',
        '<div class="alert__details" ng-transclude></div>\n' +
        '');
    $templateCache.put('bb/alert.html',
        '<div class="gc-alert" ng-class="{\'is-open\': vm.details.open}" role="alert" \n' +
        'aria-live="assertive" ng-transclude></div>\n' +
        '');
}]);
}());

(function() {
    'use strict';

    angular
        .module('bb.alert', ['bb.alert.tmpl'])
        .controller('bbAlertController', controller)
        .directive('bbAlert', alert)
        .directive('bbAlertContent', alertContent)
        .directive('bbAlertDetails', alertDetails);

    controller.$inject = ['$scope', '$element', '$attrs', '$interpolate', '$timeout'];

    function controller($scope, $element, $attrs, $interpolate, $timeout) {
        /* jshint validthis: true */

        var vm = this;

        // Check if have close
        vm.closeable = !!$attrs.bbClose;

        if (vm.closeable) {
            $element.addClass('alert--dismissible');
        }

        // Dismiss functionality
        var dismissOnTimeout = angular.isDefined($attrs.dismissOnTimeout) ?
            $interpolate($attrs.dismissOnTimeout)($scope.$parent) : null;

        if (dismissOnTimeout) {
            $timeout(function() {
                $scope.close();
            }, parseInt(dismissOnTimeout, 10));
        }

        // FIXME: GAW has types in uppercase

        // Convert to lowercase the type attribute and apply
        $timeout(function() {
            if (typeof $scope.type === 'string') {
                $scope.type = $scope.type.toLowerCase();
            }

            $element.addClass('alert--' + ($scope.type || 'warn'));
        });

        // Set defulat icon by message type
        $timeout(function() {
            if ($scope.icon === 'false') {
                $scope.icon = false;
            } else if (!$scope.icon) {
                switch ($scope.type) {
                    case 'success':
                        $scope.icon = 'check_circle';
                        break;
                    case 'info':
                        $scope.icon = 'info';
                        break;
                    case 'error':
                        $scope.icon = 'cancel';
                        break;
                    case 'warn':
                        $scope.icon = 'warning';
                        break;
                }
            }
        });

        // square option
        if ($scope.square === 'true') {
            $element.addClass('alert--square');
        }
    }

    function alert() {
        var directive = {
            controller: 'bbAlertController',
            controllerAs: 'vm',
            replace: true,
            scope: {
                type: '@?bbType',
                close: '&?bbClose',
                icon: '@?bbIcon',
                square: '@?bbSquare'
            },
            templateUrl: 'bb/alert.html',
            transclude: true
        };

        return directive;
    }

    function alertContent() {
        var directive = {
            link: link,
            require: '^bbAlert',
            replace: true,
            scope: false,
            templateUrl: 'bb/alert-content.html',
            transclude: true
        };

        return directive;

        function link(scope, element, attrs, ctrl) {
            // Enable option to show details
            ctrl.details = {
                open: false
            };

            ctrl.openDetails = function() {
                ctrl.details.open = !ctrl.details.open;
            };
        }
    }

    function alertDetails() {
        var directive = {
            link: link,
            require: '^bbAlert',
            replace: true,
            scope: false,
            templateUrl: 'bb/alert-details.html',
            transclude: true
        };

        return directive;

        function link(scope, element, attrs, ctrl, transcludeFn) {
            transcludeFn(function(clone) {
                if (clone.length) {
                    ctrl.details.hasTranscluded = true;
                }
            });
        }
    }
}());
