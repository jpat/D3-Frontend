var width = "100%",
    height = "600";

var path = d3.geo.path()
    .projection(null);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var features = svg.append("g");

d3.json("us.json", function(error, us) {
    if (error) return console.error(error);

    features.append("path")
        .datum(topojson.feature(us, us.objects.states))
        .attr("class", "state")
        .style("fill", getColor())
        .attr("d", path);

    features.append("path")
        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
        .attr("class", "state-border")
        .attr("d", path)
        .style("stroke-width", "1.5px");

});


function getColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

d3.select(self.frameElement).style("height", height + "px");