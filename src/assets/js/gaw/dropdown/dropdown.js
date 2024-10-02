/*! gaw-dropdown - v1.1.31 - 2019-05-14 */

(function () {
    'use strict';

    /**
     * Dropdown
     */

    angular
        .module('bb.dropdown', ['bb.position'])
        .constant('bbDropdownConfig', {
            appendToOpenClass: 'bb-dropdown-open',
            openClass: 'is-open'
        })
        .service('bbDropdownService', dropdownService)
        .controller('bbDropdownController', dropdownController)
        .directive('bbDropdown', dropdown)
        .directive('bbDropdownMenu', dropdownMenu)
        .directive('bbDropdownToggle', dropdownToggle);

    dropdownService.$inject = ['$document', '$rootScope'];

    function dropdownService($document, $rootScope) {
        /* jshint validthis: true */

        var openScope = null;

        var closeDropdown = function (evt) {
            // This method may still be called during the same mouse event that
            // unbound this event handler. So check openScope before proceeding.
            if (!openScope) {
                return;
            }

            if (evt && openScope.getAutoClose() === 'disabled') {
                return;
            }

            if (evt && evt.which === 3) {
                return;
            }

            var toggleElement = openScope.getToggleElement();

            if (evt && toggleElement && toggleElement[0].contains(evt.target)) {
                return;
            }

            var dropdownElement = openScope.getDropdownElement();
            if (evt && openScope.getAutoClose() === 'outsideClick' &&
                dropdownElement && dropdownElement[0].contains(evt.target)) {
                return;
            }

            openScope.isOpen = false;

            if (!$rootScope.$$phase) {
                openScope.$apply();
            }
        };

        var keybindFilter = function (evt) {
            if (evt.which === 27) {
                openScope.focusToggleElement();
                closeDropdown();
            } else if ([9, 38, 40].indexOf(evt.which) !== -1 && openScope.isOpen) { //Tab, ArrowUp, ArrowDown
                evt.preventDefault();
                evt.stopPropagation();
                openScope.focusDropdownEntry(evt, evt.which);
            }
        };

        this.open = function (dropdownScope) {
            if (!openScope) {
                $document.on('click', closeDropdown);
                $document.on('keydown', keybindFilter);
            }

            if (openScope && openScope !== dropdownScope) {
                openScope.isOpen = false;
            }

            openScope = dropdownScope;
        };

        this.close = function (dropdownScope) {
            if (openScope === dropdownScope) {
                openScope = null;
                $document.off('click', closeDropdown);
                $document.off('keydown', keybindFilter);
            }
        };
    }

    dropdownController.$inject = ['$scope', '$element', '$attrs', '$parse',
        'bbDropdownConfig', 'bbDropdownService', '$animate', '$bbPosition',
        '$document', '$compile', '$templateRequest', '$timeout'];

    /* jshint maxparams: false */
    function dropdownController($scope, $element, $attrs, $parse, dropdownConfig,
        dropdownService, $animate, $position, $document, $compile, $templateRequest, $timeout) {
        /* jshint validthis: true */

        var self = this,
            scope = $scope.$new(), // Create a child scope so we are not polluting original one
            templateScope,
            appendToOpenClass = dropdownConfig.appendToOpenClass,
            openClass = dropdownConfig.openClass,
            getIsOpen,
            getDropdownFollowCursor,
            setIsOpen = angular.noop,
            toggleInvoker = $attrs.bbOnToggle ? $parse($attrs.bbOnToggle) : angular.noop,
            appendToBody = false,
            appendTo = null,
            //keynavEnabled = true,
            body = $document.find('body');

        $element.addClass('dropdown');

        this.init = function () {
            /* jshint maxcomplexity: false */

            if ($attrs.bbAlign) {
                $element.addClass('dropdown--' + $attrs.bbAlign);
            }

            if ($attrs.bbPlacement) {
                $element.addClass('dropdown--' + $attrs.bbPlacement);
            }

            if ($attrs.bbNoArrow === 'true') {
                $element.addClass('dropdown--no-arrow');
            }

            if ($attrs.bbIsOpen) {
                getIsOpen = $parse($attrs.bbIsOpen);
                setIsOpen = getIsOpen.assign;

                $scope.$watch(getIsOpen, function (value) {
                    scope.isOpen = !!value;
                });
            }

            if ($attrs.bbDropdownFollowCursor) {
                getDropdownFollowCursor = $parse($attrs.bbDropdownFollowCursor);

                $scope.$watch(getDropdownFollowCursor, function (value) {
                    scope.currentEvent = value;
                });
            }

            if (angular.isDefined($attrs.bbAppendTo)) {
                appendTo = angular.element(document.querySelector($attrs.bbAppendTo));
            }

            appendToBody = angular.isDefined($attrs.bbAppendToBody) && $attrs.bbAppendToBody !== 'false';
            //keynavEnabled = angular.isDefined($attrs.bbKeyboardNav) ? keynavEnabled : angular.isDefined($attrs.bbKeyboardNav);

            if (appendToBody && !appendTo) {
                appendTo = body;
            }

            if (appendTo && self.dropdownMenu) {
                appendTo.append(self.dropdownMenu);
                $element.on('$destroy', function handleDestroyEvent() {
                    self.dropdownMenu.remove();
                });
            }
        };

        /* jshint ignore: start */
        this.toggle = function (open) {
            return scope.isOpen = arguments.length ? !!open : !scope.isOpen;
        };
        /* jshint ignore: end */

        // Allow other directives to watch status
        this.isOpen = function () {
            return scope.isOpen;
        };

        // Allow other directives to watch status
        this.isAppendedToBody = function () {
            return appendToBody;
        };

        scope.getToggleElement = function () {
            return self.toggleElement;
        };

        scope.getAutoClose = function () {
            return $attrs.bbAutoClose || 'always'; // or 'outsideClick' or 'disabled'
        };

        scope.getElement = function () {
            return $element;
        };

        // scope.isKeynavEnabled = function () {
        //     return keynavEnabled;
        // };

        scope.focusDropdownEntry = function (evt, keyCode) {
            // var elems = self.dropdownMenu ? // If append to body is used.
            //     angular.element(self.dropdownMenu).find('li') :
            //     $element.find('ul').eq(0).find('a', 'li');

            var elems;
            var liElements = angular.element(self.dropdownMenu).find('li');
            var aElements = angular.element(self.dropdownMenu).find('a');

            if (aElements.length) {
                elems = aElements;
            } else if (liElements.length) {
                elems = liElements;
            } else {
                elems = self.dropdownMenu;
            }

            keyCode = evt.shiftKey && keyCode === 9 ? 38 : keyCode; //Emulates arrow up

            switch (keyCode) {
                case 9: //Tab
                case 40: { //Arrow down
                    self.selectedOption = self.selectedOption = angular.isNumber(self.selectedOption) ? (self.selectedOption + 1) % elems.length : 0
                    break;
                }
                case 38: { //Arrow up
                    self.selectedOption = (self.selectedOption + elems.length - 1) % elems.length
                    break;
                }
            }
            elems[self.selectedOption].focus();
        };

        scope.getDropdownElement = function () {
            return self.dropdownMenu;
        };

        scope.focusToggleElement = function () {

            var liElements = angular.element(self.dropdownMenu).find('li');
            var aElements = angular.element(self.dropdownMenu).find('a');

            if (aElements.length) {
                angular.forEach(aElements, function (e) {
                    angular.element(e).attr('tabindex', '0');
                })
            } else if (liElements.length) {
                angular.forEach(liElements, function (e) {
                    angular.element(e).attr('tabindex', '0');
                })
            }

            if (self.toggleElement) {
                self.toggleElement[0].focus();
            }

        };

        scope.$watch('isOpen', function (isOpen, wasOpen) {
            /* jshint maxcomplexity: 16 */

            if (appendTo && self.dropdownMenu) {
                self.dropdownMenu.removeClass("dropdown__menu--right");
                self.dropdownMenu.removeClass("dropdown__menu--bottom");
                self.dropdownMenu.css({
                    top: "initial",
                    left: "initial",
                    right: "initial",
                    width: "initial",
                    bottom: "initial"
                })

                var pos = $position.positionElements($element, self.dropdownMenu,
                    'bottom-left', true),
                    css,
                    rightalign;

                css = {
                    top: pos.top + 'px',
                    display: isOpen ? 'block' : 'none'
                };

                rightalign = self.dropdownMenu.hasClass('dropdown__menu--right');

                if (!rightalign) {
                    css.left = pos.left + 'px';
                    css.right = 'auto';
                } else {
                    css.left = 'auto';
                    css.right = window.innerWidth - (pos.left + $element.prop('offsetWidth')) + 'px';
                }

                // Need to adjust our positioning to be relative to the appendTo container
                // if it's not the body element
                if (!appendToBody) {
                    var appendOffset = $position.offset(appendTo);

                    css.top = pos.top - appendOffset.top + 'px';

                    if (!rightalign) {
                        css.left = pos.left - appendOffset.left + 'px';
                    } else {
                        css.right = window.innerWidth -
                            (pos.left - appendOffset.left + $element.prop('offsetWidth')) + 'px';
                    }
                }

                if (angular.isDefined($attrs.bbDropdownFollowCursor) && scope.currentEvent) {
                    css.top = (window.scrollY + scope.currentEvent.clientY + 15) + "px";
                    css.left = (scope.currentEvent.clientX - 25) + "px";
                    css.width = "auto";

                    self.dropdownMenu.css(css);

                    // BB stands for Bounding Box
                    var dropdownBB = self.dropdownMenu[0].getBoundingClientRect();
                    var bodyBB = document.body.getBoundingClientRect();

                    var isDropdownHorizontallyOffscreen = (dropdownBB.width + dropdownBB.left) > bodyBB.width;
                    if (isDropdownHorizontallyOffscreen) {
                        self.dropdownMenu.addClass("dropdown__menu--right");
                        css.left = "auto"
                        css.right = (bodyBB.width - scope.currentEvent.clientX - 25) + "px";
                    }

                    var isDropdownVerticallyOffscreen = (dropdownBB.height + dropdownBB.top) > window.innerHeight;
                    if (isDropdownVerticallyOffscreen) {
                        self.dropdownMenu.addClass("dropdown__menu--bottom");
                        css.top = (window.scrollY + scope.currentEvent.clientY - dropdownBB.height - 25) + "px";
                    }
                }

                self.dropdownMenu.css(css);
            }

            var openContainer = appendTo ? appendTo : $element;
            var dropdownOpenClass = appendTo ? appendToOpenClass : openClass;
            var hasOpenClass = openContainer.hasClass(dropdownOpenClass);

            var open = !isOpen;

            if (hasOpenClass === !isOpen) {
                var toggleClass = isOpen ? 'addClass' : 'removeClass';
                $animate[toggleClass](openContainer, dropdownOpenClass).then(function () {
                    if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
                        toggleInvoker($scope, {
                            open: !!isOpen
                        });
                    }
                });
            }


            if (isOpen) {
                if (self.dropdownMenuTemplateUrl) {
                    $templateRequest(self.dropdownMenuTemplateUrl).then(function (tplContent) {
                        templateScope = scope.$new();

                        $compile(tplContent.trim())(templateScope, function (dropdownElement) {
                            var newEl = dropdownElement;

                            self.dropdownMenu.replaceWith(newEl);
                            self.dropdownMenu = newEl;
                        });
                    });
                }

                scope.focusToggleElement();
                dropdownService.open(scope);
            } else {
                if (self.dropdownMenuTemplateUrl) {
                    if (templateScope) {
                        templateScope.$destroy();
                    }

                    var newEl = angular.element('<ul class="dropdown__menu"></ul>');

                    self.dropdownMenu.replaceWith(newEl);
                    self.dropdownMenu = newEl;
                }

                dropdownService.close(scope);
                self.selectedOption = null;
            }

            if (angular.isFunction(setIsOpen)) {
                setIsOpen($scope, isOpen);
            }
        });

        $scope.$on('$locationChangeSuccess', function () {
            if (scope.getAutoClose() !== 'disabled') {
                scope.isOpen = false;
            }
        });
    }

    dropdown.$inject = ['$timeout'];

    function dropdown($timeout) {
        var directive = {
            controller: 'bbDropdownController',
            link: link
        };

        return directive;

        function link(scope, element, attrs, ctrl) {

            var openingDropdown = false;
            var openDropdown = function (event) {
                event.preventDefault();

                if (!element.hasClass('is-disabled') && !attrs.disabled) {
                    openingDropdown = true;

                    ctrl.toggle(true);
                    $timeout(function() { openingDropdown = false; }, 300);
                }
            };

            var closeDropdown = function (event) {
                event.preventDefault();
                var mouseOutToElementWhosNotAChildrenOfTheDropdown = !element[0].contains(event.relatedTarget);
                var isAppendToBodyLeavingToDropdownMenu = ctrl.isAppendedToBody() && event.relatedTarget.hasAttribute('bb-dropdown-menu');

                if (!element.hasClass('is-disabled')
                 && !attrs.disabled
                 && (mouseOutToElementWhosNotAChildrenOfTheDropdown || !openingDropdown)
                 && !isAppendToBodyLeavingToDropdownMenu) {
                    ctrl.toggle(false);
                }
            };

            if (attrs.bbOpenOnHover === 'true') {
                element.bind('mouseover', openDropdown);
                element.bind('mouseout', closeDropdown);
            }

            ctrl.init();
        }
    }

    function dropdownMenu() {
        var directive = {
            link: link,
            require: '?^bbDropdown',
            restrict: 'A',
        };

        return directive;

        function link(scope, element, attrs, ctrl) {
            if (!ctrl || angular.isDefined(attrs.bbNested)) {
                return;
            }

            if (ctrl.btnHasMargin) {
                element.css('margin-top', 0);
            }

            element.addClass('dropdown__menu');

            var tplUrl = attrs.bbTemplateUrl;

            if (tplUrl) {
                ctrl.dropdownMenuTemplateUrl = tplUrl;
            }

            if (!ctrl.dropdownMenu) {
                ctrl.dropdownMenu = element;
            }
        }
    }

    dropdownToggle.$inject = ['$window', '$timeout'];

    function dropdownToggle($window, $timeout) {
        var directive = {
            link: link,
            require: '?^bbDropdown',
        };

        return directive;

        function link(scope, element, attrs, ctrl) {
            if (!ctrl) {
                return;
            }

            var marginBottom = 0;

            // Check if has margin bottom
            var computedStyle = $window.getComputedStyle(element[0], null);
            if (computedStyle) {
                marginBottom = computedStyle.getPropertyValue('margin-bottom').replace('px', '');
            }

            if (marginBottom > 0) {
                ctrl.btnHasMargin = true;
            }

            //
            element.addClass('dropdown__toggle');

            ctrl.toggleElement = element;

            var toggleDropdown = function (event) {
                event.preventDefault();

                if (!element.hasClass('is-disabled') && !attrs.disabled) {
                    $timeout(function() {
                        var isTouchDevice = 'ontouchstart' in document.documentElement

                        if (!isTouchDevice) {
                            ctrl.toggle();
                        }
                    });
                }
            };

            // WAI-ARIA
            element.attr({
                'aria-haspopup': true,
                'aria-expanded': false
            });

            scope.$watch(ctrl.isOpen, function (isOpen) {
                element.attr('aria-expanded', !!isOpen);
            });

            if (!element[0].parentElement.hasAttribute('bb-open-on-hover') ||
                element[0].parentElement.attributes['bb-open-on-hover'].value !== 'true') {

                element.bind('click', toggleDropdown);
                scope.$on('$destroy', function () {
                    element.unbind('click', toggleDropdown);
                });
            }
        }
    }
}());
