/*! gaw-chip - v1.1.24 - 2019-03-15 */

(function() {
'use strict';

angular.module('bb.chip.tmpl', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('bb/chip.html',
        '<div class="chip" tabindex="0" \n' +
        'aria-label="{{ type === \'updown\' ? desc : title }}: {{mediaText}} {{type === \'updown\' ? title : desc}}">\n' +
        '    <figure ng-if="icon">\n' +
        '        <i class="mi">{{icon}}</i>\n' +
        '    </figure>\n' +
        '    \n' +
        '<figure ng-class="mediaClass" ng-if="img || mediaText">\n' +
        '        <img \n' +
        'ng-src="{{img}}" alt="" ng-if="img" onerror="this.style.display = \'none\';">\n' +
        '        <span ng-bind-html="mediaText" ng-if="mediaText"></span>\n' +
        '    </figure>\n' +
        '\n' +
        '    <div ng-transclude ng-if="!icon && !img && !mediaText && hasTranscluded">\n' +
        '</div>\n' +
        '\n' +
        '    <span>\n' +
        '        <small class="chip__title" ng-if="title" \n' +
        'bb-bind-html-compile="title"></small>\n' +
        '        <span class="chip__desc" \n' +
        'ng-if="desc" bb-bind-html-compile="desc"></span>\n' +
        '    </span>\n' +
        '\n' +
        '</div>\n' +
        '');
}]);
}());

(function() {
    'use strict';

    /**
     * Chip
     */

    angular
        .module('bb.chip', [
            'bb.chip.tmpl',
            'ngSanitize'
        ])
        .directive('bbChip', chip)
        .directive('bbBindHtmlCompile', bindHtmlCompile);

    function chip() {
        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                size: '@?bbSize',
                type: '@?bbType',
                icon: '@?bbIcon',
                img: '@?bbImg',
                title: '@?bbTitle',
                desc: '@?bbDesc',
                media: '@?bbMedia',
                mediaText: '@?bbMediaText'
            },
            templateUrl: 'bb/chip.html',
            transclude: true,
        };

        return directive;

        function link(scope, element, attrs, ctrl, $transcludeFn) {
            var tag = element.parent().length ? element.parent()[0].localName : null;

            $transcludeFn(function(clone) {
                //Verifies if the transcluded element is just an empty #text
                //if it is, should not account as a true transclusion
                var validTextNode = clone.length === 1 && clone[0].nodeName === '#text'
                    && !!clone[0].data.trim();
                if (clone.length && (clone.length > 1 || validTextNode)) {
                    scope.hasTranscluded = true;
                }
            });

            // Remove underline of parent link
            if (tag === 'a') {
                element.parent().css('text-decoration', 'none');
            }

            // Remove spaces if inside a table
            if (tag === 'td') {
                element
                    .css('padding-bottom', '.25rem')
                    .css('padding-top', '.25rem');
            }

            // Site
            if (!!scope.size) {
                element.addClass('chip--' + scope.size);
            }

            // Tipes
            if (!!scope.type) {
                var types = scope.type.split(' ').map(function(type) {
                    return 'chip--' + type;
                }).join(' ');

                element.addClass(types);
            }

            // Media
            if (!scope.img) {
                scope.mediaClass = ['chip--media'];
            } else {
                scope.mediaClass = [];
            }

            if (!!scope.media) {
                var medias = scope.media.split(' ').map(function(type) {
                    return 'media--' + type;
                }).join(' ');

                scope.mediaClass.push(medias);
            }

            if (!!scope.mediaText) {
                scope.mediaClass.push('media--text');
            }

            if (!!scope.type && scope.type.indexOf('dark') >= 0) {
                scope.mediaClass.push('media--dark');
            }
        }
    }

    bindHtmlCompile.$inject = ['$compile'];

    function bindHtmlCompile($compile) {
        var directive = {
            link: link,
            restrict: 'A'
        };

        return directive;

        function link(scope, element, attrs) {
            scope.$watch(function () {
                return scope.$eval(attrs.bbBindHtmlCompile);
            }, function (value) {
                // In case value is a TrustedValueHolderType, sometimes it
                // needs to be explicitly called into a string in order to
                // get the HTML string.
                element.html(value && value.toString());

                // If scope is provided use it, otherwise use parent scope
                var compileScope = scope;

                if (attrs.bbBindHtmlScope) {
                    compileScope = scope.$eval(attrs.bbBindHtmlScope);
                }

                $compile(element.contents())(compileScope);
            });
        }
    }
}());
