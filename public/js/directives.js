'use strict';

angular.module('mean.directives', ['d3'])
    .directive('d3Bars', ['d3Service', function(d3Service) {
        return {
            restrict: 'EA',
            scope: {},
            link: function(scope, element, attrs) {
                d3Service.d3().then(function(d3) {
                // d3 is the raw d3 object
                });
            }}
    }]);