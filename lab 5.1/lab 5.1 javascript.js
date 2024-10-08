// JavaScript source code
// SVG dimensions
var w = 500;
var h = 300;
var padding = 1;

// Initialize dataset variables
var numValues = 10;  // Number of bars
var maxValue = 50;   // Max value for the bars
var dataset = [];    // Dataset array

// Create xScale and yScale
var xScale = d3.scaleBand()
    .range([0, w])
    .paddingInner(0.05);

var yScale = d3.scaleLinear()
    .range([0, h]);

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

// Function to update the bar chart
function updateChart() {
    // Update the scales with the new dataset
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset)]);

    // Select bars, bind new data
    var bars = svg.selectAll("rect")
        .data(dataset);

    // Remove old bars (exit)
    bars.exit().remove();

    // Append new bars (enter) and update existing ones
    bars.enter()
        .append("rect")
        .merge(bars)
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return h - yScale(d);  // Position bars from the bottom
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return yScale(d);  // Bar height proportional to value
        })
        .attr("fill", function (d) {
            return "rgb(0, 0, " + (d * 10) + ")";
        });

    // Select text, bind new data
    var labels = svg.selectAll("text")
        .data(dataset);

    // Remove old labels (exit)
    labels.exit().remove();

    // Append new labels (enter) and update existing ones
    labels.enter()
        .append("text")
        .merge(labels)
        .text(function (d) {
            return d;
        })
        .attr("x", function (d, i) {
            return xScale(i) + xScale.bandwidth() / 2;  // Center text in the bar
        })
        .attr("y", function (d) {
            return h - yScale(d) + 15;  // Position text inside the bar
        })
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("fill", "white");
}

// Function to handle the button click
function showChart() {
    generateDataset();  // Generate new random dataset
    updateChart();      // Update the chart with the new dataset
}

// Initial call to display the chart when the page loads
showChart();
