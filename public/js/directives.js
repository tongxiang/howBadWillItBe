'use strict';

angular.module('mean.directives', [])
.directive('donutChart', function(){
  function link(scope, el, attr){ //scope is the 'model' that the directive is in, second is the element that the directive is one, the third is an object hash with all the element's properties (or attributes)
    console.log('link function returning');
    var color = d3.scale.category10();
    var data = [10, 20, 30];
    var width = 300;
    var height = 300;
    var min = Math.min(width, height);
    var svg = d3.select(el[0]).append('svg'); //we use el[0] instead of just el because element is a jQuery-lite wrapped selection and not an ordinary DOM object. 
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
    scope.$watch('data', function(data){
      console.log('an element within "data" changed!');
      console.log(data);
    }, true);
  }
  return {
    link: link,
    restrict: 'E'
  };
});

//this directive is messing up everything 
angular.module('mean.directives', [])
.directive('albersUsa', function(){
  function link(scope, element, attribute){
    console.log('albersUsa link function returning');
    console.log('this is the topojson object', topojson)

    var width = 960,
        height = 500;

    var projection = d3.geo.albersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);

    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select(element[0]).append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.json("/lib/us.json", function(error, us) {//changed this to point to a us.json file in the public directory
      svg.insert("path", ".graticule")
          .datum(topojson.feature(us, us.objects.land)) //topojson not defined at this point, for some reason. why? this.topojson is returned by the topojson minified script. why is it not returned? 
          .attr("class", "land")
          .attr("d", path);

      svg.insert("path", ".graticule")
          .datum(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b && !(a.id / 1000 ^ b.id / 1000); }))
          .attr("class", "county-boundary")
          .attr("d", path);

      svg.insert("path", ".graticule")
          .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
          .attr("class", "state-boundary")
          .attr("d", path);
    });

    d3.select(self.frameElement).style("height", height + "px");
  }
  return {
    link: link, 
    restrict: 'EA'
  }

})