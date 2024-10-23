function init() {
    // Width and height of the SVG
    var w = 500;
    var h = 300;

    // Define projection
    var projection = d3.geoMercator()
        .center([145, -36.5]) // Center of the map [longitude, latitude]
        .translate([w / 2, h / 2]) // Translate to the center of the SVG container
        .scale(3000); // Scale for zoom

    // Create a path generator
    var path = d3.geoPath()
        .projection(projection); // Apply the projection

    // Create the SVG container and set its dimensions
    var svg = d3.select("#Map")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("fill", "steelblue");

    // Load the GeoJSON data (LGA boundaries)
    d3.json("LGA_VIC.json").then(function (json) {
        // Bind the data to the SVG and create one path per feature
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path);
    });
}

window.onload = init;
