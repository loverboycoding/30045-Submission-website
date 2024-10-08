document.addEventListener("DOMContentLoaded", function () {
    // SVG dimensions
    var w = 500;
    var h = 300;

    // Initialize dataset variables
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
        var newNumber = Math.floor(Math.random() * maxValue);  // Random new data point
        dataset.push(newNumber);
    }

    // Function to update the bar chart with animations
    function updateChart() {
        // Update the scales with the new dataset
        xScale.domain(d3.range(dataset.length));
        yScale.domain([0, d3.max(dataset)]);

        // Select bars, bind new data
        var bars = svg.selectAll("rect")
            .data(dataset);

        // Remove old bars (exit)
        bars.exit()
            .transition()
            .duration(500)
            .attr("x", w)
            .remove();

        // Append new bars (enter) and update existing ones
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
            .duration(200)
            .ease(d3.easeCircleIn)
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

        // Select text, bind new data
        var labels = svg.selectAll("text")
            .data(dataset);

        // Remove old labels (exit)
        labels.exit().remove();

        // Append new labels (enter) and update existing ones
        labels.enter()
            .append("text")
            .merge(labels)
            .transition()
            .duration(200)
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

    // Add data to dataset and update the chart
    window.addData = function () {
        generateDataset();
        updateChart();
    }

    // Remove data from dataset and update the chart
    window.removeData = function () {
        dataset.pop();  // Remove the last element in the dataset
        updateChart();
    }

    // Initial call to display the chart with a default animation
    updateChart();
});
