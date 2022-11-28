function scatter(class1, class2, color0, color1, valuesWithTopics0, valuesWithTopics1, svg, x, y, height, url, iddensity) {
    // var color0="#ff7400"
    // var color1="ff7400"

    const data0 = [];
    // console.log(valuesWithTopics0)
    for (topicKey of Object.keys(valuesWithTopics0)) {
        data0.push({
            key: topicKey,
            value: valuesWithTopics0[topicKey]
        });
    }
    //console.log(data0)

    // append the bar rectangles to the svg element
    //console.log(data0)//1. 20 ->55 55 ->90 2 115
    // console.log(data0)
    svg.selectAll("rect")

        .data(data0)

        .join("rect")

        .attr("id", function (d) {
            return "data0" + d.key
        })
        .attr("x", 1)
        .attr("transform", function (d) {
            d.value;
            return `translate(${x(d.key) - 20}, ${y(d.value)})`
        })
        .attr("width", function (d) {
            return 30
        })
        .attr("height", function (d) {
            return height - y(d.value);
        })
        .style("fill", color0)


    const data1 = [];
    for (topicKey of Object.keys(valuesWithTopics1)) {
        data1.push({
            key: topicKey,
            value: valuesWithTopics1[topicKey]
        });
    }
    // append the bar rectangles to the svg element
    //console.log(data1,data0)//1. 20 ->55 55 ->90 2 115
    svg.selectAll("rect1")
        .data(data1)
        .join("rect")
        .attr("x", 1)

        .attr("id", function (d) {
            return "data1" + d.key
        })
        .attr("transform", function (d) {
            return `translate(${x(d.key) + 10}, ${y(d.value)})`
        })
        .attr("width", function (d) {
            return 30
        })
        .attr("height", function (d) {
            return height - y(d.value);
        })
        .style("fill", color1)

    var tooltip2 = d3.select("#div_customContent")
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .html("<p>I'm a tooltip written in HTML</p><img src='https://github.com/holtzy/D3-graph-gallery/blob/master/img/section/ArcSmal.png?raw=true'></img><br>Fancy<br><span style='font-size: 40px;'>Isn't it?</span>");


    var cLass

    function transform(givcals) {
        if (givcals == "0") {
            cLass = "HZ"

        }
        if (givcals == "1") {
            cLass = "SZ"

        }
        if (givcals == "2") {
            cLass = "BD"

        }
        return cLass

    }

    //console.log(url)
    var chartData = [


        {name: "Class:" + transform(class1), color: color0},
        {name: "Class:" + transform(class2), color: color1},


    ];


    //histogram legend
    var legendItemSize = 12;
    var legendSpacing = 4;
    var xOffset = 50;
    var yOffset = 0;
    var legend = d3
        .select('#div_customContent')
        .append('svg')
        .attr('style', 'position:absolute;z-index:-9999999;top: 0px;left: 0px;max-width: 150px;max-height: 35px')
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
    var chartData = [
        {name: "Please Click On Any Bar To See "},


    ];


    //histogram legend
    var legendItemSize = 12;
    var legendSpacing = 4;
    var xOffset = 50;
    var yOffset = 0;
    var legend = d3
        .select('#div_customContent')
        .append('svg')
        .attr('style', 'position:absolute;z-index:-9999999;top: 17px;left: 75px;max-height: 35px')
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


    legend
        .enter()
        .append('text')
        .attr('x', xOffset + legendItemSize + 5)
        .attr('y', (d, i) => yOffset + (legendItemSize + legendSpacing) * i + 12)
        .text(d => d.name);
    var chartData = [
        {name: "The Box And Density Plots"},


    ];


    //histogram legend
    var legendItemSize = 12;
    var legendSpacing = 4;
    var xOffset = 50;
    var yOffset = 0;
    var legend = d3
        .select('#div_customContent')
        .append('svg')
        .attr('style', 'position:absolute;z-index:-9999999;top: 0px;left: 75px;max-height: 35px')
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


    const titles1 = {
        "temporal": ["mean_time", "max_time"],
        "sentiment": ["positive", "negative"],
        "pysholingustic": ["WC", "Clout", "Tone", "WPS", "Dic", "Analytic", "Authentic", "Linguistic", "label"],
        "emotion": ["sadness", "fear", "anger", "disgust", "anticipation", "joy", "surprise", "trust", "label"],
        "lexical": ["i", "we", "you", "shehe", "they", "ipron", "det", "article", "label"]
    };


    function trans(data) {
        var subfeatures = " "
        // var length=length.data
        for (featur of titles1[data]) {

            subfeatures += "<br>" + featur


        }
        return subfeatures
    }

    //trans("temporal")
    // var x=titles1["temporal"]
    // console.log(titles1["temporal"])
    // console.log(data0[1]["key"])//features
    // //trans("sentiment")


    // console.log(titles1["temporal"])
    d3.select("#data0temporal")

        .on("click", function () {
            scatterPlot(idscat, url, "temporal", class1, iddensity);
        })
        .on("mouseover", function (d) {
            return tooltip2.style("visibility", "visible");
        })
        .on("mousemove", function (d) {
            return (tooltip2.html("Class:" + transform(class1) + "<br>Features:Temporal" + "<br>Sub features:" + trans("temporal") + "<br>Value:" + d.path[0]["__data__"].value,)).style("top", (event.pageY - 20) + "px").style("left", (event.pageX - 480) + "px");
        })
        .on("mouseout", function (d) {
            return tooltip2.style("visibility", "hidden");
        });


    d3.select("#data1temporal")

        .on("click", function () {
            scatterPlot(idscat, url, "temporal", class2, iddensity);
        })
        .on("mouseover", function (d) {
            return tooltip2.style("visibility", "visible");
        })
        .on("mousemove", function (d) {
            return (tooltip2.html("Class:" + transform(class2) + "<br>Features:Temporal" + "<br>Sub features:" + trans("temporal") + "<br>Value:" + d.path[0]["__data__"].value)).style("top", (event.pageY - 20) + "px").style("left", (event.pageX - 480) + "px");
        })
        .on("mouseout", function (d) {
            return tooltip2.style("visibility", "hidden");
        });

    d3.select("#data0sentiment")

        .on("click", function (d) {
            scatterPlot(idscat, url, "sentiment", class1, iddensity);
        })
        .on("mouseover", function (d) {
            return tooltip2.style("visibility", "visible");
        })
        .on("mousemove", function (d) {
            return tooltip2.html("Class:" + transform(class1) + "<br>Features:Sentiment" + "<br>Sub features:" + trans("sentiment") + "<br>Value:" + d.path[0]["__data__"].value).style("top", (event.pageY - 20) + "px").style("left", (event.pageX - 480) + "px");
        })
        .on("mouseout", function (d) {
            return tooltip2.style("visibility", "hidden");
        });

    d3.select("#data1sentiment")

        .on("click", function () {
            scatterPlot(idscat, url, "sentiment", class2, iddensity);
        })
        .on("mouseover", function (d) {
            d.path[0]["__data__"].value;
            return tooltip2.style("visibility", "visible");
        })
        .on("mousemove", function (d) {
            return (tooltip2.html("Class:" + transform(class2) + "<br>Features:Sentiment" + "<br>Sub features:" + trans("sentiment") + "<br>Value:" + d.path[0]["__data__"].value)).style("top", (event.pageY - 20) + "px").style("left", (event.pageX - 480) + "px");
        })
        .on("mouseout", function (d) {
            return tooltip2.style("visibility", "hidden");
        });


    d3.select("#data0pysholingustic")

        .on("click", function () {
            scatterPlot(idscat, url, "pysholingustic", class1, iddensity);
        })
        .on("mouseover", function (d) {
            return tooltip2.style("visibility", "visible");
        })
        .on("mousemove", function (d) {
            return tooltip2.html("Class:" + transform(class1) + "<br>Features:Pysholingustic" + "<br>Sub features:" + trans("pysholingustic") + "<br>Value:" + d.path[0]["__data__"].value).style("top", (event.pageY - 20) + "px").style("left", (event.pageX - 480) + "px");
        })
        .on("mouseout", function (d) {
            return tooltip2.style("visibility", "hidden");
        });

    d3.select("#data1pysholingustic")
        .on("click", function () {
            scatterPlot(idscat, url, "pysholingustic", class2, iddensity);
        })
        .on("mouseover", function (d) {
            return tooltip2.style("visibility", "visible");
        })
        .on("mousemove", function (d) {
            return tooltip2.html("Class:" + transform(class2) + "<br>Features:Pysholingustic" + "<br>Sub features:" + trans("pysholingustic") + "<br>Value:" + d.path[0]["__data__"].value).style("top", (event.pageY - 20) + "px").style("left", (event.pageX - 480) + "px");
        })
        .on("mouseout", function (d) {
            return tooltip2.style("visibility", "hidden");
        });


    d3.select("#data0emotion")
        .on("click", function () {
            scatterPlot(idscat, url, "emotion", class1, iddensity);
        })
        .on("mouseover", function (d) {
            return tooltip2.style("visibility", "visible");
        })
        .on("mousemove", function (d) {
            return tooltip2.html("Class:" + transform(class1) + "<br>Features:Emotion" + "<br>Sub features:" + trans("emotion") + "<br>Value:" + d.path[0]["__data__"].value).style("top", (event.pageY - 20) + "px").style("left", (event.pageX - 480) + "px");
        })
        .on("mouseout", function (d) {
            return tooltip2.style("visibility", "hidden");
        });

    d3.select("#data1emotion")
        .on("click", function (d) {
            scatterPlot(idscat, url, "emotion", class2, iddensity);
        })
        .on("mouseover", function (d) {
            return tooltip2.style("visibility", "visible");
        })
        .on("mousemove", function (d) {
            return tooltip2.html("Class:" + transform(class2) + "<br>Features:Emotion" + "<br>Sub features:" + trans("emotion") + "<br>Value:" + d.path[0]["__data__"].value).style("top", (event.pageY - 20) + "px").style("left", (event.pageX - 480) + "px");
        })
        .on("mouseout", function (d) {
            return tooltip2.style("visibility", "hidden");
        });


    d3.select("#data0lexical")
        .on("click", function () {
            scatterPlot(idscat, url, "lexical", class1, iddensity);
        })
        .on("mouseover", function (d) {
            return tooltip2.style("visibility", "visible");
        })
        .on("mousemove", function (d) {
            return tooltip2.html("Class:" + transform(class1) + "<br>Features:lexical" + "<br>Sub features:" + trans("lexical") + "<br>Value:" + d.path[0]["__data__"].value).style("top", (event.pageY - 20) + "px").style("left", (event.pageX - 480) + "px");
        })
        .on("mouseout", function (d) {
            return tooltip2.style("visibility", "hidden");
        });

    d3.select("#data1lexical")
        .on("click", function () {
            scatterPlot(idscat, url, "lexical", class2, iddensity);
        })
        .on("mouseover", function (d) {
            return tooltip2.style("visibility", "visible");
        })
        .on("mousemove", function (d) {
            return tooltip2.html("Class:" + transform(class2) + "<br>Features:lexical" + "<br>Sub features:" + trans("lexical") + "<br>Value:" + d.path[0]["__data__"].value).style("top", (event.pageY - 20) + "px").style("left", (event.pageX - 480) + "px");
        })
        .on("mouseout", function (d) {
            return tooltip2.style("visibility", "hidden");
        });


}
