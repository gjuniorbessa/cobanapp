/*! gaw-droplist - v1.0.27 - 2019-07-22 */

(function () {
    'use strict';

    angular.module('bb.droplist.tmpl', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('bb/droplist.html',
            '<div class="droplist" \n' +
            'ng-class="{\'is-open\': vm.isOpen, \'has-content\': content || hasTranscluded}">\n' +
            '    <div class="droplist__inner">\n' +
            '        <span role="button" tabindex="0" \n' +
            'aria-expanded="{{vm.isOpen}}" ng-click="vm.open()">\n' +
            '            <i \n' +
            'class="mi" ng-if="icon">{{icon}}</i>\n' +
            '            <span ng-bind-html="title" \n' +
            'class="droplist__title" ng-class="{\'blur\': vm.isOpen}"></span>\n' +
            '            <i \n' +
            'class="droplist__arrow mi" ng-if="arrow">{{arrow}}</i>\n' +
            '        </span>\n' +
            '        <div ng-show="vm.isOpen" class="droplist__content" \n' +
            'ng-style="vm.style">\n' +
            '            <p ng-bind-html="content" ng-if="content"></p>\n' +
            '\n' +
            '            <ng-transclude></ng-transclude>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>\n' +
            '');
    }]);
}());

(function () {
    'use strict';

    /**
     * Droplist
     */

    angular
        .module('bb.droplist', ['bb.droplist.tmpl', 'ngSanitize'])
        .controller('bbDroplistController', droplistController)
        .directive('bbDroplist', droplist);

    function droplistController() {
        /* jshint validthis: true */

        var vm = this;

        vm.isOpen = false;

        vm.open = function () {
            vm.isOpen = !vm.isOpen;
        };
    }

    droplist.$inject = ['$document'];

    function droplist($document) {
        var directive = {
            controller: 'bbDroplistController',
            controllerAs: 'vm',
            link: link,
            replace: true,
            restrict: 'E',
            scope: {
                icon: '@?bbIcon',
                title: '@bbTitle',
                arrow: '@?bbArrow',
                content: '@?bbContent',
                isReverse: '=?bbIsReverse',
                closeOnSelect: '=?bbCloseOnSelect',
                droplist: '=?bbControl'
            },
            templateUrl: 'bb/droplist.html',
            transclude: true
        };

        return directive;

        function link(scope, element, attrs, ctrl, $transcludeFn) {
            scope.droplist = scope.droplist || {};
            scope.droplist.close = ctrl.open;

            scope.style = '';
            scope.clickCount = 0;
            scope.isOpen = false;
            scope.hasTranscluded = false;

            // Check if has content for transclude
            $transcludeFn(function (clone) {
                if (clone.length) {
                    scope.hasTranscluded = true;
                }
            });

            // Set a default icon if not have bbArrow attribute or is empty
            var icon = 'arrow_drop_down';

            if (typeof attrs.bbArrow === 'undefined') {
                attrs.bbArrow = icon;
            }

            if (scope.isReverse) {
                angular.element(element[0].querySelector('.droplist__inner')).addClass('droplist__reverse');
            }

            if (!scope.closeOnSelect) {
                scope.closeOnSelect = false;
            }

            attrs.$observe('bbArrow', function (newVal) {
                if (!newVal) {
                    scope.arrow = icon;
                }
            });

            var close = function () {
                scope.$apply(function () {
                    ctrl.isOpen = false;
                });
            };

            // Close if click outside element
            var clickHandler = function (event) {
                if (element !== event.target && !element[0].contains(event.target)) {
                    scope.isOpen = false;
                    close();
                }

                // console.log(scope.clickCount);

                if (element[0].contains(event.target)) {
                    if (scope.isOpen && scope.closeOnSelect) {
                        if (scope.clickCount === 0) {
                            scope.clickCount = 1;
                            close();
                        } else {
                            scope.clickCount = 0;
                        }
                    }

                    if (scope.clickCount === 0 && scope.closeOnSelect) {
                        scope.isOpen = !scope.isOpen;
                        console.log(scope.isOpen);
                    }
                } else {
                    scope.isOpen = false;
                    scope.clickCount = 0;
                }
            };

            angular.element(element[0].children).find('span').on('keydown', function (event) {
                if (event.keyCode === 13) {
                    scope.$apply(function () {
                        ctrl.isOpen = !ctrl.isOpen;
                    });
                }
                var focussable = element[0].children[0].children[1].querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (!focussable.length) {
                    angular.element(element[0].querySelector('.droplist__content')).attr('tabindex', '0');
                }
            });

            element.on('keydown', function (event) {
                if (event.keyCode === 27) {
                    scope.$apply(function () {
                        ctrl.isOpen = false;
                        angular.element(element[0].children).find('span')[0].focus();
                    });
                }
            });

            function setRightPosition() {
                addCss(element, scope, ctrl);
            }

            $document.on('click', clickHandler);
            $document.on('keydown', clickHandler);

            angular.element(element).on('click', setRightPosition);

            scope.$on('$destroy', function () {
                $document.off('click', clickHandler);
            });
        }

        function addCss(element, scope, ctrl) {
            if (scope.isReverse) {
                var maxSize = 13;
                var elements = element[0].querySelectorAll('li').length;
                var sizeEachElement = 2.5;
                var guttherCorrection = 0.5;
                var size = elements * sizeEachElement + guttherCorrection;
                ctrl.style = { 'top': -(size > maxSize ? maxSize : size) + 'rem' };
                scope.$apply();
            }
        }
    }
})();
