// Step 1: Define the dataset
const data = [10, 20, 30, 40, 50];

// Select the SVG canvas
const width = 300, height = 300;
const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

// Step 2: Define pie and arc generators
const pie = d3.pie();
const outerRadius = width / 2;
const arc = d3.arc()
    .outerRadius(outerRadius)
    .innerRadius(0);  // Set to a value > 0 for donut chart

// Generate pie angles from data
const pieData = pie(data);

// Step 3: Create arcs and position them
const arcs = svg.selectAll("arc")
    .data(pieData)
    .enter()
    .append("g")
    .attr("class", "arc");

// Draw the paths for the arcs
arcs.append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => d3.schemeCategory10[i]);

// Step 5: Add text labels
arcs.append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .text(d => d.data);
