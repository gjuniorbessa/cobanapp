/*! gaw-is-class - v1.0.9 - 2017-07-10 */

(function() {
    'use strict';

    /**
     * isClass
     */
    angular
        .module('bb.isClass', [])
        .directive('bbIsClass', bbIsClass);

    bbIsClass.$inject = ['$animate'];

    // Avoiding use of ng-class as it creates a lot of watchers when a class is to be applied to
    // at most one element.
    function bbIsClass($animate) {
        //                    11111111          22222222
        var ON_REGEXP = /^\s*([\s\S]+?)\s+on\s+([\s\S]+?)\s*$/;
        //                    11111111           22222222
        var IS_REGEXP = /^\s*([\s\S]+?)\s+for\s+([\s\S]+?)\s*$/;

        var directive = {
            compile: compile,
            restrict: 'A'
        };

        return directive;

        function compile(tElement, tAttrs) {
            var linkedScopes = [],
                instances = [],
                expToData = {},
                onExpMatches = tAttrs.bbIsClass.match(ON_REGEXP),
                onExp = onExpMatches[2],
                expsStr = onExpMatches[1],
                exps = expsStr.split(',');
                
            return linkFn;

            function linkFn(scope, element) {
                linkedScopes.push(scope);
                instances.push({
                    scope: scope,
                    element: element
                });

                exps.forEach(function(exp) {
                    addForExp(exp.trim(), scope);
                });

                scope.$on('$destroy', removeScope);
            }

            function addForExp(exp, scope) {
                var matches = exp.match(IS_REGEXP),
                    clazz = scope.$eval(matches[1]),
                    compareWithExp = matches[2],
                    data = expToData[exp];

                if (!data) {
                    var watchFn = function(compareWithVal) {
                        var newActivated = null;

                        instances.some(function(instance) {
                            var thisVal = instance.scope.$eval(onExp);

                            if (angular.equals(thisVal, compareWithVal)) {
                                newActivated = instance;

                                return true;
                            }
                        });

                        if (data.lastActivated !== newActivated) {
                            if (data.lastActivated) {
                                $animate.removeClass(data.lastActivated.element, clazz);
                            }

                            if (newActivated) {
                                $animate.addClass(newActivated.element, clazz);
                            }

                            data.lastActivated = newActivated;
                        }
                    };

                    expToData[exp] = data = {
                        lastActivated: null,
                        scope: scope,
                        watchFn: watchFn,
                        compareWithExp: compareWithExp,
                        watcher: scope.$watch(compareWithExp, watchFn)
                    };
                }

                data.watchFn(scope.$eval(compareWithExp));
            }

            function removeScope(e) {
                var removedScope = e.targetScope,
                    index = linkedScopes.indexOf(removedScope);

                linkedScopes.splice(index, 1);
                instances.splice(index, 1);

                if (linkedScopes.length) {
                    var newWatchScope = linkedScopes[0];

                    angular.forEach(expToData, function(data) {
                        if (data.scope === removedScope) {
                            data.watcher = newWatchScope.$watch(data.compareWithExp, data.watchFn);
                            data.scope = newWatchScope;
                        }
                    });
                } else {
                    expToData = {};
                }
            }
        }
    }
}());
