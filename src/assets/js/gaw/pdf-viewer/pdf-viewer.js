/*! gaw-pdf-viewer - v1.0.1 - 2017-08-03 */

(function() {
'use strict';

angular.module('bb.pdfViewer.tmpl', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('bb/pdf-viewer.html',
        '<iframe style="width: 100%; height: {{ height }}" frameborder="0" \n' +
        'scrolling="no" ng-src="{{ finalSrc }}">\n' +
        '</iframe>\n' +
        '');
}]);
}());

(function() {
    'use strict';

    angular
        .module('bb.pdfViewer', ['bb.pdfViewer.tmpl', 'ngSanitize'])
        .directive('bbPdfViewer', pdfViewer);

    pdfViewer.$inject = ['$sce'];
    function pdfViewer($sce) {
        var directive = {
            restrict: 'E',
            link: link,
            templateUrl: 'bb/pdf-viewer.html',
            scope: {
                src: '=bbSrc',
                height: '@bbHeight'
            }
        };

        return directive;

        function link(scope, element, attrs) {
            if (!scope.src) throw 'bb-pdf-viewer: attribute \'bb-src\' is required.';
            if (!scope.height) throw 'bb-pdf-viewer: attribute \'bb-height\' is required.';

            scope.finalSrc = $sce.trustAsResourceUrl(scope.src);
        }
    }
}());
