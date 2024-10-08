// JavaScript source code
// Set SVG dimensions
var w = 500;
var h = 300;
var padding = 1;

// Initial dataset, max value, and sort state
var dataset = [];
var maxValue = 50;
var sortAscending = true; // Sorting direction

// Set up x and y scales
var xScale = d3.scaleBand()
    .range([0, w])
    .paddingInner(0.05);

var yScale = d3.scaleLinear()
    .range([0, h]);

// Append SVG container
var svg = d3.select("#chart");

// Generate a random data point and add to dataset
function generateDataset() {
    var newNumber = Math.floor(Math.random() * maxValue);
    dataset.push(newNumber);
}

// Update the chart with new or removed data
function updateChart() {
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset)]);

    var bars = svg.selectAll("rect")
        .data(dataset);

    // Exit phase - Remove any bars that no longer exist
    bars.exit()
        .transition()
        .attr("x", w)
        .remove();

    // Enter phase - Add new bars for new data
    bars.enter()
        .append("rect")
        .attr("x", w)
        .attr("y", function (d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return yScale(d);
        })
        .attr("fill", function (d) {
            return "rgb(0, 0, " + (d * 10) + ")";
        })
        .merge(bars)
        .transition()
        .duration(500)
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return yScale(d);
        });

    // Labels for the bars
    var labels = svg.selectAll("text")
        .data(dataset);

    // Exit phase - Remove old labels
    labels.exit().remove();

    // Enter phase - Add new labels
    labels.enter()
        .append("text")
        .merge(labels)
        .transition()
        .duration(1000)
        .text(function (d) {
            return d;
        })
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

// Add data to the dataset and update the chart
function addData() {
    generateDataset();
    updateChart();
}

// Remove data from the dataset and update the chart
function removeData() {
    dataset.pop();
    updateChart();
}

// Sort data when the sort button is clicked
function sortData() {
    dataset.sort(sortAscending ? d3.ascending : d3.descending); // Sort in the selected order

    // Update the x scale with the new order
    xScale.domain(d3.range(dataset.length));

    // Update the chart with the new sorted order
    updateChart();

    // Toggle sorting direction for the next click
    sortAscending = !sortAscending;
}

// Event listener for sort button
d3.select("#sort").on("click", sortData);

// Initial chart render
updateChart();
