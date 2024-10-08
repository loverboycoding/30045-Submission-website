// JavaScript source code
// SVG dimensions
var w = 500;
var h = 300;

// Initialize dataset variables
var numValues = 10;  // Number of bars
var maxValue = 50;   // Max value for the bars
var dataset = [];    // Dataset array

// Create xScale and yScale
var xScale = d3.scaleBand().range([0, w]).paddingInner(0.05);
var yScale = d3.scaleLinear().range([0, h]);

// Create SVG container
var svg = d3.select("#chart");

// Function to generate a random dataset
function generateDataset() {
    dataset = [];
    for (var i = 0; i < numValues; i++) {
        var newNumber = Math.floor(Math.random() * maxValue);
        dataset.push(newNumber);
    }
}

// Function to update the bar chart with animations
function updateChart(easeType) {
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset)]);

    var bars = svg.selectAll("rect").data(dataset);

    bars.exit().remove();

    bars.enter()
        .append("rect")
        .merge(bars)
        .transition()
        .duration(2000)
        .ease(d3[easeType])
        .delay(function (d, i) { return i * 100; })
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return yScale(d);
        })
        .attr("fill", function (d) {
            return "rgb(0, 0, " + (d * 10) + ")";
        });

    var labels = svg.selectAll("text").data(dataset);

    labels.exit().remove();

    labels.enter()
        .append("text")
        .merge(labels)
        .transition()
        .duration(2000)
        .ease(d3[easeType])
        .delay(function (d, i) { return i * 100; })
        .text(function (d) { return d; })
        .attr("x", function (d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function (d) {
            return h - yScale(d) + 15;
        })
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("fill", "white");
}

// Function to handle the button click
function showChart(easeType) {
    generateDataset();
    updateChart(easeType);
}

// Initial call to display the chart with a default animation
showChart('easeCircleIn');
