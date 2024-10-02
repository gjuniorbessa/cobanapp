/*! gaw-steps - v1.1.19 - 2019-12-06 */

(function() {
'use strict';

angular.module('bb.steps.tmpl', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('bb/steps-vertical.html',
        '<div class="steps">\n' +
        '    <ul class="steps__progress-line">\n' +
        '        <li \n' +
        'role="tab" ng-repeat="step in steps" \n' +
        'tabindex="{{$index == currentStep ? 0 : -1}}" \n' +
        'ng-class="{\'is-active\': $index == currentStep, \'title\': step.title, \'subtitle\': step.desc }">\n' +
        '            <div class="steps__progress-line__step" \n' +
        'ng-click="gotoStep($index)">\n' +
        '                <figure>{{$index + 1}}</figure>\n' +
        '                <div class="steps__progress-line__chip">\n' +
        '                    \n' +
        '<span class="steps__progress-line__title" ng-if="step.title">{{step.title}}\n' +
        '</span>\n' +
        '                    <span class="steps__progress-line__subtitle" \n' +
        'ng-if="!step.title || (step.desc && step.title)">{{step.desc}}</span>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div \n' +
        'class="steps__progress-line__content">\n' +
        '                <div \n' +
        'class="steps__vertical-line__dots" ng-if="hasSubItens">\n' +
        '                    \n' +
        '<span \n' +
        'aria-label="{{$index === currentSubStep && !!step.subSteps && steps[currentStep] === step ? \'subpasso \' + (currentSubStep+1)+ \' de \' + step.subSteps.length : \'\'}}" \n' +
        'ng-repeat="sub in step.subSteps" \n' +
        'ng-class="{\'is-active\': $index === currentSubStep && !!step.subSteps && steps[currentStep] === step}">\n' +
        '                    </span>\n' +
        '                </div>\n' +
        '                <div \n' +
        'class="steps__vertical--include-area">\n' +
        '                    <ng-include \n' +
        'ng-if="$index == currentStep" src="getVerticalStepTemplateUrl($index)">\n' +
        '</ng-include>\n' +
        '                    <ng-include ng-if="$index == currentStep" \n' +
        'src="getVerticalSubStepTemplateUrl($index,currentSubStep)"></ng-include>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </li>\n' +
        '    </ul>\n' +
        '\n' +
        '\n' +
        '    <div \n' +
        'class="btn-group jc-c steps__buttons">\n' +
        '\n' +
        '        <button \n' +
        'ng-if="showPreviousStep()" class="btn btn--primary" name="previous" \n' +
        'ng-click="gotoPreviousStep(steps[currentStep].previousValidation);">\n' +
        '\n' +
        '            <i ng-if="!validatingPrev" class="mi">keyboard_arrow_left</i>\n' +
        '            <i ng-if="!!validatingPrev" class="mi">refresh</i>\n' +
        '            <span>{{steps[currentStep].previousLabel || "Anterior"}}</span>\n' +
        '        </button>\n' +
        '\n' +
        '        <button ng-if="showPreviousSubStep()" \n' +
        'class="btn btn--primary" name="previous" \n' +
        'ng-click="gotoPreviousSubStep(steps[currentStep].subSteps[currentSubStep].previousValidation);">\n' +
        '\n' +
        '            <i ng-if="!validatingPrev" class="mi">keyboard_arrow_left</i>\n' +
        '            <i ng-if="!!validatingPrev" class="mi">refresh</i>\n' +
        '            <span>\n' +
        '{{steps[currentStep].subSteps[currentSubStep].previousLabel || "Anterior"}}\n' +
        '</span>\n' +
        '        </button>\n' +
        '\n' +
        '        <button ng-if="showNextStep()" \n' +
        'class="btn btn--primary" name="next" \n' +
        'ng-click="gotoNextStep(steps[currentStep].nextValidation);">\n' +
        '\n' +
        '            \n' +
        '<span>{{steps[currentStep].nextLabel || "Próximo"}}\n' +
        '\n' +
        '            </span>\n' +
        '            <i ng-if="!validatingNext" class="mi">keyboard_arrow_right</i>\n' +
        '            <i ng-if="!!validatingNext" class="mi">refresh</i>\n' +
        '        </button>\n' +
        '\n' +
        '        <button ng-if="showNextSubStep()" \n' +
        'class="btn btn--primary" name="next" \n' +
        'ng-click="gotoNextSubStep(steps[currentStep].subSteps[currentSubStep].nextValidation);">\n' +
        '\n' +
        '            <span>\n' +
        '{{steps[currentStep].subSteps[currentSubStep].nextLabel || "Próximo"}}</span>\n' +
        '            <i ng-if="!validatingNext" class="mi">keyboard_arrow_right</i>\n' +
        '            <i ng-if="!!validatingNext" class="mi">refresh</i>\n' +
        '\n' +
        '        </button>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('bb/steps.html',
        '<div class="steps">\n' +
        '    <ul class="steps__progress-line">\n' +
        '        <li \n' +
        'role="tab" ng-repeat="step in steps" \n' +
        'tabindex="{{$index == currentStep ? 0 : -1}}" \n' +
        'ng-class="{\'is-active\': $index == currentStep, \'title\': step.title, \'subtitle\': step.desc }">\n' +
        '            <div class="steps__progress-line__step">\n' +
        '                <span \n' +
        'class="steps__progress-line__subtitle" ng-if="step.desc && step.title">\n' +
        '{{step.desc}}</span>\n' +
        '                <figure \n' +
        'class="type-info--{{ step.type || \'default\' }}">\n' +
        '                    <span \n' +
        'ng-if="!step.icon">{{$index + 1}}</span>\n' +
        '                    <i \n' +
        'ng-if="step.icon" class="mi fz-sm">{{ step.icon }}</i>\n' +
        '                </figure>\n' +
        '\n' +
        '                <span class="steps__progress-line__title" ng-if="step.title">\n' +
        '{{step.title}}</span>\n' +
        '                <span \n' +
        'class="steps__progress-line__subtitle" ng-if="!step.title">{{step.desc}}</span>\n' +
        '            </div>\n' +
        '\n' +
        '            <div class="steps__progress-line__dots" \n' +
        'ng-if="hasSubItens">\n' +
        '                <span \n' +
        'aria-label="{{$index === currentSubStep && !!step.subSteps && steps[currentStep] === step ? \'subpasso \' + (currentSubStep+1)+ \' de \' + step.subSteps.length : \'\'}}" \n' +
        'ng-repeat="sub in step.subSteps" \n' +
        'ng-class="{\'is-active\': $index === currentSubStep && !!step.subSteps && steps[currentStep] === step}">\n' +
        '                </span>\n' +
        '            </div>\n' +
        '        </li>\n' +
        '    </ul>\n' +
        '\n' +
        '    \n' +
        '<ng-include src="getStepTemplateUrl()"></ng-include>\n' +
        '    <ng-include \n' +
        'src="getSubStepTemplateUrl()"></ng-include>\n' +
        '\n' +
        '    <br>\n' +
        '    <br>\n' +
        '\n' +
        '    <div \n' +
        'class="btn-group jc-fe steps__buttons">\n' +
        '\n' +
        '        <button \n' +
        'ng-if="showPreviousStep()" class="btn btn--primary btn--line" name="previous" \n' +
        'ng-click="gotoPreviousStep(steps[currentStep].previousValidation);">\n' +
        '\n' +
        '            <i ng-if="!validatingPrev" class="mi">keyboard_arrow_left</i>\n' +
        '            <i ng-if="!!validatingPrev" class="mi">refresh</i>\n' +
        '            <span>{{steps[currentStep].previousLabel || "Anterior"}}</span>\n' +
        '        </button>\n' +
        '\n' +
        '        <button ng-if="showPreviousSubStep()" \n' +
        'class="btn btn--primary btn--line" name="previous" \n' +
        'ng-click="gotoPreviousSubStep(steps[currentStep].subSteps[currentSubStep].previousValidation);">\n' +
        '\n' +
        '            <i ng-if="!validatingPrev" class="mi">keyboard_arrow_left</i>\n' +
        '            <i ng-if="!!validatingPrev" class="mi">refresh</i>\n' +
        '            <span>\n' +
        '{{steps[currentStep].subSteps[currentSubStep].previousLabel || "Anterior"}}\n' +
        '</span>\n' +
        '        </button>\n' +
        '\n' +
        '        <button ng-if="showNextStep()" \n' +
        'class="btn btn--primary btn--line" name="next" \n' +
        'ng-click="gotoNextStep(steps[currentStep].nextValidation);">\n' +
        '\n' +
        '            \n' +
        '<span>{{steps[currentStep].nextLabel || "Próximo"}}\n' +
        '\n' +
        '            </span>\n' +
        '            <i ng-if="!validatingNext" class="mi">keyboard_arrow_right</i>\n' +
        '            <i ng-if="!!validatingNext" class="mi">refresh</i>\n' +
        '        </button>\n' +
        '\n' +
        '        <button ng-if="showNextSubStep()" \n' +
        'class="btn btn--primary btn--line" name="next" \n' +
        'ng-click="gotoNextSubStep(steps[currentStep].subSteps[currentSubStep].nextValidation);">\n' +
        '\n' +
        '            <span>\n' +
        '{{steps[currentStep].subSteps[currentSubStep].nextLabel || "Próximo"}}</span>\n' +
        '            <i ng-if="!validatingNext" class="mi">keyboard_arrow_right</i>\n' +
        '            <i ng-if="!!validatingNext" class="mi">refresh</i>\n' +
        '        </button>\n' +
        '\n' +
        '        <button ng-if="showSave()" \n' +
        'class="btn btn--primary" name="next" \n' +
        'ng-click="finalValidation((steps[currentStep].subSteps ? steps[currentStep].subSteps[currentSubStep] : steps[currentStep]).finalValidation);">\n' +
        '            <span>\n' +
        '{{(steps[currentStep].subSteps ? steps[currentStep].subSteps[currentSubStep].saveLabel : steps[currentStep].saveLabel) || "Salvar"}}\n' +
        '</span>\n' +
        '            <i ng-if="!validatingSave" \n' +
        'class="mi">{{saveIcon || \'done\'}}</i>\n' +
        '            <i \n' +
        'ng-if="!!validatingSave" class="mi">refresh</i>\n' +
        '        </button>\n' +
        '\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
}]);
}());

(function () {
    'use strict';

    /**
     * Steps
     */

    angular
        .module('bb.steps', ['bb.steps.tmpl'])
        .directive('bbSteps', steps);

    var TYPES_HAS_SUB_ITENS = {
        process: true,
        vertical: true,
        inline: false,
        only: true
    };

    function steps() {
        var directive = {
            link: link,
            replace: true,
            restrict: 'E',
            scope: {
                type: '@bbType',
                steps: '=bbSteps',
                selectedStep: '=bbSelectedStep',
                selectedSubStep: '=bbSelectedSubStep',
                previousLastSubStep: '=bbPreviousLastSubStep',
                scope: '=bbStepsScope',
                saveIcon: '@bbSaveIcon',
                size: '@bbSize',
            },
            templateUrl: function(elem, attr) {
                var templateFile = 'bb/steps.html';
                if (attr.bbType === 'vertical') {
                    templateFile = 'bb/steps-'+attr.bbType+'.html';
                }
                return templateFile;
            },
            transclude: true,
            controller: controller
        };

        controller.$inject = ['$scope', '$timeout', '$q', '$element'];

        return directive;

        function link(scope, element) {
            scope.currentStep = scope.selectedStep ? (scope.selectedStep - 1) : 0;
            scope.currentSubStep = scope.selectedSubStep ? (scope.selectedSubStep - 1) : 0;

            scope.updateStepsData()

            correctStep()
            correctSubstep()

            function correctStep() {
                if(!scope.steps[scope.currentStep]) {
                    if(scope.currentStep >= scope.steps.length) {
                        scope.currentStep = scope.steps.length - 1;
                    } else {
                        scope.currentStep = 0;
                    }
                }
            }

            function correctSubstep() {
                if (scope.steps[scope.currentStep].subSteps &&
                    !scope.steps[scope.currentStep].subSteps[scope.currentSubStep]) {
                        if(scope.currentSubStep >= scope.steps[scope.currentStep].subSteps.length) {
                            scope.currentSubStep = scope.steps[scope.currentStep].subSteps.length - 1
                        } else {
                            scope.currentSubStep = 0;
                        }
                }
            }

            // select programatically steps & substep
            //
            scope.$watch('selectedStep', function (value) { if (value) scope.currentStep = value; correctStep() });
            scope.$watch('selectedSubStep', function (value) { if (value) scope.currentSubStep = value; correctSubstep(); });

            if (!!scope.type) {
                angular.element(element[0].firstElementChild).addClass('steps__progress-line--' + scope.type);
                if (TYPES_HAS_SUB_ITENS[scope.type]) {
                    scope.hasSubItens = true;
                }
            } else {
                scope.hasSubItens = false;
            }

            if (!!scope.size) {
                angular.element(element[0].firstElementChild).addClass('steps__progress-line--' + scope.size);
            }

        }

        function controller($scope, $timeout, $q, $element) {

            $scope.currentStep = $scope.selectedStep || 0;
            $scope.currentSubStep = 0;
            $scope.getStepTemplateUrl = getStepTemplateUrl;
            $scope.getVerticalStepTemplateUrl = getVerticalStepTemplateUrl;
            $scope.getSubStepTemplateUrl = getSubStepTemplateUrl;
            $scope.getVerticalSubStepTemplateUrl = getVerticalSubStepTemplateUrl;

            $scope.gotoPreviousStep = gotoPreviousStep;
            $scope.gotoNextStep = gotoNextStep;
            $scope.gotoStep = gotoStep;
            $scope.gotoPreviousSubStep = gotoPreviousSubStep;
            $scope.gotoNextSubStep = gotoNextSubStep;
            $scope.finalValidation = finalValidation;

            $scope.showPreviousStep = showPreviousStep;
            $scope.showNextStep = showNextStep;
            $scope.showPreviousSubStep = showPreviousSubStep;
            $scope.showNextSubStep = showNextSubStep;
            $scope.showSave = showSave;

            var keyBoardOnly = false;

            $element.on('click', function(event){
                if(event.clientX){
                    keyBoardOnly = false;
                }else{
                    keyBoardOnly = true;
                }
            });

            $scope.updateStepsData = function() {
                $scope.scope.stepsData = {
                    currentStep: $scope.currentStep,
                    currentSubStep: $scope.currentSubStep
                };
            }

            function setFocus(){
                if(keyBoardOnly){
                    var ele = $element[0].children[0].children
                    angular.forEach(ele, function(value){
                        if(angular.element(value).hasClass('is-active')){
                            value.focus();
                            return;
                        }
                    })
                }
            }


            // Template fuctions

            function getStepTemplateUrl() {
                if (!$scope.hasSubItens || !$scope.steps[$scope.currentStep].subSteps) {
                    return $scope.steps[$scope.currentStep].templateUrl;
                }
            }
            
            function getVerticalStepTemplateUrl(val) {
                if (!$scope.hasSubItens || !$scope.steps[val].subSteps) {
                    return $scope.steps[val].templateUrl;
                }
                //if (!$scope.hasSubItens || !$scope.steps[val].subSteps) {
                    //return $scope.steps[val].templateUrl;
                //}
            }

            function getSubStepTemplateUrl() {
                if ($scope.hasSubItens && !!$scope.steps[$scope.currentStep].subSteps) {
                    return $scope.steps[$scope.currentStep].subSteps[$scope.currentSubStep].templateUrl;
                }
            }

            function getVerticalSubStepTemplateUrl(val,subVal) {
                if ($scope.hasSubItens && !!$scope.steps[val].subSteps) {
                    return $scope.steps[val].subSteps[subVal].templateUrl;
                }
            }

            // Validation fuctions

            function gotoPreviousStep(isValid) {
                validate(isValid, 'validatingPrev', function () {
                    if ($scope.currentStep > 0) {
                        if (isPreviousLastSubStep($scope.previousLastSubStep) && $scope.hasSubItens) {
                            if (!!$scope.steps[$scope.currentStep - 1].subSteps) {
                                $scope.currentSubStep = $scope.steps[$scope.currentStep - 1].subSteps.length - 1;
                            }
                        }
                        $scope.currentStep -= 1;

                        $scope.updateStepsData();
                        setTimeout(function() { setFocus(); }, 10);
                    }
                });
            }

            function gotoNextStep(isValid) {
                validate(isValid, 'validatingNext', function () {
                    if ($scope.currentStep < $scope.steps.length - 1) {
                        if (!!$scope.steps[$scope.currentStep] && !!$scope.steps[$scope.currentStep].subSteps &&
                            $scope.hasSubItens) {
                            $scope.isSubStep = true;
                        } else {
                            $scope.isSubStep = false;
                        }
                        $scope.currentStep += 1;

                        $scope.updateStepsData();
                        setTimeout(function(){ setFocus(); }, 10);
                    }
                });
            }

            function gotoStep(step) {
                console.log(step);
                // validate(isValid, 'validatingNext', function () {
                    // if ($scope.currentStep < $scope.steps.length - 1) {
                        // if (!!$scope.steps[$scope.currentStep] && !!$scope.steps[$scope.currentStep].subSteps &&
                            // $scope.hasSubItens) {
                            // $scope.isSubStep = true;
                        // } else {
                            // $scope.isSubStep = false;
                        // }
                        $scope.currentStep = step;

                        // $scope.updateStepsData();
                        // setTimeout(function(){ setFocus(); }, 10);
                    // }
                // });
            }

            function gotoPreviousSubStep(isValid) {
                validate(isValid, 'validatingPrev', function () {
                    if (!!$scope.steps[$scope.currentStep].subSteps[$scope.currentSubStep - 1]) {
                        $scope.currentSubStep -= 1;
                    } else {
                        $scope.currentSubStep = 0;
                        $scope.currentStep -= 1;
                        $scope.isSubStep = false;
                    }

                    $scope.updateStepsData();
                    setTimeout(function() { setFocus(); }, 10);
                });
            }

            function gotoNextSubStep(isValid) {
                validate(isValid, 'validatingNext', function () {
                    if (!!$scope.steps[$scope.currentStep].subSteps[$scope.currentSubStep + 1]) {
                        $scope.currentSubStep += 1;
                    } else {
                        $scope.currentSubStep = 0;
                        $scope.currentStep += 1;
                        $scope.isSubStep = false;
                    }

                    $scope.updateStepsData();
                    setTimeout(function() { setFocus(); }, 10);
                });
            }

            function finalValidation(isValid) {
                validate(isValid, 'validatingSave', angular.noop);
            }

            function validate(isValid, validationType, cb) {
                $scope[validationType] = true;
                $q.resolve(angular.isUndefined(isValid) || isValid())
                    .then(function (valid) {
                        $scope[validationType] = false;
                        if (valid) {
                            cb();
                        }
                    });
            }

            function isPreviousLastSubStep(previousLastSubStep) {
                if (angular.isUndefined(previousLastSubStep)) {
                    return true;
                } else {
                    return !!previousLastSubStep;
                }
            }


            // Show functions

            function showPreviousStep() {
                return (!getSubstep() || !$scope.hasSubItens) &&
                    ($scope.currentStep > 0);
            }

            function showNextStep() {
                return (!getSubstep() || !$scope.hasSubItens) &&
                    ($scope.currentStep < ($scope.steps.length - 1));
            }

            function showPreviousSubStep() {
                return !!getSubstep() && $scope.hasSubItens &&
                    ($scope.currentSubStep > 0 || $scope.currentStep > 0);
            }

            function showNextSubStep() {
                return !!getSubstep() && $scope.hasSubItens
                    && !showSave();
            }

            function showSave() {
                return $scope.currentStep === $scope.steps.length - 1 &&
                    ((!getSubstep() || !$scope.hasSubItens) ||
                        (!!getSubstep() && $scope.hasSubItens
                            && $scope.currentSubStep === getSubstep().length - 1))
            }

            function getSubstep() {
                return $scope.steps[$scope.currentStep].subSteps;
            }
        }
    }
}());
