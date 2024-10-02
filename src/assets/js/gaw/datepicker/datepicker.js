/*! gaw-datepicker - v1.0.29 - 2019-01-03 */

(function() {
'use strict';

angular.module('bb.datepicker.tmpl', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('bb/datepicker.day.html',
        '<table class="datepicker-daypicker" role="grid" \n' +
        'aria-labelledby="{{::uniqueId}}-title" \n' +
        'aria-activedescendant="{{activeDateId}}">\n' +
        '    <thead>\n' +
        '        <tr>\n' +
        '            \n' +
        '<th>\n' +
        '                <button type="button" class="btn btn--default btn--sm" \n' +
        'tabindex="-1" ng-click="move(-1)">\n' +
        '                    <i \n' +
        'class="mi">keyboard_arrow_left</i>\n' +
        '                </button>\n' +
        '            \n' +
        '</th>\n' +
        '            <th class="text-center" colspan="{{::5 + showWeeks}}">\n' +
        '                <button id="{{::uniqueId}}-title" type="button" \n' +
        'class="btn btn--block btn--sm" tabindex="-1" role="heading" \n' +
        'aria-live="assertive" aria-atomic="true" ng-click="toggleMode()" \n' +
        'ng-disabled="datepickerMode === maxMode">\n' +
        '                    <strong>{{title}}\n' +
        '</strong>\n' +
        '                </button>\n' +
        '            </th>\n' +
        '            <th \n' +
        'class="ta-right">\n' +
        '                <button type="button" \n' +
        'class="btn btn--default btn--sm" tabindex="-1" ng-click="move(1)">\n' +
        '                    <i class="mi">keyboard_arrow_right</i>\n' +
        '                </button>\n' +
        '            </th>\n' +
        '        </tr>\n' +
        '        <tr>\n' +
        '            <th class="text-center" ng-if="showWeeks"></th>\n' +
        '            <th \n' +
        'class="text-center" ng-repeat="label in ::labels track by $index">\n' +
        '                <small aria-label="{{::label.full}}">{{::label.abbr}}</small>\n' +
        '            </th>\n' +
        '        </tr>\n' +
        '    </thead>\n' +
        '    <tbody>\n' +
        '        <tr \n' +
        'class="datepicker-weeks" ng-repeat="row in rows track by $index">\n' +
        '            \n' +
        '<td class="text-center" ng-if="showWeeks">\n' +
        '                <em>\n' +
        '{{weekNumbers[$index]}}</em>\n' +
        '            </td>\n' +
        '            <td \n' +
        'class="datepicker-day text-center" role="gridcell" id="{{::dt.uid}}" \n' +
        'ng-repeat="dt in row" ng-class="::dt.customClass">\n' +
        '                <button \n' +
        'type="button" class="btn btn--default btn--sm" tabindex="-1" \n' +
        'bb-is-class="\'btn--info\' for selectedDt, \'is-active\' for activeDt on dt" \n' +
        'ng-click="select(dt.date)" aria-disabled="{{dt.disabled}}" \n' +
        'ng-disabled="::dt.disabled">\n' +
        '                    <span \n' +
        'ng-class="::{\'tx-muted\': dt.secondary, \'tx-primary\': dt.current}">\n' +
        '{{::dt.label}}</span>\n' +
        '                </button>\n' +
        '            </td>\n' +
        '        </tr>\n' +
        '\n' +
        '    </tbody>\n' +
        '</table>\n' +
        '');
    $templateCache.put('bb/datepicker.html',
        '<div class="datepicker" role="application" ng-switch="datepickerMode" \n' +
        'ng-keydown="keydown($event)">\n' +
        '    <bb-daypicker ng-switch-when="day" \n' +
        'tabindex="0"></bb-daypicker>\n' +
        '    <bb-monthpicker ng-switch-when="month" \n' +
        'tabindex="0"></bb-monthpicker>\n' +
        '    <bb-yearpicker ng-switch-when="year" \n' +
        'tabindex="0"></bb-yearpicker>\n' +
        '</div>\n' +
        '');
    $templateCache.put('bb/datepicker.month.html',
        '<table class="monthpicker" role="grid" aria-labelledby="{{::uniqueId}}-title" \n' +
        'aria-activedescendant="{{activeDateId}}">\n' +
        '    <thead>\n' +
        '        <tr>\n' +
        '            \n' +
        '<th>\n' +
        '                <button type="button" class="btn btn--default btn--sm" \n' +
        'tabindex="-1" ng-click="move(-1)">\n' +
        '                    <i \n' +
        'class="mi">keyboard_arrow_left</i>\n' +
        '                </button>\n' +
        '            \n' +
        '</th>\n' +
        '            <th>\n' +
        '                <button id="{{::uniqueId}}-title" \n' +
        'type="button" class="btn btn--default btn--sm" role="heading" tabindex="-1" \n' +
        'aria-live="assertive" aria-atomic="true" ng-click="toggleMode()" \n' +
        'ng-disabled="datepickerMode === maxMode">\n' +
        '                    <strong>{{title}}\n' +
        '</strong>\n' +
        '                </button>\n' +
        '            </th>\n' +
        '            <th>\n' +
        '                <button type="button" class="btn btn--default btn--sm" \n' +
        'tabindex="-1" ng-click="move(1)">\n' +
        '                    <i \n' +
        'class="mi">keyboard_arrow_right</i>\n' +
        '                </button>\n' +
        '            \n' +
        '</th>\n' +
        '        </tr>\n' +
        '    </thead>\n' +
        '    <tbody>\n' +
        '        <tr class="months" \n' +
        'ng-repeat="row in rows track by $index">\n' +
        '            <td id="{{::dt.uid}}" \n' +
        'class="month text-center" role="gridcell" ng-repeat="dt in row" \n' +
        'ng-class="::dt.customClass">\n' +
        '                <button type="button" \n' +
        'class="btn btn-default" tabindex="-1" \n' +
        'bb-is-class="\'btn--info\' for selectedDt, \'is-active\' for activeDt on dt" \n' +
        'ng-click="select(dt.date)" ng-disabled="::dt.disabled">\n' +
        '                    \n' +
        '<span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span>\n' +
        '                </button>\n' +
        '            </td>\n' +
        '        </tr>\n' +
        '    </tbody>\n' +
        '\n' +
        '</table>\n' +
        '');
    $templateCache.put('bb/datepicker.popup.html',
        '<div>\n' +
        '    <ul class="datepicker-popup dropdown-menu-popup" dropdown-nested \n' +
        'ng-if="isOpen" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" \n' +
        'ng-keydown="keydown($event)" ng-click="$event.stopPropagation()">\n' +
        '        <li \n' +
        'ng-transclude></li>\n' +
        '        <li ng-if="showButtonBar" class="button-bar">\n' +
        '            <span class="btn-group pull-left">\n' +
        '                <button \n' +
        'type="button" class="btn btn--default btn--sm btn--info datepicker-current" \n' +
        'ng-click="select(\'today\', $event)" ng-disabled="isDisabled(\'today\')">\n' +
        '{{ getText(\'current\') }}</button>\n' +
        '                <button type="button" \n' +
        'class="btn btn--default btn--sm btn-danger clear" \n' +
        'ng-click="select(null, $event)">{{ getText(\'clear\') }}</button>\n' +
        '            \n' +
        '</span>\n' +
        '            <button type="button" \n' +
        'class="btn btn--default btn--sm btn-success pull-right close" \n' +
        'ng-click="close($event)">{{ getText(\'close\') }}</button>\n' +
        '        </li>\n' +
        '    \n' +
        '</ul>\n' +
        '</div>\n' +
        '');
    $templateCache.put('bb/datepicker.year.html',
        '<table class="yearpicker" role="grid" aria-labelledby="{{::uniqueId}}-title" \n' +
        'aria-activedescendant="{{activeDateId}}">\n' +
        '    <thead>\n' +
        '        <tr>\n' +
        '            \n' +
        '<th>\n' +
        '                <button type="button" \n' +
        'class="btn btn--default btn--sm pull-left left" ng-click="move(-1)" \n' +
        'tabindex="-1">\n' +
        '                    <i class="mi">keyboard_arrow_left</i>\n' +
        '                </button>\n' +
        '            </th>\n' +
        '            <th \n' +
        'colspan="{{::columns - 2}}">\n' +
        '                <button id="{{::uniqueId}}-title" \n' +
        'role="heading" aria-live="assertive" aria-atomic="true" type="button" \n' +
        'class="btn btn--default btn--sm title" ng-click="toggleMode()" \n' +
        'ng-disabled="datepickerMode === maxMode" tabindex="-1">\n' +
        '                    \n' +
        '<strong>{{title}}</strong>\n' +
        '                </button>\n' +
        '            </th>\n' +
        '            <th>\n' +
        '                <button type="button" \n' +
        'class="btn btn--default btn--sm pull-right right" ng-click="move(1)" \n' +
        'tabindex="-1">\n' +
        '                    <i class="mi">keyboard_arrow_right</i>\n' +
        '                </button>\n' +
        '            </th>\n' +
        '        </tr>\n' +
        '    </thead>\n' +
        '    \n' +
        '<tbody>\n' +
        '        <tr class="years" ng-repeat="row in rows track by $index">\n' +
        '            <td ng-repeat="dt in row" class="year text-center" role="gridcell" \n' +
        'id="{{::dt.uid}}" ng-class="::dt.customClass">\n' +
        '                <button \n' +
        'type="button" class="btn btn-default" \n' +
        'bb-is-class="\'btn--info\' for selectedDt, \'is-active\' for activeDt on dt" \n' +
        'ng-click="select(dt.date)" ng-disabled="::dt.disabled" tabindex="-1">\n' +
        '                    <span ng-class="::{\'text-info\': dt.current}">\n' +
        '{{::dt.label}}</span>\n' +
        '                </button>\n' +
        '            </td>\n' +
        '        </tr>\n' +
        '\n' +
        '    </tbody>\n' +
        '</table>\n' +
        '');
}]);
}());

(function() {
    'use strict';

    angular
        .module('bb.datepicker', [
            'bb.datepicker.tmpl',
            'bb.dateparser',
            'bb.isClass',
            'bb.position'
        ])
        .value('$datepickerSuppressError', false)
        .value('bbDatepickerAttributeWarning', true)
        .constant('bbDatepickerConfig', {
            datepickerMode: 'day',
            formatDay: 'dd',
            formatMonth: 'MMMM',
            formatYear: 'yyyy',
            formatDayHeader: 'EEE',
            formatDayTitle: 'MMMM yyyy',
            formatMonthTitle: 'yyyy',
            maxDate: null,
            maxMode: 'year',
            minDate: null,
            minMode: 'day',
            ngModelOptions: {},
            shortcutPropagation: false,
            showWeeks: true,
            yearColumns: 5,
            yearRows: 4
        })
        .controller('bbDatepickerController', bbDatepickerController)
        .controller('bbDaypickerController', bbDaypickerController)
        .controller('bbMonthpickerController', bbMonthpickerController)
        .controller('bbYearpickerController', bbYearpickerController)
        .directive('bbDatepicker', bbDatepicker)
        .directive('bbDaypicker', bbDaypicker)
        .directive('bbMonthpicker', bbMonthpicker)
        .directive('bbYearpicker', bbYearpicker)
        .value('bbDatepickerPopupAttributeWarning', true)
        .constant('bbDatepickerPopupConfig', {
            altInputFormats: [],
            appendToBody: false,
            clearText: 'Limpar',
            closeOnDateSelection: true,
            closeText: 'Fechar',
            currentText: 'Hoje',
            datepickerPopup: 'yyyy-MM-dd',
            datepickerPopupTemplateUrl: 'bb/datepicker.popup.html',
            datepickerTemplateUrl: 'bb/datepicker.html',
            html5Types: {
                date: 'yyyy-MM-dd',
                'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',
                'month': 'yyyy-MM'
            },
            onOpenFocus: true,
            showButtonBar: true,
            placement: 'auto bottom-left'
        })
        .controller('bbDatepickerPopupController', bbDatepickerPopupController)
        .directive('bbDatepickerPopup', bbDatepickerPopup)
        .directive('bbDatepickerPopupWrap', bbDatepickerPopupWrap);

    bbDatepickerController.$inject = ['$scope', '$attrs', '$parse', '$interpolate',
        '$locale', '$log', 'dateFilter', 'bbDatepickerConfig', '$datepickerSuppressError',
        'bbDatepickerAttributeWarning', 'bbDateParser'
    ];

    /* jshint maxparams: false */
    /* jshint maxstatements: false */
    function bbDatepickerController($scope, $attrs, $parse, $interpolate, $locale,
        $log, dateFilter, datepickerConfig, $datepickerSuppressError,
        datepickerAttributeWarning, dateParser) {
        /* jshint maxcomplexity: false */
        /* jshint validthis: true */

        var vm = this,
            ngModelCtrl = {
                $setViewValue: angular.noop
            }, // nullModelCtrl;
            ngModelOptions = {},
            watchListeners = [],
            datepickerOptions = {};

        // Modes chain
        vm.modes = ['day', 'month', 'year'];

        if ($attrs.datepickerOptions) {
            angular.forEach([
                'formatDay',
                'formatDayHeader',
                'formatDayTitle',
                'formatMonth',
                'formatMonthTitle',
                'formatYear',
                'initDate',
                'maxDate',
                'maxMode',
                'minDate',
                'minMode',
                'showWeeks',
                'shortcutPropagation',
                'startingDay',
                'yearColumns',
                'yearRows'
            ], function(key) {
                switch (key) {
                    case 'formatDay':
                    case 'formatDayHeader':
                    case 'formatDayTitle':
                    case 'formatMonth':
                    case 'formatMonthTitle':
                    case 'formatYear':
                        vm[key] = angular.isDefined($scope.datepickerOptions[key]) ?
                            $interpolate($scope.datepickerOptions[key])($scope.$parent) :
                            datepickerConfig[key];
                        break;
                    case 'showWeeks':
                    case 'shortcutPropagation':
                    case 'yearColumns':
                    case 'yearRows':
                        vm[key] = angular.isDefined($scope.datepickerOptions[key]) ?
                            $scope.datepickerOptions[key] : datepickerConfig[key];
                        break;
                    case 'startingDay':
                        if (angular.isDefined($scope.datepickerOptions.startingDay)) {
                            vm.startingDay = $scope.datepickerOptions.startingDay;
                        } else if (angular.isNumber(datepickerConfig.startingDay)) {
                            vm.startingDay = datepickerConfig.startingDay;
                        } else {
                            vm.startingDay =
                                ($locale.DATETIME_FORMATS.FIRSTDAYOFWEEK + 8) % 7;
                        }

                        break;
                    case 'maxDate':
                    case 'minDate':
                        if ($scope.datepickerOptions[key]) {
                            $scope.$watch(function() {
                                return $scope.datepickerOptions[key];
                            }, function(value) {
                                if (value) {
                                    if (angular.isDate(value)) {
                                        vm[key] = dateParser.fromTimezone(new Date(
                                            value), ngModelOptions.timezone);
                                    } else {
                                        vm[key] = new Date(dateFilter(value, 'medium'));
                                    }
                                } else {
                                    vm[key] = null;
                                }

                                vm.refreshView();
                            });
                        } else {
                            vm[key] = datepickerConfig[key] ? dateParser.fromTimezone(new Date(
                                    datepickerConfig[key]),
                                ngModelOptions.timezone) : null;
                        }

                        break;
                    case 'maxMode':
                    case 'minMode':
                        if ($scope.datepickerOptions[key]) {
                            $scope.$watch(function() {
                                return $scope.datepickerOptions[key];
                            }, function(value) {
                                vm[key] = $scope[key] = angular.isDefined(value) ?
                                    value : datepickerOptions[key];

                                if (key === 'minMode' &&
                                    vm.modes.indexOf($scope.datepickerMode) < vm.modes
                                    .indexOf(
                                        vm[key]) ||
                                    key === 'maxMode' &&
                                    vm.modes.indexOf($scope.datepickerMode) > vm.modes
                                    .indexOf(
                                        vm[key])) {
                                    $scope.datepickerMode = vm[key];
                                }
                            });
                        } else {
                            vm[key] = $scope[key] = datepickerConfig[key] || null;
                        }

                        break;
                    case 'initDate':
                        if ($scope.datepickerOptions.initDate) {
                            vm.activeDate = dateParser.fromTimezone(
                                    $scope.datepickerOptions.initDate, ngModelOptions.timezone
                                ) ||
                                new Date();

                            $scope.$watch(function() {
                                return $scope.datepickerOptions.initDate;
                            }, function(initDate) {
                                if (initDate && (ngModelCtrl.$isEmpty(ngModelCtrl.$modelValue) ||
                                        ngModelCtrl.$invalid)) {
                                    vm.activeDate = dateParser.fromTimezone(initDate,
                                        ngModelOptions.timezone);
                                    vm.refreshView();
                                }
                            });
                        } else {
                            vm.activeDate = new Date();
                        }
                }
            });
        } else {
            // Interpolated configuration attributes
            angular.forEach(['formatDay', 'formatMonth', 'formatYear', 'formatDayHeader',
                'formatDayTitle', 'formatMonthTitle'
            ], function(key) {
                vm[key] = angular.isDefined($attrs[key]) ?
                    $interpolate($attrs[key])($scope.$parent) : datepickerConfig[key];
            });

            // Evaled configuration attributes
            angular.forEach(['showWeeks', 'yearRows', 'yearColumns', 'shortcutPropagation'],
                function(key) {
                vm[key] = angular.isDefined($attrs[key]) ?
                    $scope.$parent.$eval($attrs[key]) : datepickerConfig[key];
            });

            if (angular.isDefined($attrs.startingDay)) {
                vm.startingDay = $scope.$parent.$eval($attrs.startingDay);
            } else if (angular.isNumber(datepickerConfig.startingDay)) {
                vm.startingDay = datepickerConfig.startingDay;
            } else {
                vm.startingDay = ($locale.DATETIME_FORMATS.FIRSTDAYOFWEEK + 8) % 7;
            }

            // Watchable date attributes
            angular.forEach(['minDate', 'maxDate'], function(key) {
                if ($attrs[key]) {
                    watchListeners.push($scope.$parent.$watch($attrs[key], function(value) {
                        if (value) {
                            if (angular.isDate(value)) {
                                vm[key] = dateParser.fromTimezone(new Date(value),
                                    ngModelOptions.timezone);
                            } else {
                                vm[key] = new Date(dateFilter(value, 'medium'));
                            }
                        } else {
                            vm[key] = null;
                        }

                        vm.refreshView();
                    }));
                } else {
                    vm[key] = datepickerConfig[key] ? dateParser.fromTimezone(
                        new Date(datepickerConfig[key]), ngModelOptions.timezone) : null;
                }
            });

            angular.forEach(['minMode', 'maxMode'], function(key) {
                if ($attrs[key]) {
                    watchListeners.push($scope.$parent.$watch($attrs[key], function(value) {
                        vm[key] = $scope[key] = angular.isDefined(value) ? value :
                            $attrs[key];

                        if (key === 'minMode' && vm.modes.indexOf($scope.datepickerMode) <
                            vm.modes.indexOf(vm[key]) ||
                            key === 'maxMode' && vm.modes.indexOf($scope.datepickerMode) >
                            vm.modes.indexOf(vm[key])) {
                            $scope.datepickerMode = vm[key];
                        }
                    }));
                } else {
                    vm[key] = $scope[key] = datepickerConfig[key] || null;
                }
            });

            if (angular.isDefined($attrs.initDate)) {
                this.activeDate = dateParser.fromTimezone(
                    $scope.$parent.$eval($attrs.initDate), ngModelOptions.timezone) ||
                        new Date();

                watchListeners.push($scope.$parent.$watch($attrs.initDate, function(initDate) {
                    if (initDate && (ngModelCtrl.$isEmpty(ngModelCtrl.$modelValue) ||
                            ngModelCtrl.$invalid)) {
                        vm.activeDate = dateParser.fromTimezone(initDate, ngModelOptions.timezone);
                        vm.refreshView();
                    }
                }));
            } else {
                this.activeDate = new Date();
            }
        }

        $scope.datepickerMode = $scope.datepickerMode ||
            datepickerConfig.datepickerMode;
        $scope.uniqueId = 'datepicker-' + $scope.$id + '-' + Math.floor(Math.random() * 10000);

        $scope.disabled = angular.isDefined($attrs.disabled) || false;
        if (angular.isDefined($attrs.ngDisabled)) {
            watchListeners.push($scope.$parent.$watch($attrs.ngDisabled, function(disabled) {
                $scope.disabled = disabled;
                vm.refreshView();
            }));
        }

        $scope.isActive = function(dateObject) {
            if (vm.compare(dateObject.date, vm.activeDate) === 0) {
                $scope.activeDateId = dateObject.uid;

                return true;
            }

            return false;
        };

        this.init = function(ngModelCtrl_) {
            ngModelCtrl = ngModelCtrl_;
            ngModelOptions = ngModelCtrl_.$options || datepickerConfig.ngModelOptions;

            this.activeDate = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue.getTime()) : new Date();

            ngModelCtrl.$render = function() {
                vm.render();
            };
        };

        this.render = function() {
            if (ngModelCtrl.$viewValue) {
                var date = new Date(ngModelCtrl.$viewValue),
                    isValid = !isNaN(date);

                if (isValid) {
                    this.activeDate = dateParser.fromTimezone(date, ngModelOptions.timezone);
                } else if (!$datepickerSuppressError) {
                    $log.error('Datepicker directive: "ng-model" value must be a Date object');
                }
            }
            this.refreshView();
        };

        this.refreshView = function() {
            if (this.element) {
                $scope.selectedDt = null;
                this._refreshView();
                if ($scope.activeDt) {
                    $scope.activeDateId = $scope.activeDt.uid;
                }

                var date = ngModelCtrl.$viewValue ?
                    new Date(ngModelCtrl.$viewValue) : null;

                date = dateParser.fromTimezone(date, ngModelOptions.timezone);
                ngModelCtrl.$setValidity('dateDisabled', !date ||
                    this.element && !this.isDisabled(date));
            }
        };

        this.createDateObject = function(date, format) {
            var model = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : null;

            model = dateParser.fromTimezone(model, ngModelOptions.timezone);

            var dt = {
                date: date,
                label: dateParser.filter(date, format),
                selected: model && this.compare(date, model) === 0,
                disabled: this.isDisabled(date),
                current: this.compare(date, new Date()) === 0,
                customClass: this.customClass(date) || null
            };

            if (model && this.compare(date, model) === 0) {
                $scope.selectedDt = dt;
            }

            if (vm.activeDate && this.compare(dt.date, vm.activeDate) === 0) {
                $scope.activeDt = dt;
            }

            return dt;
        };

        this.isDisabled = function(date) {
            return $scope.disabled ||
                this.minDate && this.compare(date, this.minDate) < 0 ||
                this.maxDate && this.compare(date, this.maxDate) > 0 ||
                $attrs.dateDisabled && $scope.dateDisabled({
                    date: date,
                    mode: $scope.datepickerMode
                });
        };

        this.customClass = function(date) {
            return $scope.customClass({
                date: date,
                mode: $scope.datepickerMode
            });
        };

        // Split array into smaller arrays
        this.split = function(arr, size) {
            var arrays = [];
            while (arr.length > 0) {
                arrays.push(arr.splice(0, size));
            }
            return arrays;
        };

        $scope.select = function(date) {
            if ($scope.datepickerMode === vm.minMode) {
                var dt = ngModelCtrl.$viewValue ?
                    dateParser.fromTimezone(new Date(ngModelCtrl.$viewValue),
                        ngModelOptions.timezone) : new Date(0, 0, 0, 0, 0, 0, 0);
                dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
                dt = dateParser.toTimezone(dt, ngModelOptions.timezone);
                ngModelCtrl.$setViewValue(dt);
                ngModelCtrl.$render();
            } else {
                vm.activeDate = date;
                $scope.datepickerMode = vm.modes[vm.modes.indexOf($scope.datepickerMode) - 1];
                $scope.$emit('bb:datepicker.mode');
            }
        };

        $scope.move = function(direction) {
            var year = vm.activeDate.getFullYear() + direction * (vm.step.years || 0),
                month = vm.activeDate.getMonth() + direction * (vm.step.months || 0);

            vm.activeDate.setFullYear(year, month, 1);
            vm.refreshView();
        };

        $scope.toggleMode = function(direction) {
            direction = direction || 1;

            if ($scope.datepickerMode === vm.maxMode && direction === 1 ||
                $scope.datepickerMode === vm.minMode && direction === -1) {
                return;
            }

            $scope.datepickerMode = vm.modes[vm.modes.indexOf($scope.datepickerMode) + direction];
            $scope.$emit('bb:datepicker.mode');
        };

        // Key event mapper
        $scope.keys = {
            13: 'enter',
            32: 'space',
            33: 'pageup',
            34: 'pagedown',
            35: 'end',
            36: 'home',
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        var focusElement = function() {
            vm.element[0].focus();
        };

        // Listen for focus requests from popup directive
        $scope.$on('bb:datepicker.focus', focusElement);

        $scope.keydown = function(evt) {
            var key = $scope.keys[evt.which];

            if (!key || evt.shiftKey || evt.altKey || $scope.disabled) {
                return;
            }

            evt.preventDefault();
            if (!vm.shortcutPropagation) {
                evt.stopPropagation();
            }

            if (key === 'enter' || key === 'space') {
                if (vm.isDisabled(vm.activeDate)) {
                    return; // Do nothing
                }
                $scope.select(vm.activeDate);
                setTimeout(function(){
                    $scope.$broadcast('bb:datepicker.focus');
                }, 10)
            } else if (evt.ctrlKey && (key === 'up' || key === 'down')) {
                $scope.toggleMode(key === 'up' ? 1 : -1);
                setTimeout(function(){
                    $scope.$broadcast('bb:datepicker.focus');
                }, 10)
            } else {
                vm.handleKeyDown(key, evt);
                vm.refreshView();
            }
        };

        $scope.$on('$destroy', function() {
            // Clear all watch listeners on destroy
            while (watchListeners.length) {
                watchListeners.shift()();
            }
        });
    }

    bbDaypickerController.$inject = ['$scope', '$element', 'dateFilter'];

    function bbDaypickerController(scope, $element, dateFilter) {
        var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        /* jshint validthis: true */

        this.step = {
            months: 1
        };

        this.element = $element;

        function getDaysInMonth(year, month) {
            return month === 1 && year % 4 === 0 &&
                (year % 100 !== 0 || year % 400 === 0) ? 29 : DAYS_IN_MONTH[month];
        }

        this.init = function(ctrl) {
            angular.extend(ctrl, this);
            scope.showWeeks = ctrl.showWeeks;
            ctrl.refreshView();
        };

        this.getDates = function(startDate, n) {
            var dates = new Array(n),
                current = new Date(startDate),
                i = 0,
                date;
            while (i < n) {
                date = new Date(current);
                dates[i] = date;
                i += 1;
                current.setDate(current.getDate() + 1);
            }
            return dates;
        };

        this._refreshView = function() {
            var year = this.activeDate.getFullYear(),
                month = this.activeDate.getMonth(),
                firstDayOfMonth = new Date(this.activeDate);

            firstDayOfMonth.setFullYear(year, month, 1);

            var difference = this.startingDay - firstDayOfMonth.getDay(),
                numDisplayedFromPreviousMonth = difference > 0 ?
                7 - difference : -difference,
                firstDate = new Date(firstDayOfMonth);

            if (numDisplayedFromPreviousMonth > 0) {
                firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
            }

            // 42 is the number of days on a six-week calendar
            var days = this.getDates(firstDate, 42);
            for (var i = 0; i < 42; i += 1) {
                days[i] = angular.extend(this.createDateObject(days[i], this.formatDay), {
                    secondary: days[i].getMonth() !== month,
                    uid: scope.uniqueId + '-' + i
                });
            }

            scope.labels = new Array(7);
            for (var j = 0; j < 7; j += 1) {
                scope.labels[j] = {
                    abbr: dateFilter(days[j].date, this.formatDayHeader),
                    full: dateFilter(days[j].date, 'EEEE')
                };
            }

            scope.title = dateFilter(this.activeDate, this.formatDayTitle);
            scope.rows = this.split(days, 7);

            if (scope.showWeeks) {
                scope.weekNumbers = [];
                var thursdayIndex = (4 + 7 - this.startingDay) % 7,
                    numWeeks = scope.rows.length;
                for (var curWeek = 0; curWeek < numWeeks; curWeek += 1) {
                    scope.weekNumbers.push(
                        getISO8601WeekNumber(scope.rows[curWeek][thursdayIndex].date));
                }
            }
        };

        this.compare = function(date1, date2) {
            var _date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
            var _date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
            _date1.setFullYear(date1.getFullYear());
            _date2.setFullYear(date2.getFullYear());
            return _date1 - _date2;
        };

        function getISO8601WeekNumber(date) {
            var checkDate = new Date(date);
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)); // Thursday
            var time = checkDate.getTime();
            checkDate.setMonth(0); // Compare with Jan 1
            checkDate.setDate(1);
            return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
        }

        this.handleKeyDown = function(key) {
            /* jshint maxcomplexity: false */

            var date = this.activeDate.getDate();

            if (key === 'left') {
                date = date - 1;
            } else if (key === 'up') {
                date = date - 7;
            } else if (key === 'right') {
                date = date + 1;
            } else if (key === 'down') {
                date = date + 7;
            } else if (key === 'pageup' || key === 'pagedown') {
                var month = this.activeDate.getMonth() + (key === 'pageup' ? -1 : 1);
                this.activeDate.setMonth(month, 1);
                date = Math.min(getDaysInMonth(this.activeDate.getFullYear(),
                    this.activeDate.getMonth()), date);
            } else if (key === 'home') {
                date = 1;
            } else if (key === 'end') {
                date = getDaysInMonth(this.activeDate.getFullYear(), this.activeDate.getMonth());
            }

            this.activeDate.setDate(date);
        };
    }

    bbMonthpickerController.$inject = ['$scope', '$element', 'dateFilter'];

    function bbMonthpickerController(scope, $element, dateFilter) {

        /* jshint validthis: true */

        this.step = {
            years: 1
        };
        this.element = $element;

        this.init = function(ctrl) {
            angular.extend(ctrl, this);
            ctrl.refreshView();
        };

        this._refreshView = function() {
            var months = new Array(12),
                year = this.activeDate.getFullYear(),
                date;

            for (var i = 0; i < 12; i += 1) {
                date = new Date(this.activeDate);
                date.setFullYear(year, i, 1);
                months[i] = angular.extend(this.createDateObject(date, this.formatMonth), {
                    uid: scope.uniqueId + '-' + i
                });
            }

            scope.title = dateFilter(this.activeDate, this.formatMonthTitle);
            scope.rows = this.split(months, 3);
        };

        this.compare = function(date1, date2) {
            var _date1 = new Date(date1.getFullYear(), date1.getMonth());
            var _date2 = new Date(date2.getFullYear(), date2.getMonth());
            _date1.setFullYear(date1.getFullYear());
            _date2.setFullYear(date2.getFullYear());
            return _date1 - _date2;
        };

        this.handleKeyDown = function(key) {
            /* jshint maxcomplexity: false */

            var date = this.activeDate.getMonth();

            if (key === 'left') {
                date = date - 1;
            } else if (key === 'up') {
                date = date - 3;
            } else if (key === 'right') {
                date = date + 1;
            } else if (key === 'down') {
                date = date + 3;
            } else if (key === 'pageup' || key === 'pagedown') {
                var year = this.activeDate.getFullYear() + (key === 'pageup' ? -1 : 1);
                this.activeDate.setFullYear(year);
            } else if (key === 'home') {
                date = 0;
            } else if (key === 'end') {
                date = 11;
            }
            this.activeDate.setMonth(date);
        };
    }

    bbYearpickerController.$inject = ['$scope', '$element', 'dateFilter'];

    function bbYearpickerController(scope, $element) {

        /* jshint validthis: true */

        var columns,
            range;

        this.element = $element;

        function getStartingYear(year) {
            return parseInt((year - 1) / range, 10) * range + 1;
        }

        this.yearpickerInit = function() {
            columns = this.yearColumns;
            range = this.yearRows * columns;
            this.step = {
                years: range
            };
        };

        this._refreshView = function() {
            var years = new Array(range),
                date;

            for (var i = 0, start = getStartingYear(this.activeDate.getFullYear());
                i < range; i += 1) {
                date = new Date(this.activeDate);
                date.setFullYear(start + i, 0, 1);
                years[i] = angular.extend(this.createDateObject(date, this.formatYear), {
                    uid: scope.uniqueId + '-' + i
                });
            }

            scope.title = [years[0].label, years[range - 1].label].join(' - ');
            scope.rows = this.split(years, columns);
            scope.columns = columns;
        };

        this.compare = function(date1, date2) {
            return date1.getFullYear() - date2.getFullYear();
        };

        this.handleKeyDown = function(key) {
            /* jshint maxcomplexity: false */

            var date = this.activeDate.getFullYear();

            if (key === 'left') {
                date = date - 1;
            } else if (key === 'up') {
                date = date - columns;
            } else if (key === 'right') {
                date = date + 1;
            } else if (key === 'down') {
                date = date + columns;
            } else if (key === 'pageup' || key === 'pagedown') {
                date += (key === 'pageup' ? -1 : 1) * range;
            } else if (key === 'home') {
                date = getStartingYear(this.activeDate.getFullYear());
            } else if (key === 'end') {
                date = getStartingYear(this.activeDate.getFullYear()) + range - 1;
            }

            this.activeDate.setFullYear(date);
        };
    }

    function bbDatepicker() {
        return {
            replace: true,
            templateUrl: function(element, attrs) {
                return attrs.templateUrl || 'bb/datepicker.html';
            },
            scope: {
                datepickerMode: '=?',
                datepickerOptions: '=?',
                dateDisabled: '&',
                customClass: '&',
                shortcutPropagation: '&?'
            },
            require: ['bbDatepicker', '^ngModel'],
            controller: 'bbDatepickerController',
            controllerAs: 'datepicker',
            link: function(scope, element, attrs, ctrls) {
                var datepickerCtrl = ctrls[0],
                    ngModelCtrl = ctrls[1];

                datepickerCtrl.init(ngModelCtrl);
            }
        };
    }

    function bbDaypicker() {
        return {
            replace: true,
            templateUrl: function(element, attrs) {
                return attrs.templateUrl || 'bb/datepicker.day.html';
            },
            require: ['^bbDatepicker', 'bbDaypicker'],
            controller: 'bbDaypickerController',
            link: function(scope, element, attrs, ctrls) {
                var datepickerCtrl = ctrls[0],
                    daypickerCtrl = ctrls[1];

                daypickerCtrl.init(datepickerCtrl);
            }
        };
    }

    function bbMonthpicker() {
        return {
            replace: true,
            templateUrl: function(element, attrs) {
                return attrs.templateUrl || 'bb/datepicker.month.html';
            },
            require: ['^bbDatepicker', 'bbMonthpicker'],
            controller: 'bbMonthpickerController',
            link: function(scope, element, attrs, ctrls) {
                var datepickerCtrl = ctrls[0],
                    monthpickerCtrl = ctrls[1];

                monthpickerCtrl.init(datepickerCtrl);
            }
        };
    }

    function bbYearpicker() {
        return {
            replace: true,
            templateUrl: function(element, attrs) {
                return attrs.templateUrl || 'bb/datepicker.year.html';
            },
            require: ['^bbDatepicker', 'bbYearpicker'],
            controller: 'bbYearpickerController',
            link: function(scope, element, attrs, ctrls) {
                var ctrl = ctrls[0];
                angular.extend(ctrl, ctrls[1]);
                ctrl.yearpickerInit();

                ctrl.refreshView();
            }
        };
    }

    bbDatepickerPopupController.$inject = ['$scope', '$element', '$attrs', '$compile', '$log',
        '$parse', '$window', '$document', '$rootScope', '$bbPosition', 'dateFilter', 'bbDateParser',
        'bbDatepickerPopupConfig', '$timeout', 'bbDatepickerConfig'/* , 'bbDatepickerPopupAttributeWarning' */
    ];

    function bbDatepickerPopupController($scope, $element, $attrs, $compile, $log, $parse,
        $window, $document, $rootScope, $position, dateFilter, dateParser, datepickerPopupConfig,
        $timeout, datepickerConfig/*, datepickerPopupAttributeWarning */) {
        /* jshint maxcomplexity: false */
        /* jshint validthis: true */

        var cache = {},
            isHtml5DateInput = false,
            dateFormat,
            closeOnDateSelection,
            appendToBody,
            onOpenFocus,
            datepickerPopupTemplateUrl,
            datepickerTemplateUrl,
            popupEl,
            datepickerEl,
            scrollParentEl,
            ngModel,
            ngModelOptions,
            $popup,
            altInputFormats,
            watchListeners = [];

        $scope.watchData = {};

        this.init = function(_ngModel_) {
            ngModel = _ngModel_;
            ngModelOptions = _ngModel_.$options || datepickerConfig.ngModelOptions;
            if (angular.isDefined($scope.datepickerOptions)) {
                closeOnDateSelection =
                    angular.isDefined($scope.datepickerOptions.closeOnDateSelection) ?
                    $scope.datepickerOptions.closeOnDateSelection :
                    datepickerPopupConfig.closeOnDateSelection;
                appendToBody = angular.isDefined($scope.datepickerOptions.datepickerAppendToBody) ?
                    $scope.datepickerOptions.datepickerAppendToBody :
                    datepickerPopupConfig.datepickerAppendToBody;
                onOpenFocus = angular.isDefined($scope.datepickerOptions.onOpenFocus) ?
                    $scope.datepickerOptions.onOpenFocus :
                    datepickerPopupConfig.onOpenFocus;
                datepickerPopupTemplateUrl =
                    angular.isDefined($scope.datepickerOptions.datepickerPopupTemplateUrl) ?
                    $scope.datepickerOptions.datepickerPopupTemplateUrl :
                    datepickerPopupConfig.datepickerPopupTemplateUrl;
                datepickerTemplateUrl =
                    angular.isDefined($scope.datepickerOptions.datepickerTemplateUrl) ?
                    $scope.datepickerOptions.datepickerTemplateUrl :
                    datepickerPopupConfig.datepickerTemplateUrl;
                altInputFormats = angular.isDefined($scope.datepickerOptions.altInputFormats) ?
                    $scope.datepickerOptions.altInputFormats :
                    datepickerPopupConfig.altInputFormats;
            } else {
                closeOnDateSelection = angular.isDefined($attrs.closeOnDateSelection) ?
                    $scope.$parent.$eval($attrs.closeOnDateSelection) :
                    datepickerPopupConfig.closeOnDateSelection;
                appendToBody = angular.isDefined($attrs.datepickerAppendToBody) ?
                    $scope.$parent.$eval($attrs.datepickerAppendToBody) :
                    datepickerPopupConfig.appendToBody;
                onOpenFocus = angular.isDefined($attrs.onOpenFocus) ?
                    $scope.$parent.$eval($attrs.onOpenFocus) : datepickerPopupConfig.onOpenFocus;
                datepickerPopupTemplateUrl = angular.isDefined($attrs.datepickerPopupTemplateUrl) ?
                    $attrs.datepickerPopupTemplateUrl :
                    datepickerPopupConfig.datepickerPopupTemplateUrl;
                datepickerTemplateUrl = angular.isDefined($attrs.datepickerTemplateUrl) ?
                    $attrs.datepickerTemplateUrl : datepickerPopupConfig.datepickerTemplateUrl;
                altInputFormats = angular.isDefined($attrs.altInputFormats) ?
                    $scope.$parent.$eval($attrs.altInputFormats) :
                    datepickerPopupConfig.altInputFormats;

                $scope.showButtonBar = angular.isDefined($attrs.showButtonBar) ?
                    $scope.$parent.$eval($attrs.showButtonBar) :
                    datepickerPopupConfig.showButtonBar;
            }

            if (datepickerPopupConfig.html5Types[$attrs.type]) {
                dateFormat = datepickerPopupConfig.html5Types[$attrs.type];
                isHtml5DateInput = true;
            } else {
                dateFormat = $attrs.bbDatepickerPopup || datepickerPopupConfig.datepickerPopup;

                $attrs.$observe('bbDatepickerPopup', function(value) {
                    var newDateFormat = value || datepickerPopupConfig.datepickerPopup;
                    // Invalidate the $modelValue to ensure that formatters re-run
                    // FIXME: Refactor when PR is merged: https://github.com/angular/angular.js/pull/10764
                    if (newDateFormat !== dateFormat) {
                        dateFormat = newDateFormat;
                        ngModel.$modelValue = null;

                        if (!dateFormat) {
                            throw new Error(
                                'bbDatepickerPopup must have a date format specified.'
                            );
                        }
                    }
                });
            }

            if (!dateFormat) {
                throw new Error('bbDatepickerPopup must have a date format specified.');
            }

            if (isHtml5DateInput && $attrs.bbDatepickerPopup) {
                throw new Error('HTML5 date input types do not support custom formats.');
            }

            // popup element used to display calendar
            popupEl = angular.element(
                '<div bb-datepicker-popup-wrap><div bb-datepicker></div></div>');
            $scope.ngModelOptions = angular.copy(ngModelOptions);
            $scope.ngModelOptions.timezone = null;
            popupEl.attr({
                'ng-model': 'date',
                'ng-model-options': 'ngModelOptions',
                'ng-change': 'dateSelection(date)',
                'template-url': datepickerPopupTemplateUrl
            });

            // datepicker element
            datepickerEl = angular.element(popupEl.children()[0]);
            datepickerEl.attr('template-url', datepickerTemplateUrl);

            if (isHtml5DateInput) {
                if ($attrs.type === 'month') {
                    datepickerEl.attr('datepicker-mode', '"month"');
                    datepickerEl.attr('min-mode', 'month');
                }
            }

            if ($scope.datepickerOptions) {
                datepickerEl.attr('datepicker-options', 'datepickerOptions');

                if (angular.isDefined($scope.datepickerOptions.datepickerMode)) {
                    datepickerEl.attr('datepicker-mode', 'datepickerOptions.datepickerMode');
                }
            }

            angular.forEach(['minMode', 'maxMode', 'datepickerMode', 'shortcutPropagation'],
                function(key) {
                    if ($attrs[key]) {
                        var getAttribute = $parse($attrs[key]);
                        var propConfig = {
                            get: function() {
                                return getAttribute($scope.$parent);
                            }
                        };

                        datepickerEl.attr(cameltoDash(key), 'watchData.' + key);

                        // Propagate changes from datepicker to outside
                        if (key === 'datepickerMode') {
                            var setAttribute = getAttribute.assign;
                            propConfig.set = function(v) {
                                setAttribute($scope.$parent, v);
                            };
                        }

                        Object.defineProperty($scope.watchData, key, propConfig);
                    }
                });

            angular.forEach(['minDate', 'maxDate', 'initDate'], function(key) {
                if ($attrs[key]) {
                    var getAttribute = $parse($attrs[key]);

                    watchListeners.push($scope.$parent.$watch(getAttribute, function(value) {
                        if (key === 'minDate' || key === 'maxDate') {
                            if (value === null) {
                                cache[key] = null;
                            } else if (angular.isDate(value)) {
                                cache[key] = dateParser.fromTimezone(new Date(
                                    value), ngModelOptions.timezone);
                            } else {
                                cache[key] = new Date(dateFilter(value,
                                    'medium'));
                            }

                            $scope.watchData[key] = value === null ? null :
                                cache[key];
                        } else {
                            var date = value ? new Date(value) : new Date();
                            $scope.watchData[key] = dateParser.fromTimezone(
                                date, ngModelOptions.timezone);
                        }
                    }));

                    datepickerEl.attr(cameltoDash(key), 'watchData.' + key);
                }
            });

            if ($attrs.dateDisabled) {
                datepickerEl.attr('date-disabled', 'dateDisabled({ date: date, mode: mode })');
            }

            angular.forEach(['formatDay', 'formatMonth', 'formatYear', 'formatDayHeader',
                'formatDayTitle', 'formatMonthTitle', 'showWeeks', 'startingDay',
                'yearRows',
                'yearColumns'
            ], function(key) {
                if (angular.isDefined($attrs[key])) {
                    datepickerEl.attr(cameltoDash(key), $attrs[key]);
                }
            });

            if ($attrs.customClass) {
                datepickerEl.attr('custom-class', 'customClass({ date: date, mode: mode })');
            }

            if (!isHtml5DateInput) {
                // Internal API to maintain the correct ng-invalid-[key] class
                ngModel.$$parserName = 'date';
                ngModel.$validators.date = validator;
                ngModel.$parsers.unshift(parseDate);
                ngModel.$formatters.push(function(value) {
                    if (ngModel.$isEmpty(value)) {
                        $scope.date = value;
                        return value;
                    }

                    $scope.date = dateParser.fromTimezone(value, ngModelOptions.timezone);

                    if (angular.isNumber($scope.date)) {
                        $scope.date = new Date($scope.date);
                    }

                    return dateParser.filter($scope.date, dateFormat);
                });
            } else {
                ngModel.$formatters.push(function(value) {
                    $scope.date = dateParser.fromTimezone(value, ngModelOptions.timezone);
                    return value;
                });
            }

            // Detect changes in the view from the text box
            ngModel.$viewChangeListeners.push(function() {
                $scope.date = parseDateString(ngModel.$viewValue);
            });

            $element.on('keydown', inputKeydownBind);

            $popup = $compile(popupEl)($scope);
            // Prevent jQuery cache memory leak (template is now redundant after linking)
            popupEl.remove();

            if (appendToBody) {
                $document.find('body').append($popup);
            } else {
                $element.after($popup);
            }

            $scope.$on('$destroy', function() {
                if ($scope.isOpen === true) {
                    if (!$rootScope.$$phase) {
                        $scope.$apply(function() {
                            $scope.isOpen = false;
                        });
                    }
                }

                $popup.remove();
                $element.off('keydown', inputKeydownBind);
                $document.off('click', documentClickBind);
                if (scrollParentEl) {
                    scrollParentEl.off('scroll', positionPopup);
                }
                angular.element($window).off('resize', positionPopup);

                //Clear all watch listeners on destroy
                while (watchListeners.length) {
                    watchListeners.shift()();
                }
            });
        };

        $scope.getText = function(key) {
            return $scope[key + 'Text'] || datepickerPopupConfig[key + 'Text'];
        };

        $scope.isDisabled = function(date) {
            if (date === 'today') {
                date = new Date();
            }

            return $scope.watchData.minDate && $scope.compare(date, cache.minDate) < 0 ||
                $scope.watchData.maxDate && $scope.compare(date, cache.maxDate) > 0;
        };

        $scope.compare = function(date1, date2) {
            return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) -
                new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
        };

        // Inner change
        $scope.dateSelection = function(dt) {
            if (angular.isDefined(dt)) {
                $scope.date = dt;
            }
            // Setting to NULL is necessary for form validators to function
            var date = $scope.date ? dateParser.filter($scope.date, dateFormat) : null;

            $element.val(date);
            ngModel.$setViewValue(date);

            if (closeOnDateSelection) {
                $scope.isOpen = false;
                $element[0].focus();
            }
        };

        $scope.keydown = function(evt) {
            if (evt.which === 27) {
                evt.stopPropagation();
                $scope.isOpen = false;
                $element[0].focus();
            }
        };

        $scope.select = function(date, evt) {
            evt.stopPropagation();

            if (date === 'today') {
                var today = new Date();
                if (angular.isDate($scope.date)) {
                    date = new Date($scope.date);
                    date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
                } else {
                    date = new Date(today.setHours(0, 0, 0, 0));
                }
            }
            $scope.dateSelection(date);
        };

        $scope.close = function(evt) {
            evt.stopPropagation();

            $scope.isOpen = false;
            $element[0].focus();
        };

        $scope.disabled = angular.isDefined($attrs.disabled) || false;
        if ($attrs.ngDisabled) {
            watchListeners.push($scope.$parent.$watch($parse($attrs.ngDisabled),
                function(disabled) {
                    $scope.disabled = disabled;
                }));
        }

        $scope.$watch('isOpen', function(value) {
            if (value) {
                if (!$scope.disabled) {
                    $timeout(function() {
                        positionPopup();

                        if (onOpenFocus) {
                            $scope.$broadcast('bb:datepicker.focus');
                        }
                        $document.on('click', documentClickBind);

                        var placement = $attrs.popupPlacement ? $attrs.popupPlacement :
                            datepickerPopupConfig.placement;
                        if (appendToBody || $position.parsePlacement(placement)[2]) {
                            scrollParentEl = scrollParentEl || angular.element(
                                $position.scrollParent($element));
                            if (scrollParentEl) {
                                scrollParentEl.on('scroll', positionPopup);
                            }
                        } else {
                            scrollParentEl = null;
                        }

                        angular.element($window).on('resize', positionPopup);
                    }, 0, false);
                } else {
                    $scope.isOpen = false;
                }
            } else {
                $document.off('click', documentClickBind);
                if (scrollParentEl) {
                    scrollParentEl.off('scroll', positionPopup);
                }
                angular.element($window).off('resize', positionPopup);
            }
        });

        function cameltoDash(string) {
            return string.replace(/([A-Z])/g, function($1) {
                return '-' + $1.toLowerCase();
            });
        }

        function parseDateString(viewValue) {
            var date = dateParser.parse(viewValue, dateFormat, $scope.date);
            if (isNaN(date)) {
                for (var i = 0; i < altInputFormats.length; i += 1) {
                    date = dateParser.parse(viewValue, altInputFormats[i], $scope.date);
                    if (!isNaN(date)) {
                        return date;
                    }
                }
            }
            return date;
        }

        function parseDate(viewValue) {
            if (angular.isNumber(viewValue)) {
                // Presumably timestamp to date object
                viewValue = new Date(viewValue);
            }

            if (!viewValue) {
                return null;
            }

            if (angular.isDate(viewValue) && !isNaN(viewValue)) {
                return viewValue;
            }

            if (angular.isString(viewValue)) {
                var date = parseDateString(viewValue);

                if (!isNaN(date)) {
                    return dateParser.toTimezone(date, ngModelOptions.timezone);
                }
            }

            return ngModel.$options && ngModel.$options.allowInvalid ?
                viewValue : undefined;
        }

        function validator(modelValue, viewValue) {
            var value = modelValue || viewValue;

            if (!$attrs.ngRequired && !value) {
                return true;
            }

            if (angular.isNumber(value)) {
                value = new Date(value);
            }

            if (!value) {
                return true;
            }

            if (angular.isDate(value) && !isNaN(value)) {
                return true;
            }

            if (angular.isString(value)) {
                return !isNaN(parseDateString(viewValue));
            }

            return false;
        }

        function documentClickBind(event) {
            if (!$scope.isOpen && $scope.disabled) {
                return;
            }

            var popup = $popup[0];
            var dpContainsTarget = $element[0].contains(event.target);

            // The popup node may not be an element node
            // In some browsers (IE) only element nodes have the 'contains' function
            var popupContainsTarget = popup.contains !== undefined &&
                popup.contains(event.target);

            if ($scope.isOpen && !(dpContainsTarget || popupContainsTarget)) {
                $scope.$apply(function() {
                    $scope.isOpen = false;
                });
            }
        }

        function inputKeydownBind(evt) {
            if (evt.which === 27 && $scope.isOpen) {
                evt.preventDefault();
                evt.stopPropagation();
                $scope.$apply(function() {
                    $scope.isOpen = false;
                });
                $element[0].focus();
            } else if (evt.which === 40 && !$scope.isOpen) {
                evt.preventDefault();
                evt.stopPropagation();
                $scope.$apply(function() {
                    $scope.isOpen = true;
                });
            }
        }

        function positionPopup() {
            if ($scope.isOpen) {
                var dpElement = $popup[0].querySelector('.datepicker-popup');
                var placement = $attrs.popupPlacement ?
                    $attrs.popupPlacement : datepickerPopupConfig.placement;
                var position = $position.positionElements($element, dpElement,
                    placement, appendToBody);

                angular.element(dpElement).css({
                    top: position.top + 'px',
                    left: position.left + 'px',
                    visibility: 'visible'
                });
            }
        }

        $scope.$on('bb:datepicker.mode', function() {
            $timeout(positionPopup, 0, false);
        });
    }

    function bbDatepickerPopup() {
        return {
            require: ['ngModel', 'bbDatepickerPopup'],
            controller: 'bbDatepickerPopupController',
            scope: {
                datepickerOptions: '=?',
                isOpen: '=?',
                currentText: '@',
                clearText: '@',
                closeText: '@',
                dateDisabled: '&',
                customClass: '&'
            },
            link: function(scope, element, attrs, ctrls) {
                var ngModel = ctrls[0],
                    ctrl = ctrls[1];

                ctrl.init(ngModel);
            }
        };
    }

    function bbDatepickerPopupWrap() {
        return {
            replace: true,
            transclude: true,
            templateUrl: function(element, attrs) {
                return attrs.templateUrl || 'bb/datepicker.popup.html';
            }
        };
    }
}());
