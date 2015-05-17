var width = "100%",
    height = "900";

var path = d3.geo.path()
    .projection(null);

var zoom = d3.behavior.zoom()
    .translate([0, 0])
    .scale(1)
    .scaleExtent([1, 8])
    .on("zoom", zoomed);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var features = svg.append("g");

svg.append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height)
    .call(zoom);

d3.json("us.json", function(error, us) {
    if (error) return console.error(error);

    features.append("path")
        .datum(topojson.feature(us, us.objects.states))
        .attr("class", "state")
        .attr("d", path);

    features.append("path")
        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
        .attr("class", "state-border")
        .attr("d", path)
        .style("stroke-width", "1.5px");

    features.append("path")
        .datum(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b && !(a.id / 1000 ^ b.id / 1000); }))
        .attr("class", "county-border")
        .attr("d", path)
        .style("stroke-width", ".5px");
});

function zoomed() {
    features.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    features.select(".state-border").style("stroke-width", 1.5 / d3.event.scale + "px");
    features.select(".county-border").style("stroke-width", .5 / d3.event.scale + "px");
}

d3.select(self.frameElement).style("height", height + "px");