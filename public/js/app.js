'use strict';

angular.module('mean', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'mean.system', 'mean.articles', 'd3']);

angular.module('mean.system', []);

angular.module('mean.articles', []); //we're defining this here. 

angular.module('mean.directives', []); //is this necessary if I've included a directive in the directives.js page? 

angular.module('d3', []);

angular.module('d3', [])
.factory('d3Service', ['$document', '$window', '$q', '$rootScope',
  function($document, $window, $q, $rootScope) {
    var d = $q.defer(),
        d3service = {
          d3: function() { return d.promise; }
        };
  function onScriptLoad() {
    console.log('onScriptLoad function running')
    // Load client in the browser
    $rootScope.$apply(function() { d.resolve($window.d3); });
  }
  var scriptTag = $document[0].createElement('script');
  scriptTag.type = 'text/javascript'; 
  scriptTag.async = true;
  scriptTag.src = 'http://d3js.org/d3.v3.min.js';
  scriptTag.onreadystatechange = function () {
    if (this.readyState == 'complete') onScriptLoad();
  }
  scriptTag.onload = onScriptLoad;
 
  var s = $document[0].getElementsByTagName('body')[0];
  s.appendChild(scriptTag);
 
  return d3service;
}]);