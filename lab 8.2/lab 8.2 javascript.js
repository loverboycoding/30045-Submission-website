function init() {
    //Width and height
    var w = 500;
    var h = 300;

    // Color scale for unemployment
    var color = d3.scaleQuantize()
        .range(['#f2f0f8', '#cbc9e2', '#9e9ac8', '#756bb1', '#54278f']);  // Adjusted color shades for better contrast

    // Create the projection
    var projection = d3.geoMercator()
        .center([145, -36.5])
        .translate([w / 2, h / 2])
        .scale(3000);

    // Create the path generator
    var path = d3.geoPath()
        .projection(projection);

    // Create the SVG container
    var svg = d3.select("#Map")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("fill", "steelblue");

    // Load unemployment data
    d3.csv("VIC_LGA_unemployment.csv", function (d) {
        return {
            LGA: d.LGA,
            unemployed: +d.unemployed
        };
    }).then(function (data) {

        // Load map data
        d3.json("LGA_VIC.json").then(function (json) {

            // Merge CSV data with JSON
            for (var i = 0; i < data.length; i++) {
                var dataState = data[i].LGA;
                var dataValue = parseFloat(data[i].unemployed);

                for (var j = 0; j < json.features.length; j++) {
                    var jsonState = json.features[j].properties.LGA_name;

                    if (dataState == jsonState) {
                        json.features[j].properties.unemployed = dataValue;
                        break;
                    }
                }
            }

            // Set the domain for color scale
            color.domain([d3.min(json.features, function (d) { return d.properties.unemployed; }),
            d3.max(json.features, function (d) { return d.properties.unemployed; })]);

            // Draw the map and color the regions
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", function (d) {
                    var value = d.properties.unemployed;
                    return value ? color(value) : "#ccc";  // Color regions or default grey
                });

        });

        // Load Victorian cities
        d3.csv("VIC_city.csv", function (d) {
            return {
                place: d.place,
                lat: +d.lat,
                lon: +d.lon
            };
        }).then(function (data) {

            // Add circles for cities
            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    return projection([d.lon, d.lat])[0];
                })
                .attr("cy", function (d) {
                    return projection([d.lon, d.lat])[1];
                })
                .attr("r", 2)
                .style("fill", "red");

            // Add city names
            svg.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .attr("x", function (d) {
                    return projection([d.lon, d.lat])[0];
                })
                .attr("y", function (d) {
                    return projection([d.lon, d.lat])[1];
                })
                .style("fill", "black")
                .style("font-size", "10px")
                .attr("dy", "-0.5em")
                .text(function (d) {
                    return d.place;
                });
        });
    });
}

window.onload = init;
