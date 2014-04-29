'use strict';
// angular.module('mean.directives', ['d3'])
// .directive('d3Bars', ['$window', '$timeout', 'd3Service', 
//   function($window, $timeout, d3Service) {    
//     return {
//       restrict: 'A',

//       scope: {
//         data: '=',
//         label: '@',
//         onClick: '&'
//       },

//       link: function(scope, ele, attrs) {
//         console.log('link function running!')
//         var d3Use = function(d3) {
//             console.log('d3Use function running')
//           var renderTimeout;
//           var margin = parseInt(attrs.margin) || 20,
//               barHeight = parseInt(attrs.barHeight) || 20,
//               barPadding = parseInt(attrs.barPadding) || 5;
 
//           var svg = d3.select(ele[0])
//             .append('svg')
//             .style('width', '100%');
 
//           $window.onresize = function() {
//             scope.$apply();
//           };

//           scope.data = [
//               {name: "Greg", score: 98},
//               {name: "Ari", score: 96},
//               {name: 'Q', score: 75},
//               {name: "Loser", score: 48}
//             ];
 
//           scope.$watch(function() {
//             return angular.element($window)[0].innerWidth;
//           }, function() {
//             scope.render(scope.data);
//           });
 
//           scope.$watch('data', function(newData) {
//             scope.render(newData);
//           }, true);
 
//           scope.render = function(data) {
//             svg.selectAll('*').remove();
 
//             if (!data) return;
//             if (renderTimeout) clearTimeout(renderTimeout);
 
//             renderTimeout = $timeout(function() {
//               var width = d3.select(ele[0])[0][0].offsetWidth - margin,
//                   height = scope.data.length * (barHeight + barPadding),
//                   color = d3.scale.category20(),
//                   xScale = d3.scale.linear()
//                     .domain([0, d3.max(data, function(d) {
//                       return d.score;
//                     })])
//                     .range([0, width]);
 
//               svg.attr('height', height);
 
//               svg.selectAll('rect')
//                 .data(data)
//                 .enter()
//                   .append('rect')
//                   .on('click', function(d,i) {
//                     return scope.onClick({item: d});
//                   })
//                   .attr('height', barHeight)
//                   .attr('width', 140)
//                   .attr('x', Math.round(margin/2))
//                   .attr('y', function(d,i) {
//                     return i * (barHeight + barPadding);
//                   })
//                   .attr('fill', function(d) {
//                     return color(d.score);
//                   })
//                   .transition()
//                     .duration(1000)
//                     .attr('width', function(d) {
//                       return xScale(d.score);
//                     });
//               svg.selectAll('text')
//                 .data(data)
//                 .enter()
//                   .append('text')
//                   .attr('fill', '#fff')
//                   .attr('y', function(d,i) {
//                     return i * (barHeight + barPadding) + 15;
//                   })
//                   .attr('x', 15)
//                   .text(function(d) {
//                     return d.name + " (scored: " + d.score + ")";
//                   });
//             }, 200);
//           };
//         };
//         d3Use(d3);
//       }}
// }])

angular.module('donutChart', [])
.directive('donutChart', function(){
  function link(scope, el, attr){
    console.log('link function returning');
    var color = d3.scale.category10();
    var data = [10, 20, 30];
    var width = 300;
    var height = 300;
    var min = Math.min(width, height);
    var svg = d3.select(el[0]).append('svg');
    var pie = d3.layout.pie().sort(null);
    var arc = d3.svg.arc()
      .outerRadius(min / 2 * 0.9)
      .innerRadius(min / 2 * 0.5);

    svg.attr({width: width, height: height});
    var g = svg.append('g')
      // center the donut chart
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    
    // add the <path>s for each arc slice
    g.selectAll('path').data(pie(data))
      .enter().append('path')
        .style('stroke', 'white')
        .attr('d', arc)
        .attr('fill', function(d, i){ return color(i) });
  }
  return {
    link: link,
    restrict: 'E'
  };
});
