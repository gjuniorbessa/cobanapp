/*! gaw-timeline - v1.0.22 - 2018-12-11 */

(function() {
'use strict';

angular.module('bb.timeline.tmpl', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('bb/timeline-item.html',
        '<li ng-class="{ \'timeline--{{status}}\' : status}" role="listitem" tabindex="0" \n' +
        'aria-label="Data: {{dateTime}} {{ref}}. {{desc}}. {{ details ? \'Mais informações: \' + details : \'\'}}">\n' +
        '    <time ng-hide="mode === \'compact\'">\n' +
        '        {{date}}\n' +
        '        <small>\n' +
        '{{time}}</small>\n' +
        '    </time>\n' +
        '    <article ng-class="{\'is-open\': isOpened}">\n' +
        '        <i class="{{ icon }}" ng-if="icon"></i>\n' +
        '        <img ng-if="imageUrl" \n' +
        'ng-src="{{ imageUrl }}">\n' +
        '\n' +
        '        <time ng-show="mode === \'compact\'">\n' +
        '{{dateTime}}</time>\n' +
        '        <p ng-bind-html="desc"></p>\n' +
        '        <small>{{ref}}</small>\n' +
        '\n' +
        '        <span ng-show="details" aria-hidden="true">\n' +
        '        - <a href \n' +
        'class="timeline__icon" ng-click="isOpened = !isOpened" aria-hidden="true">\n' +
        ' {{isOpened ? \'Menos\' : \'Mais\' }} informações</a>\n' +
        '        </span>\n' +
        '\n' +
        '        <div\n' +
        ' ng-bind-html="details" class="timeline__details" \n' +
        'tabindex="{{ isOpened ? \'0\' : \'-1\' }}"></div>\n' +
        '    </article>\n' +
        '</li>\n' +
        '');
    $templateCache.put('bb/timeline.html',
        '<ul class="timeline" ng-transclude tabindex="0" role="list" \n' +
        'aria-label="{{ title ? title + \'.\' : \'Linha do tempo.\'}}"></ul>');
}]);
}());

(function () {
    'use strict';

    /**
     * Timeline
     */

    angular
        .module('bb.timeline', ['bb.timeline.tmpl', 'ngSanitize'])
        .directive('bbTimeline', timeline)
        .directive('bbTimelineItem', timelineItem);

    function timeline() {
        var directive = {
            replace: true,
            restrict: 'E',
            templateUrl: 'bb/timeline.html',
            transclude: true,
            scope: {
                title: '@?bbTitle'
            }
        };

        return directive;
    }

    function timelineItem() {
        var defaultStyle = 'border-width: 2px !important; height: 2rem; width: 2rem; left: -1rem; background-color: #FFFFFF !important; ';
        var materialIconStyle = '-webkit-font-smoothing: antialiased; display: inline-block; font-family: "Material Icons"; font-feature-settings: \'liga\' 1; font-size: inherit; font-style: normal; font-weight: normal; letter-spacing: normal; line-height: 1; text-rendering: auto; text-transform: none; word-wrap: normal; font-size: 1.5rem; text-align: center; padding-top: 2px;';

        var directive = {
            replace: true,
            restrict: 'E',
            scope: {
                date: '@?bbDate',
                time: '@?bbTime',
                desc: '@?bbDesc',
                ref: '@?bbRef',
                status: '@?bbStatus',
                details: '@?bbDetails',
                imageUrl: '@?bbImageUrl',
                icon: '@?bbIcon',
                mode: '@?bbMode'
            },
            templateUrl: 'bb/timeline-item.html',
            link: function (scope, el) {
                if(scope.imageUrl || scope.icon) {
                    el.parent().addClass('timeline--spaced');
                }

                if(scope.mode === 'compact') {
                    el.parent().addClass('timeline--compact');

                    if(!scope.imageUrl && !scope.icon) {
                        el.addClass('timeline--compact--no-image');
                    }
                } else {
                    el.parent().addClass('timeline--default');
                }

                if (scope.imageUrl || scope.icon) {
                    var timelineClass = scope.imageUrl ? 'timeline__image' : 'timeline__icon';
                    var timelineArticle = el[0].querySelector('article');
                    timelineArticle.classList.add(timelineClass)
                }

                function appendStyle(key, initialStyle) {
                    var timelineClass = 'timeline__' + key;
                    el[0].querySelector('article').classList.add(timelineClass)
                }

                getDateStringified();

                function getDateStringified() {
                    if(scope.date) {
                        var dates = scope.date.split('/');
                        var objDate = new Date(dates.pop(), dates.pop() - 1, dates.pop());
                        scope.dateTime = compare(objDate);
                    }
                }

                function compare(past) {
                    var now = new Date();
                    var diffDays = Math.floor((now.getTime() - past.getTime()) / 86400000);
                    var timeString = scope.time ? ' às ' + scope.time : '';
                    if(diffDays === 0) {
                        return 'Hoje' + timeString;
                    } else if (diffDays === 1) {
                        return 'Ontem';
                    } else if(diffDays < 7) {
                        return 'Há ' + diffDays + ' dias';
                    } else if (diffDays >= 7 && diffDays <= 28) {
                        var semanas = Math.floor(diffDays / 7);
                        return 'Há ' + semanas + ' ' + (semanas === 1 ? 'semana' : 'semanas');
                    } else if (diffDays > 28 && now.getMonth() === past.getMonth() && now.getFullYear() === past.getFullYear()) {
                        return 'Há ' + Math.floor(diffDays / 7) + ' semanas';
                    } else if (diffDays > 28 && diffDays < 366) {
                        var meses = Math.floor(diffDays / 30);
                        return 'Há ' + meses + ' ' + (meses === 1 ? 'mês' : 'meses');
                    } else {
                        return scope.date + timeString;
                    }
                }
            }
        };

        return directive;
    }

})();
