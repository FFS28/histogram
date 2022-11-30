function scatterPlot(id, url, givenTopic, givenclass, iddensity) {
  const titles = {
    temporal: ["mean_time", "max_time"],
    sentiment: ["positive", "negative"],
    pysholingustic: [
      "WC",
      "Clout",
      "Tone",
      "WPS",
      "Dic",
      "Analytic",
      "Authentic",
      "Linguistic",
    ],
    emotion: [
      "sadness",
      "fear",
      "anger",
      "disgust",
      "anticipation",
      "joy",
      "surprise",
      "trust",
    ],
    lexical: ["i", "we", "you", "shehe", "they", "ipron", "det", "article"],
  };

  // console.log(givenTopic)
  document.querySelector(id).innerHTML = "<div id='legend'></div>";
  document.getElementById("figure2").innerHTML = "";
  document.getElementById("figure1").innerHTML = "";
  document.querySelector("#densityPlot").innerHTML = "";
  document.querySelector("#densityPlot1").innerHTML = "";
  document.querySelector("#densityPlo2").innerHTML = "";
  document.querySelector("#densityPlot3").innerHTML = "";
  document.querySelector("#densityPlot4").innerHTML = "";
  document.querySelector("#densityPlot5").innerHTML = "";
  document.querySelector("#densityPlot6").innerHTML = "";
  document.querySelector("#densityPlot7").innerHTML = "";
  document.querySelector("#densityPlot8").innerHTML = "";
  document.querySelector("#densityPlot").style.backgroundColor = "";
  document.querySelector("#densityPlot1").style.backgroundColor = "";
  document.querySelector("#densityPlo2").style.backgroundColor = "";
  document.querySelector("#densityPlot3").style.backgroundColor = "";
  document.querySelector("#densityPlot4").style.backgroundColor = "";
  document.querySelector("#densityPlot5").style.backgroundColor = "";
  document.querySelector("#densityPlot6").style.backgroundColor = "";
  document.querySelector("#densityPlot7").style.backgroundColor = "";
  document.querySelector("#densityPlot8").style.backgroundColor = "";
  // const title = [givenfeature.value]
  //console.log(givenclass)

  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 30, left: 70 },
    width = 400 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select(id)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // get the data
  d3.csv(url).then(function (data) {
    //console.log(data);

    const valuesWithFeatures0 = {};

    for (dataIterate of data) {
      if (dataIterate.label == givenclass) {
        //feature==  max_time,mean_time
        for (featurekey of titles[givenTopic]) {
          const feattureValue = dataIterate[featurekey];
          if (valuesWithFeatures0[featurekey]) {
            //varsa değeri
            valuesWithFeatures0[featurekey].push(feattureValue);
          } else {
            //yoksa değeri
            valuesWithFeatures0[featurekey] = [feattureValue];
          }
        }
      }
    }

    var z;

    function transform(givcals) {
      if (givcals == "0") {
        cLass = "HC";
      }
      if (givcals == "1") {
        cLass = "SZ";
      }
      if (givcals == "2") {
        cLass = "BD";
      }
      return cLass;
    }

    // console.log(valuesWithFeatures0);//max and minin ortalamsını verir.
    var sumstat = [];
    for (valuesIndex in valuesWithFeatures0) {
      var totalValues = [];
      var __values = [];
      for (j of valuesWithFeatures0[valuesIndex]) {
        totalValues.push({ key: valuesIndex, value: j });
        __values.push(j);
      }

      // const avg = valuesWithFeatures0[valuesIndex].reduce((a,b) => parseInt(a)+parseInt(b), 0) / valuesWithFeatures0[valuesIndex].length;
      // const min = Math.min(...valuesWithFeatures0[valuesIndex])
      // const max=Math.max(...valuesWithFeatures0[valuesIndex])
      // valuesWithFeatures0[valuesIndex] = {"avg": avg, "min": min, "max": max, "totalValues":totalValues};

      const avg =
        valuesWithFeatures0[valuesIndex].reduce(
          (a, b) => parseInt(a) + parseInt(b),
          0
        ) / valuesWithFeatures0[valuesIndex].length;
      const min = Math.min(...valuesWithFeatures0[valuesIndex]);
      const max = Math.max(...valuesWithFeatures0[valuesIndex]);

      var __valuesSorted = __values.sort((a, b) => a - b);
      var __q1 = d3.quantile(__valuesSorted, 0.1);
      var __median = d3.quantile(__valuesSorted, 0.5);
      var __q3 = d3.quantile(__valuesSorted, 0.9);
      var __interQuantileRange = __q3 - __q1;
      var __min = __q1 - 1 * __interQuantileRange;
      var __max = __q3 + 1.5 * __interQuantileRange;

      valuesWithFeatures0[valuesIndex] = {
        avg: avg,
        min: min,
        max: max,
        totalValues: Math.round(totalValues),
      };
      sumstat.push({
        key: valuesIndex,
        value: {
          max: __max,
          min: __min,
          median: __median,
          interQuantileRange: __interQuantileRange,
          q1: __q1,
          q3: __q3,
        },
      });

      // console.log(totalValues)
    }

    // console.log(sumstat);
    // console.log(valuesWithFeatures0)

    var min = 10000;
    var max = -10000;
    for (item of sumstat) {
      if (item.value.min < min) {
        min = item.value.min;
      }

      if (item.value.max > max) {
        max = item.value.max;
      }
    }

    // const values = Object.values(valuesWithFeatures0);
    // const max = values.reduce((a, b) => Math.max(a, b.min, b.max, b.avg), 0);
    // const min = values.reduce((a, b) => Math.min(a, b.min, b.max, b.avg), 0);

    //console.log(values, min, max);
    // X axis: scale and draw:
    var y = d3
      .scaleBand()
      .range([height, 25])
      .domain(titles[givenTopic])
      .padding(0.4);
    svg.append("g").attr("class", "axisblack").call(d3.axisLeft(y).tickSize(0));

    // Y axis: scale and draw:
    var x = d3
      .scaleLinear()
      .domain([min - (max - min) / 5, max + (max - min) / 5])
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    //console.log(valuesWithFeatures0);
    const data1 = [];
    for (topicKey of Object.keys(valuesWithFeatures0)) {
      // var __valArr = valuesWithFeatures0
      // var __sorted  = valuesWithFeatures0[topicKey].totalValues.sort((a, b) => a.value - b.value);
      // console.log(__sorted)
      // var __q1 = d3.quantile(__sorted, .25);
      // console.log("q1", __q1)
      data1.push({
        key: topicKey,
        value: valuesWithFeatures0[topicKey],
      });
      //    console.log(data1)//max min avg values are there
    }
    // console.log(valuesWithFeatures0)
    // append the bar rectangles to the svg element
    //console.log(data1)//1. 20 ->55 55 ->90 2 115
    const selection = svg.selectAll("whatever").data(data1).enter();

    var tooltip2 = d3
      .select("#div_customContent") //1
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .html(
        "<p>I'm a tooltip written in HTML</p><img src='https://github.com/holtzy/D3-graph-gallery/blob/master/img/section/ArcSmal.png?raw=true'></img><br>Fancy<br><span style='font-size: 40px;'>Isn't it?</span>"
      );

    //circle ekliyor ve renklendiriyor
    let deg;
    let color = "black";


    function getSubfeatureName1(key) {
      if (key == "sadness") {
        color = "#ff0000";
        return color;
      }
      if (key == "fear") {
        color = "#ff0080";
      }
      if (key == "anger") {
        color = "#ff0000";
      }
      if (key == "disgust") {
        color = "#80ff00";
      }
      if (key == "anticipation") {
        color = "#00ff00";
      }
      if (key == "joy") {
        color = "#00ff80";
      }
      if (key == "surprise") {
        color = "#4000ff";
      }
      if (key == "trust") {
        color = "#0080ff";
      }
    }

    function getSubfeatureName(key) {
      //1
      if (key == "mean_time") {
        color = "#ff0000";
        return color;
      }
      if (key == "max_time") {
        color = "#ff8000";
        return color;
      }
      //2
      if (key == "positive") {
        color = "#ff0000";
        return color;
      }
      if (key == "negative") {
        color = "#ff8000";
        deg = 10;

        return color;
      }

      //3
      if (key == "WC") {
        color = "#ff0000";
        return color;
      }
      if (key == "Clout") {
        color = "#ff8000";
      }
      if (key == "Tone") {
        color = "#ff00bf";
      }
      if (key == "WPS") {
        color = "#80ff00";
      }
      if (key == "Dic") {
        color = "#00ff00";
      }
      if (key == "Analytic") {
        color = "#00ff80";
      }
      if (key == "Authentic") {
        color = "#ff00ff";
      }
      if (key == "Linguistic") {
        color = "#0080ff";
      }

      //4
      if (key == "sadness") {
        color = "#ff0000";
        return color;
      }
      if (key == "fear") {
        color = "#669999";
      }
      if (key == "anger") {
        color = "#ff0000";
      }
      if (key == "disgust") {
        color = "#33cccc";
      }
      if (key == "anticipation") {
        color = "#b3b300";
      }
      if (key == "joy") {
        color = "#00ff80";
      }
      if (key == "surprise") {
        color = "#4000ff";
      }
      if (key == "trust") {
        color = "#0080ff";
      }

      //5
      if (key == "i") {
        color = "#ff0000";
        return color;
      }
      if (key == "we") {
        color = "#ff8000";
      }
      if (key == "you") {
        color = "#ff00bf";
      }
      if (key == "shehe") {
        color = "#80ff00";
      }
      if (key == "they") {
        color = "#00ff00";
      }
      if (key == "ipron") {
        color = "#00ff80";
      }
      if (key == "det") {
        color = "#4000ff";
      }
      if (key == "article") {
        color = "#0080ff";
      }
      return color;
    }

    function getValues(key, dvalueavg) {
      let x1 = dvalueavg;
      if (key == "negative") {
        return x(20) - x(-20);
      }
      if (key == "Linguistic") {
        return x(20) - x(-20);
      }
      if (key == "Authentic") {
        return x(20) - x(-20);
      }
      if (key == "Tone") {
        return x(20) - x(-20);
      }

      if (key == "disgust") {
        return x(0.7) - x(-0.7);
      }
      if (key == "anger") {
        return x(1) - x(-1);
      }
      if (key == "fear") {
        return x(2) - x(-2);
      }

      if (key == "det") {
        return x(2) - x(-2);
      }

      if (key == "you") {
        return x(1) - x(-1);
      }
      if (key == "we") {
        return x(0.5) - x(-0.5);
      }
      if (key == "fear") {
        return x(20) - x(-20);
      }
      if (key == "fear") {
        return x(20) - x(-20);
      }
      if (key == "WPS") {
        return x(8) - x(-8);
      } else {
        return x(x1 + x1 / 2) - x(x1 - x1 / 5);
      }
    }

    function getMaxpos(key, dvaluemax) {
      let x1 = dvaluemax;
      if (key == "WPS") {
        return x(150);
      }
      if (key == "Tone") {
        return x(70);
      }
      if (key == "negative") {
        return x(90);
      }
      if (key == "you") {
        return x(4);
      }

      if (key == "Linguistic") {
        return x(100);
      }
      if (key == "we") {
        return x(4);
      }
      if (key == "Authentic") {
        return x(70);
      } else {
        return x(x1);
      }
    }

    function getLastLines(key, dvaluemax) {
      let x1 = dvaluemax;
      if (key == "Linguistic") {
        return x(100);
      }
      if (key == "WPS") {
        return x(150);
      }
      if (key == "Tone") {
        return x(70);
      }
      if (key == "Authentic") {
        return x(70);
      }
      if (key == "negative") {
        return x(90);
      }
      if (key == "you") {
        return x(4);
      }
      if (key == "we") {
        return x(4);
      } else {
        return x(x1);
      }
    }

    function getminLine(key, dvaluemin) {
      let x1 = dvaluemin;
      if (key == "det") {
        return x(-4);
      } else {
        return x1;
      }
    }

    function getminpos(key, dminvalue) {
      var x1 = dminvalue;

      if (key == "det") {
        return x(-4);
      } else {
        return x1;
      }
    }

    /*
                //lineOntheMax
                svg
                .selectAll("vertLines")
                .data(data1)
                .enter()
                .append("line")
                .attr("x1", function (d) {
                    return (getMaxpos(d.key, d.value.max))
                })
                .attr("x2", function (d) {
                    return (getMaxpos(d.key, d.value.max))
                })
                .attr("y1", function (d) {
                    return (y(d.key) + y.bandwidth())
                })
                .attr("y2", function (d) {
                    return (y(d.key))
                })
    
                .attr("stroke", function (d) {
                    return getSubfeatureName(d.key)
                })
                .attr("fill", function (d) {
                    return getSubfeatureName(d.key)
                })
    
                .style("width", 10)
                .style("opacity", 0.5)
            //lineOntheMin
            svg
                .selectAll("vertLines")
                .data(data1)
                .enter()
                .append("line")
                .attr("x1", function (d) {
                    return (x(d.value.min))
                })
                .attr("x2", function (d) {
                    return (x(d.value.min))
                })
                .attr("y1", function (d) {
                    return (y(d.key) + y.bandwidth())
                })
                .attr("y2", function (d) {
                    return (y(d.key))
                })
    
                .attr("stroke", function (d) {
                    return getSubfeatureName(d.key)
                })
                .style("width", 10)
                .style("opacity", 0.5)
                .attr("fill", function (d) {
                    return getSubfeatureName(d.key)
                })
    
*/

    /*
        //vertline
        svg
            .selectAll("whatever")
            .data(data1)
            .enter()
            .append("line")
            .attr("x1", function (d) {
                return (x(d.value.max))
            })
            .attr("x2", function (d) {
                return (x(d.value.min))
            })
            .attr("y1", function (d) {
                return (y(d.key) + y.bandwidth() / 2)
            })
            .attr("y2", function (d) {
                return (y(d.key) + y.bandwidth() / 2)
            })

            .attr("fill", function (d) {
                return getSubfeatureName(d.key)
            })
            .style("width", 10)
            .style("opacity", 0.5)

        //lineOntheMax
        svg
            .selectAll("vertLines")
            .data(data1)
            .enter()
            .append("line")
            .attr("x1", function (d) {
                return (getMaxpos(d.key, d.value.max))
            })
            .attr("x2", function (d) {
                return (getMaxpos(d.key, d.value.max))
            })
            .attr("y1", function (d) {
                return (y(d.key) + y.bandwidth())
            })
            .attr("y2", function (d) {
                return (y(d.key))
            })

            .attr("stroke", function (d) {
                return getSubfeatureName(d.key)
            })
            .attr("fill", function (d) {
                return getSubfeatureName(d.key)
            })

            .style("width", 10)
            .style("opacity", 0.5)
        //lineOntheMin
        svg
            .selectAll("vertLines")
            .data(data1)
            .enter()
            .append("line")
            .attr("x1", function (d) {
                return (x(d.value.min))
            })
            .attr("x2", function (d) {
                return (x(d.value.min))
            })
            .attr("y1", function (d) {
                return (y(d.key) + y.bandwidth())
            })
            .attr("y2", function (d) {
                return (y(d.key))
            })

            .attr("stroke", function (d) {
                return getSubfeatureName(d.key)
            })
            .style("width", 10)
            .style("opacity", 0.5)
            .attr("fill", function (d) {
                return getSubfeatureName(d.key)
            })

//eğimli köşegen
        svg
            .selectAll("vertLines")
            .data(data1)
            .enter()
            .append("line")
            // .attr("x1", function(d){return(x(d.value.max))})
            .attr("x1", function (d) {
                return (getLastLines(d.key, d.value.max))
            })
            .attr("x2", function (d) {
                return (x(d.value.min + d.value.avg / 3))
            })
            .attr("y1", function (d) {
                return (y(d.key) + y.bandwidth() / 2)
            })
            .attr("y2", function (d) {
                return (y(d.key))
            })
            .attr("stroke", function (d) {
                return getSubfeatureName(d.key)
            })
            .style("width", 10)
            .style("opacity", 0.5)
            .attr("fill", function (d) {
                return getSubfeatureName(d.key)
            })


        svg
            .selectAll("vertLines")
            .data(data1)
            .enter()
            .append("line")
            .attr("x1", function (d) {
                return (getLastLines(d.key, d.value.max))
            })
            .attr("x2", function (d) {
                return (x(d.value.min + d.value.avg / 3))
            })
            .attr("y1", function (d) {
                return (y(d.key) + y.bandwidth() / 2)
            })
            .attr("y2", function (d) {
                return (y(d.key) + y.bandwidth())
            })
            .attr("stroke", function (d) {
                return getSubfeatureName(d.key)
            })
            .style("width", 10)
            .style("opacity", 0.5)
            .attr("fill", function (d) {
                return getSubfeatureName(d.key)
            })

        svg
            .selectAll("vertLines")
            .data(data1)
            .enter()
            .append("line")
            .attr("x1", function (d) {
                return (x(d.value.min))
            })
            .attr("x2", function (d) {
                return (x(d.value.min + d.value.avg / 3))
            })
            .attr("y1", function (d) {
                return (y(d.key) + y.bandwidth() / 2)
            })
            .attr("y2", function (d) {
                return (y(d.key))
            })
            .attr("stroke", function (d) {
                return getSubfeatureName(d.key)
            })
            .style("width", 10)
            .style("opacity", 0.5)
            .attr("fill", function (d) {
                return getSubfeatureName(d.key)
            })

        svg
            .selectAll("vertLines")
            .data(data1)
            .enter()
            .append("line")
            .attr("x1", function (d) {
                return (x(d.value.min))
            })
            .attr("x2", function (d) {
                return (x(d.value.min + d.value.avg / 3))
            })
            .attr("y1", function (d) {
                return (y(d.key) + y.bandwidth() / 2)
            })
            .attr("y2", function (d) {
                return (y(d.key) + y.bandwidth())
            })
            .attr("stroke", function (d) {
                return getSubfeatureName(d.key)
            })
            .style("width", 10)
            .style("opacity", 0.5)
            .attr("fill", function (d) {
                return getSubfeatureName(d.key)
            })
*/

    /*
        var boxWidth = 50
        svg
            .selectAll("whatever")
            .data(data1)
            .enter()
            .append("rect")
            .attr("x", function (d) {
                return (x(d.value.min + d.value.avg / 5))
            }) // console.log(x(d.value.q1)) ;
            // .attr("width", function(d){return(x(d.value.avg+(d.value.avg/2))-x(d.value.avg-(d.value.avg/5)))}) //console.log(x(d.value.q3)-x(d.value.q1))
            .attr("width", function (d) {
                return (getValues(d.key, d.value.avg))
            })
            // //.attr("width", function(d){return(x(d.value.max-3/4*(d.value.max-d.value.min)))})
            // .attr("width", function(d){return(x(d.value.avg/2))})
            .attr("y", function (d) {
                return y(d.key);
            })//
            // .attr("r","10")
            .attr("height", y.bandwidth())
            .attr("fill", function (d) {
                // console.log(d.key);
                return getSubfeatureName(d.key)
            })
            .attr("stroke", function (d) {
                return getSubfeatureName(d.key)
            })
            .style("opacity", 0.6)

*/
    // median line
    var bandwidth = 20;

    svg
      .selectAll("whatever")
      .data(sumstat)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        var __minInterval = (max - min) / 4;
        var __minVal = d.value.min;
        var __maxVal = d.value.max;
        var __xQ1 = x(d.value.q1);

        if (__maxVal - __minVal < __minInterval) {
          __xQ1 = __xQ1 - (x(max) - x(min)) / 20;
        }

        return __xQ1;
      })
      .attr("y", function (d) {
        return y(d.key);
      })
      .attr("width", function (d) {
        var __minInterval = (max - min) / 4;
        var __minVal = d.value.min;
        var __maxVal = d.value.max;
        var __width = x(d.value.q3) - x(d.value.q1);

        if (__maxVal - __minVal < __minInterval) {
          __width = __width + (x(max) - x(min)) / 10;
        }

        // return x(d.value.q3) - x(d.value.q1);
        return __width;
      })
      .attr("height", y.bandwidth())
      .attr("stroke", function (d) {
        return getSubfeatureName(d.key);
      })
      .attr("fill", function (d) {
        return getSubfeatureName(d.key);
      })
      .style("stroke-opacity", 0.4)
      .style("fill-opacity", 0.4);

    // min line
    svg
      .selectAll("vertLines")
      .data(sumstat)
      .enter()
      .append("line")
      .attr("x1", function (d) {
        var __minInterval = (max - min) / 4;
        var __minVal = d.value.min;
        var __maxVal = d.value.max;
        if (__maxVal - __minVal < __minInterval) {
          __minVal = d.value.min - __minInterval / 3;
        }
        return x(__minVal);
      })
      .attr("x2", function (d) {
        var __minInterval = (max - min) / 4;
        var __minVal = d.value.min;
        var __maxVal = d.value.max;
        if (__maxVal - __minVal < __minInterval) {
          __minVal = d.value.min - __minInterval / 3;
        }
        return x(__minVal);
      })
      .attr("y1", function (d) {
        return y(d.key);
      })
      .attr("y2", function (d) {
        return y(d.key) + y.bandwidth();
      })
      .attr("stroke", function (d) {
        return getSubfeatureName(d.key);
      })
      .attr("fill", function (d) {
        return getSubfeatureName(d.key);
      })

      .style("width", 10)
      .style("opacity", 1);

    // median
    svg
      .selectAll("vertLines")
      .data(sumstat)
      .enter()
      .append("line")
      .attr("x1", function (d) {
        return x(d.value.median);
      })
      .attr("x2", function (d) {
        return x(d.value.median);
      })
      .attr("y1", function (d) {
        return y(d.key);
      })
      .attr("y2", function (d) {
        return y(d.key) + y.bandwidth();
      })
      .attr("stroke", function (d) {
        return getSubfeatureName(d.key);
      })
      .attr("fill", function (d) {
        return getSubfeatureName(d.key);
      })

      .style("width", 10)
      .style("opacity", 1);

    //max
    svg
      .selectAll("vertLines")
      .data(sumstat)
      .enter()
      .append("line")
      .attr("x1", function (d) {
        var __minInterval = (max - min) / 4;
        var __minVal = d.value.min;
        var __maxVal = d.value.max;
        if (__maxVal - __minVal < __minInterval) {
          __maxVal = __maxVal + __minInterval / 3;
        }
        return x(__maxVal);
      })
      .attr("x2", function (d) {
        var __minInterval = (max - min) / 4;
        var __minVal = d.value.min;
        var __maxVal = d.value.max;
        if (__maxVal - __minVal < __minInterval) {
          __maxVal = __maxVal + __minInterval / 3;
        }
        return x(__maxVal);
      })
      .attr("y1", function (d) {
        return y(d.key);
      })
      .attr("y2", function (d) {
        return y(d.key) + y.bandwidth();
      })
      .attr("stroke", function (d) {
        return getSubfeatureName(d.key);
      })
      .attr("fill", function (d) {
        return getSubfeatureName(d.key);
      })

      .style("width", 10)
      .style("opacity", 1);

    // line3
    svg
      .selectAll("vertLines")
      .data(sumstat)
      .enter()
      .append("line")
      .attr("x1", function (d) {
        var __minInterval = (max - min) / 4;
        var __minVal = d.value.min;
        var __maxVal = d.value.max;
        if (__maxVal - __minVal < __minInterval) {
          __minVal = d.value.min - __minInterval / 3;
        }
        return x(__minVal);
      })
      .attr("x2", function (d) {
        return x(d.value.median);
      })
      .attr("y1", function (d) {
        return y(d.key) + y.bandwidth() / 2;
      })
      .attr("y2", function (d) {
        return y(d.key) + y.bandwidth();
      })
      .attr("stroke", function (d) {
        return getSubfeatureName(d.key);
      })
      .attr("fill", function (d) {
        return getSubfeatureName(d.key);
      })
      .style("width", 1)
      .style("opacity", 0.5)
      .style("stroke-dasharray", 1.5);

      
    //line2
    svg
      .selectAll("vertLines")
      .data(sumstat)
      .enter()
      .append("line")
      .attr("x1", function (d) {
        var __minInterval = (max - min) / 4;
        var __minVal = d.value.min;
        var __maxVal = d.value.max;
        if (__maxVal - __minVal < __minInterval) {
          __minVal = d.value.min - __minInterval / 3;
        }
        return x(__minVal);
      })
      .attr("x2", function (d) {
        return x(d.value.median);
      })
      .attr("y1", function (d) {
        return y(d.key) + y.bandwidth() / 2;
      })
      .attr("y2", function (d) {
        return y(d.key);
      })
      .attr("stroke", function (d) {
        return getSubfeatureName(d.key);
      })
      .attr("fill", function (d) {
        return getSubfeatureName(d.key);
      })
      .style("width", 1)
      .style("opacity", 0.5)
      .style("stroke-dasharray", 1.5);

    //line1
    svg
      .selectAll("vertLines")
      .data(sumstat)
      .enter()
      .append("line")
      .attr("x1", function (d) {
        var __minInterval = (max - min) / 4;
        var __minVal = d.value.min;
        var __maxVal = d.value.max;
        if (__maxVal - __minVal < __minInterval) {
          __maxVal = __maxVal + __minInterval / 3;
        }
        return x(__maxVal);
      })
      .attr("x2", function (d) {
        return x(d.value.median);
      })
      .attr("y1", function (d) {
        return y(d.key) + y.bandwidth() / 2;
      })
      .attr("y2", function (d) {
        return y(d.key);
      })
      .attr("stroke", function (d) {
        return getSubfeatureName(d.key);
      })
      .attr("fill", function (d) {
        return getSubfeatureName(d.key);
      })
      .style("width", 1)
      .style("opacity", 0.5)
      .style("stroke-dasharray", 1.5);

    // line4
    svg
      .selectAll("vertLines")
      .data(sumstat)
      .enter()
      .append("line")
      .attr("x1", function (d) {
        var __minInterval = (max - min) / 4;
        var __minVal = d.value.min;
        var __maxVal = d.value.max;
        if (__maxVal - __minVal < __minInterval) {
          __maxVal = __maxVal + __minInterval / 3;
        }
        return x(__maxVal);
      })
      .attr("x2", function (d) {
        return x(d.value.median);
      })
      .attr("y1", function (d) {
        return y(d.key) + y.bandwidth() / 2;
      })
      .attr("y2", function (d) {
        return y(d.key) + y.bandwidth();
      })
      .attr("stroke", function (d) {
        return getSubfeatureName(d.key);
      })
      .attr("fill", function (d) {
        return getSubfeatureName(d.key);
      })
      .style("width", 1)
      .style("opacity", 0.5)
      .style("stroke-dasharray", 1.5);

    var boxWidth = 50;
    // svg
    //   .selectAll("whatever")
    //   .data(data1)
    //   .enter()
    //   .append("rect")
    //       .attr("x", function(d){return(x(d.value.min+d.value.avg/3))}) // console.log(x(d.value.q1)) ;
    //       .attr("width", function(d){return(x(d.value.avg+(d.value.avg/5))-x(d.value.avg-(d.value.avg/5)))}) //console.log(x(d.value.q3)-x(d.value.q1))
    //       // //.attr("width", function(d){return(x(d.value.max-3/4*(d.value.max-d.value.min)))})
    //       // .attr("width", function(d){return(x(d.value.avg/2))})
    //       .attr("y", function(d) { return y(d.key); })//
    //       .attr("r","10")
    //       .attr("height", y.bandwidth() )
    //       .attr("stroke", "black")

    //       .style("fill", "#69b3a2")
    //       .style("opacity", 0.5)

    //     svg
    //       .selectAll("myViolin")
    //       .data(data1)
    //       .enter()        // So now we are working group per group
    //       .append("g")
    //         .attr("transform", function(d){ return("translate(" + x(d.key) +" ,0)") } ) // Translation on the right to be at the group position
    //       .append("path")
    //           .datum(function(d){ return(d.value)})     // So now we are working density per density
    //           .style("stroke", "none")
    //           .style("fill","#69b3a2")
    //           .attr("d", d3.area()
    //               .x0(function(d){ return(xNum(d.value.min)) } )
    //               .x1(function(d){ return(xNum(d.value.max)) } )
    //               .y(function(d){ return(y(d.key)) } )
    //               .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
    //           )
    //   // rectangle for the main box

    // Show the median
    //   svg
    //   .selectAll("medianLines")
    //   .data(data1)
    //   .enter()
    //   .append("line")
    //     .attr("y1", function(d){return(y(d.key))})
    //     .attr("y2", function(d){return(y(d.key) + y.bandwidth())})
    //     .attr("x1", function(d){return(x(d.value.max-d.value.avg/5))})
    //     .attr("x2", function(d){return(x(d.value.max-d.value.avg/2))})
    //     .attr("stroke", "black")
    //     .style("width", 10)

    // svg
    // .selectAll("medianLines")
    // .data(data1)
    // .enter()
    // .append("line")
    //   .attr("y1", function(d){return(y(d.key))})
    //   .attr("y2", function(d){return(y(d.key))})
    //   .attr("x1", function(d){return(x(d.value.avg-(d.value.avg/2)))})
    //   .attr("x2", function(d){return(x(d.value.avg-(d.value.avg/2)))})
    //   .attr("stroke", "black")
    //   .style("width", 10)

    var tooltip = d3
      .select("#my_dataviz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("font-size", "16px");
    // Three function that change the tooltip when user hover / move / leave a cell
    //   var mouseover = function(d) {
    //     tooltip
    //       .transition()
    //       .duration(200)
    //       .style("opacity", 1)
    //     tooltip
    //         .html("<span style='color:grey'>Sepal length: </span>" + d.Sepal_Length) // + d.Prior_disorder + "<br>" + "HR: " +  d.HR)
    //         .style("left", (d3.mouse(this)[0]+30) + "px")
    //         .style("top", (d3.mouse(this)[1]+30) + "px")
    //   }
    //   var mousemove = function(d) {
    //     tooltip
    //       .style("left", (d3.mouse(this)[0]+30) + "px")
    //       .style("top", (d3.mouse(this)[1]+30) + "px")
    //   }
    //   var mouseleave = function(d) {
    //     tooltip
    //       .transition()
    //       .duration(200)
    //       .style("opacity", 0)
    //   }
    var myColor = d3
      .scaleSequential()
      .interpolator(d3.interpolateInferno)
      .domain([4, 8]);

    combined = [];

    var check = 0;
    data1.forEach((e) => {
      combined.push(
        ...e.value.totalValues
          .filter((e) => {
            if (check == 0) {
              check = 1;
              return true;
            } else {
              check = 0;
              return false;
            }
          })
          .filter((e) => {
            if (check == 0) {
              check = 1;
              return true;
            } else {
              check = 0;
              return false;
            }
          })
          .filter((e) => {
            if (check == 0) {
              check = 1;
              return true;
            } else {
              check = 0;
              return false;
            }
          })
      );
    });
    var jitterWidth = 20;
    svg
      .selectAll("indPoints")
      .data(combined)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(parseInt(d.value));
      })
      .attr("cy", function (d) {
        return (
          y(d.key) +
          y.bandwidth() / 2 -
          jitterWidth / 2 +
          Math.random() * jitterWidth
        );
      })
      .attr("r", 2.2)
      .style("opacity", 1)
      .style("fill", function (d) {
        return getSubfeatureName(d.key);
      })
      .attr("stroke", function(d) {
        return getSubfeatureName(d.key);
      })
      // .on("click",function(d){drawdensity(d.target["__data__"].key,iddensity)})
      .on("mouseover", function (d) {
        return tooltip2.style("visibility", "visible");
      })
      .on("mousemove", function (d) {
        return tooltip2
          .html(
            "Class: " +
              transform(givenclass) +
              "<br>Feature: " +
              givenTopic +
              "<br>Feature: " +
              d.path[0]["__data__"].key +
              "<br> Value: " +
              Math.floor(d.path[0]["__data__"].value)
          )
          .style("top", event.pageY - 40 + "px")
          .style("left", event.pageX - 370 + "px");
      })
      .on("mouseout", function (d) {
        return tooltip2.style("visibility", "hidden");
      });

    //     selection.append("circle")
    //     .attr("cx", function(d){return(x((d.value.avg-(d.value.avg/2))))})
    //     .attr("cy", function(d){ return( y(d.key) +y.bandwidth()/2)})
    //     .attr("r", 4)
    //     .style("fill", "#f7f7f7" )
    //     .attr("stroke", "black")

    //     // .on("click",function(d){drawdensity(d.target["__data__"].key,iddensity)})//ı have get subfeatures keys

    //     .on("mouseover", function(d){return tooltip2.style("visibility", "visible");})
    //     .on("mousemove", function(d){return (tooltip2.html("Class:"+transform(givenclass)+"<br>Feature:"+d.path[0]["__data__"].key+"<br>Min Value:"+d.path[0]["__data__"].value.min)).style("top", (event.pageY-150)+"px").style("left",(event.pageX-150)+"px");})
    //     .on("mouseout", function(d){return tooltip2.style("visibility", "hidden");})

    //   selection.append("circle")
    //     .attr("cx", function(d){ return(x(d.value.avg))})
    //     .attr("cy", function(d){ return( y(d.key) +y.bandwidth()/2)})
    //     .attr("r", 4)
    //     .style("fill", "#998ec3" )
    //     .attr("stroke", "black")

    //     // .on("click",function(d){drawdensity(d.target["__data__"].key,iddensity)})

    //     .on("mouseover", function(d){ return tooltip2.style("visibility", "visible");})
    //     .on("mousemove", function(d){return (tooltip2.html("Class:"+transform(givenclass)+"<br>Feature:"+d.path[0]["__data__"].key+"<br>Avg Value:"+d.path[0]["__data__"].value.avg)).style("top", (event.pageY-150)+"px").style("left",(event.pageX-150)+"px");})
    //     .on("mouseout", function(d){return tooltip2.style("visibility", "hidden");})

    //   selection.append("circle")
    //     .attr("cx", function(d){ return(x(d.value.avg+(d.value.avg/2)))})
    //     .attr("cy", function(d){ return( y(d.key) +y.bandwidth()/2)})
    //     .attr("r", 4)
    //     .style("fill", "#f1a340" )
    //     .attr("stroke", "black")

    //     // .on("click",function(d){drawdensity(d.target["__data__"].key,iddensity)})

    //     .on("mouseover", function(d){ return tooltip2.style("visibility", "visible");})
    //     .on("mousemove", function(d){return (tooltip2.html("Class:"+transform(givenclass)+"<br>Feature:"+d.path[0]["__data__"].key+"<br>Max Value:"+d.path[0]["__data__"].value.max)).style("top", (event.pageY-150)+"px").style("left",(event.pageX-150)+"px");})
    //     .on("mouseout", function(d){return tooltip2.style("visibility", "hidden");})

    // svg
    // .data(data1)
    // .enter()
    // .append("line")
    //     .attr("x1", function(d){ return(x(d.value.avg+(d.value.avg/2)))})
    //     .attr("x2", function(d){ return( x(d.value.avg)-d.value.avg/2 )})
    //     .attr("y1", function(d){ return(y(d.key))})
    //     .attr("y2", function(d){ return( y(d.key))})

    //     .style("fill", "#f1a340" )
    //     .attr("stroke", "black")

    //     // .on("click",function(d){drawdensity(d.target["__data__"].key,iddensity)})

    //     .on("mouseover", function(d){ return tooltip2.style("visibility", "visible");})
    //     .on("mousemove", function(d){return (tooltip2.html("Class:"+transform(givenclass)+"<br>Feature:"+d.path[0]["__data__"].key+"<br>Max Value:"+d.path[0]["__data__"].value.max)).style("top", (event.pageY-150)+"px").style("left",(event.pageX-150)+"px");})
    //     .on("mouseout", function(d){return tooltip2.style("visibility", "hidden");})

    //     svg
    //   .selectAll("medianLines")
    //   .data(data1)
    //   .enter()
    //   .append("line")
    //     .attr("y1", function(d){return(y(d.key))})
    //     .attr("y2", function(d){return(y(d.key) + y.bandwidth())})
    //     .attr("x1", function(d){return(x(d.value.max-d.value.avg/5))})
    //     .attr("x2", function(d){return(x(d.value.max-d.value.avg/2))})
    //     .attr("stroke", "black")
    //     .style("width", 10)

    //     svg
    //     .selectAll("indPoints")
    //     .data(data1)
    //     .enter()
    //     .append("circle")
    //     .attr("cx", function(d){ var liste=[d.value.min,d.value.max];var lis=listed(liste); return(x(Math.random()*d.value.min))})
    //     .attr("cy", function(d){ return( y(d.key) + (y.bandwidth()/2) - jitterWidth/2 + Math.random()*jitterWidth )})
    //     .attr("r", 4)
    //     .style("fill", "blue")

    // svg
    //     .selectAll("indPoints")
    //     .data(data1)
    //     .enter()
    //     .append("circle")
    //     .attr("cx", function(d){ var liste=[d.value.min,d.value.max];var lis=listed(liste); return(x())})
    //     .attr("cy", function(d){ return( y(d.key) + (y.bandwidth()/2) - jitterWidth/2 + Math.random()*jitterWidth )})
    //     .attr("r", 4)
    //     .style("fill","red")

    // svg
    //     .selectAll("indPoints")
    //     .data(data1)
    //     .enter()
    //     .append("circle")
    //     .attr("cx", function(d){ var liste=[d.value.min,d.value.max];var lis=listed(liste); return(x())})
    //     .attr("cy", function(d){ return( y(d.key) + (y.bandwidth()/2) - jitterWidth/2 + Math.random()*jitterWidth )})
    //     .attr("r", 4)
    //     .style("fill", "green")

    //scatter plot legend
    var chartData = [{ name: "Box Plot For", color: "red" }];

    //Initialize legend
    var legendItemSize = 12;
    var legendSpacing = 4;
    var xOffset = 50;
    var yOffset = 0;
    var legend = d3
      .select("#legend")
      .append("svg")
      .attr("style", "position:absolute;z-index: -99999;top: 20px;left: 40px;")
      .selectAll(".legendItem")
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
      .append("text")
      .attr("x", xOffset + legendItemSize + 5)
      .attr("y", (d, i) => yOffset + (legendItemSize + legendSpacing) * i + 12)
      .text((d) => d.name);

    var chartData = [{ name: "The Feature Selected", color: "red" }];

    //Initialize legend
    var legendItemSize = 12;
    var legendSpacing = 4;
    var xOffset = 50;
    var yOffset = 0;
    var legend = d3
      .select("#legend")
      .append("svg")
      .attr("style", "position:absolute;z-index: -99999;top: 20px;left: 125px;")
      .selectAll(".legendItem")
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
      .append("text")
      .attr("x", xOffset + legendItemSize + 5)
      .attr("y", (d, i) => yOffset + (legendItemSize + legendSpacing) * i + 12)
      .text((d) => d.name);
  });

  if (givenTopic == "temporal") {
    drawdensity("mean_time", "#densityPlot");
    drawdensity("max_time", "#densityPlot1");
  }
  if (givenTopic == "sentiment") {
    drawdensity("positive", "#densityPlot");
    drawdensity("negative", "#densityPlot1");
  }
  if (givenTopic == "pysholingustic") {
    drawdensity("WC", "#densityPlot");
    drawdensity("Clout", "#densityPlot1");
    drawdensity("Tone", "#densityPlo2");
    drawdensity("WPS", "#densityPlot3");
    drawdensity("Dic", "#densityPlot4");
    drawdensity("Analytic", "#densityPlot5");
    drawdensity("Authentic", "#densityPlot6");
    drawdensity("Linguistic", "#densityPlot7");
    //  drawdensity("label","#densityPlot8")
  }
  if (givenTopic == "emotion") {
    drawdensity("sadness", "#densityPlot");
    drawdensity("fear", "#densityPlot1");
    drawdensity("anger", "#densityPlo2");
    drawdensity("disgust", "#densityPlot3");
    drawdensity("anticipation", "#densityPlot4");
    drawdensity("joy", "#densityPlot5");
    drawdensity("surprise", "#densityPlot6");
    drawdensity("trust", "#densityPlot7");
    //  drawdensity("label","#densityPlot8")
  }
  if (givenTopic == "lexical") {
    drawdensity("i", "#densityPlot");
    drawdensity("we", "#densityPlot1");
    drawdensity("you", "#densityPlo2");
    drawdensity("shehe", "#densityPlot3");
    drawdensity("they", "#densityPlot4");
    drawdensity("ipron", "#densityPlot5");
    drawdensity("det", "#densityPlot6");
    drawdensity("article", "#densityPlot7");
    //  drawdensity("label","#densityPlot8")
  }
}
