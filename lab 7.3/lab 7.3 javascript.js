// Dataset
var dataset = [
    { apples: 5, oranges: 10, grapes: 22 },
    { apples: 4, oranges: 12, grapes: 28 },
    { apples: 2, oranges: 19, grapes: 32 },
    { apples: 7, oranges: 23, grapes: 35 },
    { apples: 23, oranges: 17, grapes: 43 }
];

// Create stack layout
var stack = d3.stack()
    .keys(['apples', 'oranges', 'grapes']);

var series = stack(dataset);

// Define chart dimensions
var width = 300;
var height = 300;
var margin = { top: 20, right: 20, bottom: 30, left: 40 };

// Append SVG to the chart container
var svg = d3.select(".chart-container").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Set up x and y scales
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))  // Create an x-scale for the number of data points
    .range([0, width - margin.left - margin.right])
    .padding(0.1);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d.apples + d.oranges + d.grapes)])  // Maximum sum for stacking
    .range([height - margin.top - margin.bottom, 0]);

// Define a color scale for the different categories
var color = d3.scaleOrdinal(d3.schemeCategory10);

// Create the stacked bars
svg.selectAll("g")
    .data(series)
    .enter().append("g")
    .attr("fill", function(d, i) { return color(i); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("x", function(d, i) { return xScale(i); })
    .attr("y", function(d) { return yScale(d[1]); })
    .attr("height", function(d) { return yScale(d[0]) - yScale(d[1]); })
    .attr("width", xScale.bandwidth());
