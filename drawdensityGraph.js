function drawdensity(subfeatures, id) {
    document.querySelector("#figure2").style.backgroundColor = ""

    document.querySelector("#figure1").style.backgroundColor = ""

    // document.querySelector("#del").style.backgroundColor=""


    var paragraph = document.getElementById("density-title");
    paragraph.innerHTML = ""
    document.querySelector("#density-title").style.backgroundColor = "gray"
    var text = document.createTextNode("GRAPH FOR ALL THE SUB FEATURES");
    paragraph.appendChild(text);


    document.querySelector(id).style.backgroundColor = "#bdbdbd"


// set the dimensions and margins of the graph
    const margin = {top: 30, right: 30, bottom: 30, left: 50},
        width = 250 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;

    // console.log("hello1")
// append the svg object to the body of the page
    const svg = d3.select(id)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

// get the data
    function getlabel(data) {

        if (data["label"] == "2") {
            return data[subfeatures]
        }
    }

    var array = getmaxmin(subfeatures)
// console.log(array)


    d3.csv("dosyalar/all_features_300_scene_1_complete.csv").then(function (data1) {
        // console.log("hello2")
        d3.csv("dosyalar/all_features_300_scene_2_complete.csv").then(function (data2) {

            // console.log("hello3")


            function kernelDensityEstimator(kernel, X) {
                return function (V) {
                    return X.map(function (x) {
                        return [x, d3.mean(V, function (v) {
                            return kernel(x - v);
                        })];
                    });
                };
            }

            function kernelEpanechnikov(k) {
                return function (v) {
                    return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
                };
            }

            // const svg = d3.select(DOM.svg(width, height));

            // // Draw the x and y axes.
            // svg.append('g').call(xAxis)
            // svg.append('g').call(yAxis)

            // // Draw the grid lines.
            // svg.append('g').call(xGrid)
            // svg.append('g').call(yGrid)

            // // Draw the line.
            // svg.append('path')
            //     .datum(data)
            //     .attr('d', line);


//  console.log(data1)

            // add the x Axis
            const x = d3.scaleLinear()
                .domain([array[1], array[0]])//grafiğnin cizilmesi buna bağlı
                .range([0, width]);
            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x));
            // console.log("hello4")
            // add the y Axis
            const y = d3.scaleLinear()
                .range([height, 0])
                .domain([array[3] - array[3] / 2, array[2] + array[2] / 2]);
            svg.append("g")
                .call(d3.axisLeft(y));


            // Compute kernel density estimation
            const kde = kernelDensityEstimator(kernelEpanechnikov(10), x.ticks(6))
            const density1 = kde(data1

                .map(function (d) {
                    return parseInt(getlabel(d));
                }))
            const density2 = kde(data2

                .map(function (d) {
                    return parseInt(getlabel(d));
                }))


            // console.log("hello5")

            var tooltip2 = d3.select("#div_customContent")
                .append("div")
                .style("position", "absolute")
                .style("visibility", "hidden")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "1px")
                .style("border-radius", "5px")
                .style("padding", "10px")
                .html("");

            // Plot the area
            // console.log(subfeatures, density1, density2)
            svg.append("path")
                .attr("class", "mypath")
                .datum(density1)
                .attr("fill", "red")
                .attr("opacity", ".4")
                .attr("stroke", "#000")
                .attr("stroke-width", 1)
                .attr("stroke-linejoin", "round")
                .on("click", function (d) {
                    fuc(subfeatures), fuc1(subfeatures);
                })
                .on("mouseover", function (d) {
                    return tooltip2.style("visibility", "visible");
                })
                .on("mousemove", function (d) {
                    // console.log(d);
                    return (tooltip2.html("Scene:1" + "<br>" + "Subfeature: " + subfeatures)).style("top", (event.pageY + 600) + "px").style("left", (event.pageX - 200) + "px");
                })
                .on("mouseout", function (d) {
                    return tooltip2.style("visibility", "hidden");
                })

                .attr("d", d3.line()
                    .curve(d3.curveBasis)
                    .x(function (d) {
                        // console.log(d);
                        return x(d[0]);
                    })
                    .y(function (d) {
                        return y(d[1]);
                    })
                );
            // console.log("hello6")
            // Plot the area
            svg.append("path")
                .attr("class", "mypath")
                .datum(density2)
                .attr("fill", "blue")
                .attr("opacity", ".4")
                .attr("stroke", "#000")
                .attr("stroke-width", 1)
                .attr("stroke-linejoin", "round")

                .on("click", function (d) {
                    fuc(subfeatures), fuc1(subfeatures);
                })
                .on("mouseover", function (d) {
                    return tooltip2.style("visibility", "visible");
                })
                .on("mousemove", function (d) {
                    // console.log(d);
                    return (tooltip2.html("Scene:2" + "<br>" + "Subfeature: " + subfeatures)).style("top", (event.pageY + 600) + "px").style("left", (event.pageX - 200) + "px");
                })
                .on("mouseout", function (d) {
                    return tooltip2.style("visibility", "hidden");
                })
                .attr("d", d3.line()

                    .curve(d3.curveBasis)
                    .x(function (d) {
                        return x(d[0]);
                    })
                    .y(function (d) {
                        return y(d[1]);
                    })
                );
            // svg.selectAll("path")
            // .on("mouseover", function(d){return tooltip2.style("visibility", "visible");})
            // .on("mousemove", function(d){console.log(d);return (tooltip2.html("values: "+
            // "<br>"+d.path[0]["__data__"][0][0]+" : "+d.path[0]["__data__"][0][1]
            // +"<br>"+d.path[0]["__data__"][1][0]+" : "+d.path[0]["__data__"][1][1]
            // +"<br>"+d.path[0]["__data__"][2][0]+" : "+d.path[0]["__data__"][2][1]
            // +"<br>"+d.path[0]["__data__"][3][0]+" : "+d.path[0]["__data__"][3][1]
            // +"<br>"+d.path[0]["__data__"][4][0]+" : "+d.path[0]["__data__"][4][1]
            // +"<br>"+d.path[0]["__data__"][5][0]+" : "+d.path[0]["__data__"][5][1]
            // +"<br>Scene:1"+"<br>"+"Subfeature: "+subfeatures)).style("top", (event.pageY-250)+"px").style("left",(event.pageX-250)+"px");})
            // .on("mouseout", function(d){return tooltip2.style("visibility", "hidden");})

            // d3.selectAll("path")


        })
    });


// Function to compute density

    var chartData = [
        {name: "Scene1", color: "rgb(255 0 0 / 40%)"},


    ];
    var legendItemSize = 12;
// console.log("hello7")
    var legendSpacing = 4;
    var xOffset = 00;
    var yOffset = 0;
    var legend = d3
        .select(id)
        .append('svg')
        .attr('style', 'position:absolute;top: 18px;left: 65px;')
        .selectAll('.legendItem')
        .data(chartData);

    //Create legend items
    legend
        .enter()
        .append('rect')
        .attr('class', 'legendItem')
        .attr('width', legendItemSize)
        .attr('height', legendItemSize)
        .style('fill', d => d.color)
        .attr('transform',
            (d, i) => {
                var x = xOffset;
                var y = yOffset + (legendItemSize + legendSpacing) * i;
                return `translate(${x}, ${y})`;
            });

    //Create legend labels
    legend
        .enter()
        .append('text')
        .attr('x', xOffset + legendItemSize + 5)
        .attr('y', (d, i) => yOffset + (legendItemSize + legendSpacing) * i + 12)
        .text(d => d.name);
    // drawperson(id)
    svg.append("text")
        .attr("x", 0)
        .attr("y", -50)
        .attr("text-anchor", "left")
        .style("font-size", "22px")
        .text("A d3.js heatmap");


    var chartData = [
        {name: "Scene2", color: "#0008ff54"}


    ];
    var legendItemSize = 12;
    // console.log("hello7")
    var legendSpacing = 4;
    var xOffset = 00;
    var yOffset = 0;
    var legend = d3
        .select(id)
        .append('svg')

        .attr('style', 'position:absolute;top: 18px;left:  140px;')
        .selectAll('.legendItem')
        .data(chartData);

    //Create legend items
    legend
        .enter()
        .append('rect')
        .attr('class', 'legendItem')
        .attr('width', legendItemSize)
        .attr('height', legendItemSize)
        .style('fill', d => d.color)
        .attr('transform',
            (d, i) => {
                var x = xOffset;
                var y = yOffset + (legendItemSize + legendSpacing) * i;
                return `translate(${x}, ${y})`;
            });

    //       //Create legend labels
    legend
        .enter()
        .append('text')
        .attr('x', xOffset + legendItemSize + 5)
        .attr('y', (d, i) => yOffset + (legendItemSize + legendSpacing) * i + 12)
        .text(d => d.name);
    // drawperson(id)
    svg.append("text")
        .attr("x", 0)
        .attr("y", -50)
        .attr("text-anchor", "left")
        .style("font-size", "22px")
        .text("A d3.js heatmap");


    // const xAxisGrid = d3.axisBottom(x).tickSize(-INNER_HEIGHT).tickFormat('').ticks(10);
    // const yAxisGrid = d3.axisLeft(y).tickSize(-INNER_WIDTH).tickFormat('').ticks(10);
    //       svg.append('g')
    //         .attr('class', 'x axis-grid')
    //         .attr('transform', 'translate(0,' + INNER_HEIGHT + ')')
    //         .call(xAxisGrid);
    //       svg.append('g')
    //         .attr('class', 'y axis-grid')
    //         .call(yAxisGrid);

    var chartData = [

        {name: subfeatures}

    ];
    var legendItemSize = 12;
    // console.log("hello7")
    var legendSpacing = 4;
    var xOffset = 00;
    var yOffset = 0;
    var legend = d3
        .select(id)
        .append('svg')
        .attr('style', 'position:absolute;top: 2px;left: 75px;font-weight: bold;')
        .selectAll('.legendItem')
        .data(chartData);

    //Create legend items
    // legend
    // .enter()
    // .append('rect')
    // .attr('class', 'legendItem')
    // .attr('width', legendItemSize)
    // .attr('height', legendItemSize)
    // .style('fill', d => d.color)
    // .attr('transform',
    //         (d, i) => {
    //             var x = xOffset;
    //             var y = yOffset + (legendItemSize + legendSpacing) * i;
    //             return `translate(${x}, ${y})`;
    //         });

    //Create legend labels
    legend
        .enter()
        .append('text')
        .attr('x', xOffset + legendItemSize + 5)
        .attr('y', (d, i) => yOffset + (legendItemSize + legendSpacing) * i + 12)
        .text(d => d.name);
    // drawperson(id)
    svg.append("text")
        .attr("x", 0)
        .attr("y", -50)
        .attr("text-anchor", "left")
        .style("font-size", "22px")
        .text("A d3.js heatmap");


    //   var chartData = [
    //     {name: "DENSITY GRAPH FOR ALL THE SUB FEATURES", color: "red"}

    //    ];


    //  //Initialize legend
    // var legendItemSize = 12;
    // var legendSpacing = 4;
    // var xOffset = 50;
    // var yOffset = 0;
    // var legend = d3
    // .select('#MY_div')
    // .append('svg')
    // .attr('style', 'position:absolute;z-index: -99999;top: 20px;left: 20px;')
    //     .selectAll('.legendItem')
    //     .data(chartData);

    // //Create legend items
    // // legend
    // // .enter()
    // // .append('rect')
    // // .attr('class', 'legendItem')
    // // .attr('width', legendItemSize)
    // // .attr('height', legendItemSize)
    // // .style('fill', d => d.color)
    // // .attr('transform',
    // //         (d, i) => {
    // //             var x = xOffset;
    // //             var y = yOffset + (legendItemSize + legendSpacing) * i;
    // //             return `translate(${x}, ${y})`;
    // //         });

    // //Create legend labels
    // legend
    // .enter()
    // .append('text')
    // .attr('x', xOffset + legendItemSize + 5)
    // .attr('y', (d, i) => yOffset + (legendItemSize + legendSpacing) * i + 12)
    // .text(d => d.name);


}



