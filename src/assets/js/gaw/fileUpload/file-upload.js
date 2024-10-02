/*! gaw-file-upload - v1.1.5 - 2019-05-06 */

(function() {
'use strict';

angular.module('bb.fileUpload.tmpl', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('bb/file-upload.html',
        '<span class="form-field">\n' +
        '    <span class="file-upload--title">{{label}}</span>\n' +
        '    <div class="file-placeholder">\n' +
        '        <div class="row">\n' +
        '            <div \n' +
        'class="col-md-10">\n' +
        '                <span>\n' +
        '{{picFile && picFile.name ? picFile.name : selectLabel}}</span>\n' +
        '            \n' +
        '</div>\n' +
        '            <div \n' +
        'class="col-md-2 btn--remove text-right" style="margin: auto">\n' +
        '                <a href \n' +
        'aria-label="excluir arquivo" class="btn btn--icon" ng-show="picFile" \n' +
        'ng-click="remove()">    \n' +
        '                    <i class="mi" \n' +
        'ng-bind="(urlUpload && picFile.progress != 100) ? \'close\' : \'delete_forever\'">\n' +
        '</i>\n' +
        '                </a>\n' +
        '            </div>\n' +
        '            <div class="col-xs-12" style="margin: auto">\n' +
        '                <span ng-show="picFile.progress >= 0" style="width: 100%">\n' +
        '                    <div class="progress mb-0">\n' +
        '                        <div class="progress--bar progress--bar-primary" role="progressbar" aria-valuenow="{{picFile.progress}}" aria-valuemin="0" aria-valuemax="100" style="width: {{picFile.progress}}%;">\n' +
        '                            <i>{{picFile.progress}}%</i>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        // '                    <div id="infofileupload" role="alert" \n' +
        // 'aria-label="{{picFile.progress + \'% carregado\'}}" aria-live="polite" \n' +
        // 'aria-atomic="true" class="label text-primary" \n' +
        // 'style="width: {{picFile.progress}}%" ng-bind="picFile.progress + \'%\'"></div>\n' +
        '                </span>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    \n' +
        '<span class="help-block text-danger" ng-show="form.$error.required">\n' +
        'Por favor, selecione uma imagem.</span>\n' +
        '    <span class="help-block text-danger" \n' +
        'ng-show="form.$error.maxSize">\n' +
        'Arquivo muito grande {{errorFile.size / 1000000|number:2}}MB: max {{errorFile.$errorParam}}\n' +
        '</span>\n' +
        '    <span class="help-block text-danger" ng-show="form.$error.minSize">\n' +
        'Arquivo muito pequeno {{errorFile.size / 1000000|number:2}}MB: min {{errorFile.$errorParam}}\n' +
        '</span>\n' +
        '    <label for="fileUpload" class="file-upload">\n' +
        '        <a \n' +
        'aria-controls="infofileupload" href class="custom-file-btn btn btn--link" \n' +
        'ng-model="picFile" type="file">\n' +
        '            <i class="mi">attach_file</i>\n' +
        '            {{btnLabel}}\n' +
        '        </a>\n' +
        '    </label>\n' +
        '    <span \n' +
        'class="help-block text-danger" ng-show="errorMsg" ng-bind-html="errorMsg">\n' +
        '{{errorMsg}}</span>\n' +
        '</span>\n' +
        '');
}]);
}());

(function() {
    'use strict';

    angular
        .module('bb.fileUpload', ['ngFileUpload', 'bb.fileUpload.tmpl', 'ngSanitize'])
        .directive('bbFileUpload', fileUpload);

    fileUpload.$inject = ['Upload', '$compile'];

    function fileUpload(Upload, $compile) {
        var directive = {
            link: link,
            replace: true,
            restrict: 'E',
            scope: {
                label: '@?bbTitleLabel',
                selectLabel: '@?bbSelectLabel',
                btnLabel: '@?bbBtnLabel',
                urlUpload: '@?bbUrlUpload',
                remover: '&?bbRemover',
                finish: '&?bbOnFinish',
                file: '=?bbFile'
            },
            templateUrl: 'bb/file-upload.html'
        };
        return directive;

        function link(scope, element, attrs, form) {
            scope.form = scope.$parent.form;

            var directiveElement = element[0];

            var childToInsertAttributes = angular.element(directiveElement.getElementsByClassName('custom-file-btn'));

            [].slice.call(directiveElement.attributes).forEach(function(attr) {
                if (attr.name.match(/^ngf-/)) {
                    childToInsertAttributes.attr(attr.name, attr.value);
                }
            });

            if(isDefined(scope.urlUpload)) {
                childToInsertAttributes.attr('ngf-select','uploadPic(picFile)');
            } else {
                childToInsertAttributes.attr('ngf-select','');
            }

            childToInsertAttributes.attr('ngf-model-invalid', 'errorFile');

            $compile(childToInsertAttributes)(scope);

            scope.uploadPic = function(file) {
                scope.errorMsg = '';
                if(!file) {
                    return;
                }

                file.upload = Upload.upload({
                    url: scope.urlUpload,
                    data: {
                        file: file
                    },
                });

                file.upload.then(function(response) {
                    file.result = response.data;

                    if (scope.finish) {
                        scope.finish({ '$data': file.result });
                    }
                }, function(response) {
                    if (response.status > 0) {
                        scope.errorMsg = response.data;
                        console.log(response);
                        scope.picFile = null;
                    }
                }, function(evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            };

            scope.$watch('picFile', function () {
                scope.file = scope.picFile;
            });

            scope.remove = function() {
                (scope.remover || angular.noop)(scope.picFile);
                scope.picFile = null;
            };
        }

        function isDefined(item) {
            return item !== null && item !== undefined;
        }

    }
}());
