function init() {
    var w = 600;
    var h = 300;
    var padding = 50;  // Increased padding for better spacing

    // Load the CSV data
    d3.csv("Unemployment_78-95.csv", function (d) {
        return {
            date: new Date(+d.year, +d.month - 1),  // Convert to Date object
            number: +d.number  // Convert number to integer
        };
    }).then(function (dataset) {
        // Scales
        var xScale = d3.scaleTime()
            .domain([
                d3.min(dataset, function (d) { return d.date; }),
                d3.max(dataset, function (d) { return d.date; })
            ])
            .range([padding, w - padding]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function (d) { return d.number; })])
            .range([h - padding, padding]);

        // Line generator
        var line = d3.line()
            .x(function (d) { return xScale(d.date); })
            .y(function (d) { return yScale(d.number); });

        // Append the SVG
        var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        // Create the area generator
        var area = d3.area()
            .x(function (d) { return xScale(d.date); })
            .y0(function () { return yScale.range()[0]; })  // Base of the area
            .y1(function (d) { return yScale(d.number); });

        // Append the area below the line
        svg.append("path")
            .datum(dataset)
            .attr("class", "area")
            .attr("d", area)
            .attr("fill", "lightblue");

        // Append the path for the line (on top of the area)
        svg.append("path")
            .datum(dataset)
            .attr("class", "line")
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2);

        // Append the line at y = 500000 (Half a million mark)
        svg.append("line")
            .attr("class", "halfMilMark")
            .attr("x1", padding)
            .attr("y1", yScale(500000))
            .attr("x2", w - padding)
            .attr("y2", yScale(500000))
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "5,5");  // Dashed line

        // Add label for the half million line
        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", padding + 10)
            .attr("y", yScale(500000) - 7)
            .attr("fill", "red")  // Make sure the label is visible
            .text("Half a million unemployed");

        // Add X Axis
        var xAxis = d3.axisBottom(xScale)
            .ticks(10);  // Adjust the number of ticks

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);

        // Add Y Axis
        var yAxis = d3.axisLeft(yScale)
            .ticks(10);  // Adjust the number of ticks

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);
    });
}

window.onload = init;
