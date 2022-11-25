function getmaxmin(subfeatures) {


// set the dimensions and margins of the graph
    const margin = {top: 30, right: 30, bottom: 30, left: 50},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
    const svg = d3.select("#densityplot2")


// get the data

    var lastarray = []

    var datayvalues = []
    var dataxvalues = []

    function getlabel(data) {

        if (data["label"] == "1") {
            return data[subfeatures]
        }
    }

    var grap = 50
    if (subfeatures == "WPS") {
        grap = 250
    }

    if (subfeatures == "max_time") {
        grap = 250

    }
    if (subfeatures == "positive") {
        grap = 800

    }

    if (subfeatures == "Analytic") {
        grap = 120

    }
    if (subfeatures == "WC") {
        grap = 700

    }
    if (subfeatures == "Clout") {
        grap = 120
    }
    if (subfeatures == "Dic") {
        grap = 100
    }
//   console.log(grap)
    d3.csv("dosyalar/all_features_300_scene_1_complete.csv").then(function (data1) {
        d3.csv("dosyalar/all_features_300_scene_2_complete.csv").then(function (data2) {


// add the x Axis
            const x = d3.scaleLinear()
                .domain([-30, grap])//grafiğnin cizilmesi buna bağlı
                .range([0, width]);


// add the y Axis
            const y = d3.scaleLinear()
                .range([height, 0])
                .domain([0, 120]);


            // Compute kernel density estimation
            const kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(60))
            const density1 = kde(data1

                .map(function (d) {
                    return parseInt(getlabel(d));
                }))
            const density2 = kde(data2

                .map(function (d) {
                    return parseInt(getlabel(d));
                }))
            console.log(density1)

            svg.append("path")
                .attr("class", "mypath")
                .datum(density1)
                .attr("fill", "#69b3a2")
                .attr("opacity", ".6")
                .attr("stroke", "#000")
                .attr("stroke-width", 1)
                .attr("stroke-linejoin", "round")
                .attr("d", d3.line()
                    .curve(d3.curveBasis)
                    .x(function (d) {
                        x(d[0]);
                        dataxvalues.push(d[0])
                    })
                    .y(function (d) {
                        y(d[1]);
                        datayvalues.push(d[1])
                    })
                );

// Plot the area
            svg.append("path")
                .attr("class", "mypath")
                .datum(density2)
                .attr("fill", "#404080")
                .attr("opacity", ".6")
                .attr("stroke", "#000")
                .attr("stroke-width", 1)
                .attr("stroke-linejoin", "round")
                .attr("d", d3.line()
                    .curve(d3.curveBasis)
                    .x(function (d) {
                        console.log(d);
                        x(d[0]);
                        dataxvalues.push(d[0])
                    })
                    .y(function (d) {
                        y(d[1]);
                        datayvalues.push(d[1])
                    })
                );


            var maxx = Math.max(...dataxvalues)
            var minx = Math.min(...dataxvalues)
            var maxy = Math.max(...datayvalues)
            var miny = Math.min(...datayvalues)

            lastarray.push(maxx)
            lastarray.push(minx)
            lastarray.push(maxy)
            lastarray.push(miny)
            // console.log(lastarray)


        })
    });


// Function to compute density
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

    return lastarray
}
