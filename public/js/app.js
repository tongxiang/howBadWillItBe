'use strict';

angular.module('mean', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'mean.system', 'mean.articles', 'mean.directives']); //removed d3 module from here 

angular.module('mean.system', []);

angular.module('mean.articles', []); //we're defining this here. 