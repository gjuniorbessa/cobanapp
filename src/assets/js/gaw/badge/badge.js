/*! gaw-badge - v1.0.9 - 2017-02-07 */

(function() {
'use strict';

angular.module('bb.badge.tmpl', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('bb/badge.html',
        '<span class="badge">{{content}}</span>\n' +
        '');
}]);
}());

(function() {
    'use strict';

    /**
     * Badge
     */

    angular
        .module('bb.badge', ['bb.badge.tmpl'])
        .directive('bbBadge', badge);

    function badge() {
        var directive = {
            link: link,
            replace: true,
            restrict: 'E',
            scope: {
                content: '@?bbContent',
                position: '@?bbPosition',
                type: '@?bbType'
            },
            templateUrl: 'bb/badge.html'
        };

        return directive;

        function link(scope, element) {
            if (!!scope.position) {
                var positions = scope.position.split(' ').map(function(position) {
                    return 'badge--' + position;
                }).join(' ');

                element.addClass(positions);
                element.parent().css('position', 'relative');
            }

            if (!!scope.type) {
                element.addClass('badge--' + scope.type);
            }
        }
    }
}());
