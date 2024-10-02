(function () {
    'use strict';

    angular
        .module('app')
        .directive('sort', sort);

    function sort() {
        return {
            restrict: 'E',
            replace: true,
            require: 'ngModel',
            scope: {
                column: "@",
                text: "@",
                align: "@",
                sort: "<ngModel"
            },
            template: '<div class="sort" ng-click="sortClick()"\n' +
                '               ng-class="{ \'sorted\': (sort.indexOf(column) > -1) || (sort.indexOf(\'-\' + column) > -1), \'jc-fe\': align == \'right\'}">\n' +
                '               <span ng-bind-html="text" ng-if="align == \'left\'"></span>\n' +
                '               <i class="mi">\n' +
                '                {{sort.indexOf(\'-\' + column) > -1 ? "arrow_upward" :  "arrow_downward"}}\n' +
                '               </i>\n' +
                '               <span ng-bind-html="text" ng-if="align == \'right\'"></span>\n' +
                '           </div>\n',
            link: function (scope, element, attrs, ngModel) {

                scope.text = scope.text || scope.column;
                scope.align = scope.align || 'left';

                scope.sortClick = function () {
                    var iAsc = scope.sort.indexOf(scope.column);
                    var iDesc = scope.sort.indexOf('-' + scope.column);

                    if (iAsc < 0 && iDesc < 0) {
                        scope.sort.push(scope.column)
                    } else if (iAsc > -1) {
                        scope.sort[iAsc] = '-' + scope.column;
                    } else {
                        scope.sort.splice(iDesc, 1);
                    }

                    ngModel.$setViewValue(scope.sort);

                    console.info(scope.sort);
                }
            }
        };
    }

})();