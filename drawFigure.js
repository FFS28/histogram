function fuc(subfeatur) {
    // document.querySelector("#figure2").style.backgroundColor="#bdbdbd"
    document.getElementById("figure2").innerHTML = ""

// console.log(subfeatur)

// document.getElementById("figure1").innerHTML=" "


// set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 120},
        width = 400 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page
// var svg0 = d3.select("#figure1")
// .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
// .append("g")
//     .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");

    var svg1 = d3.select("#figure2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


//         var svg2 = d3.select("#figure2")
// .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
// .append("g")
//     .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");


    d3.csv("dosyalar/all_features_300_scene_1_complete.csv").then(function (data1) {

        d3.csv("dosyalar/all_features_300_scene_2_complete.csv").then(function (data2) {


            var subfeatures = subfeatur


            var Data1controListzero = []
            var Data1controListone = []
            var Data1controListtwo = []

            var Data2controListzero = []
            var Data2controListone = []
            var Data2controListtwo = []


            for (var i = 0; i < data1.length; i++) {


                if (data1[i]["label"] == 0) {
                    Data1controListzero.push(data1[i][subfeatures])

                }
                if (data1[i]["label"] == 1) {
                    Data1controListone.push(data1[i][subfeatures])


                }
                if (data1[i]["label"] == 2) {
                    Data1controListtwo.push(data1[i][subfeatures])
                }

            }

            for (var i = 0; i < data2.length; i++) {


                if (data2[i]["label"] == 0) {
                    Data1controListzero.push(data2[i][subfeatures])

                }
                if (data2[i]["label"] == 1) {
                    Data2controListone.push(data2[i][subfeatures])


                }
                if (data2[i]["label"] == 2) {
                    Data2controListtwo.push(data2[i][subfeatures])
                }

            }


            var data1Allofvalues = [...Data1controListzero, ...Data1controListone, ...Data1controListtwo]
            var maxAndMinValueFordata1 = [Math.max(...data1Allofvalues), Math.min(...data1Allofvalues)]//[max,min]
            // console.log(maxAndMinValueFordata1)
            var data2Allofvalues = [...Data2controListzero, ...Data2controListone, ...Data2controListtwo]
            var maxAndMinValueFordata2 = [Math.max(...data2Allofvalues), Math.min(...data2Allofvalues)]//[max,min]

//   console.log(data2Allofvalues,data1Allofvalues)


            function getLimitValues(list) {
                var keylist = []

                var rangeValue = list[0] / 5
                rangeValue = Math.ceil(rangeValue)

                //key1,key2,key3,key4,key5

                //key1
                var key1 = "0-" + rangeValue
                var key2 = rangeValue + "-" + 2 * rangeValue
                var key3 = 2 * rangeValue + "-" + 3 * rangeValue
                var key4 = 3 * rangeValue + "-" + 4 * rangeValue
                var key5 = +4 * rangeValue + "-" + 5 * rangeValue

                keylist.push({
                        key: key1,
                        value: rangeValue
                    },
                    {
                        key: key2,
                        value: 2 * rangeValue
                    },
                    {
                        key: key3,
                        value: 3 * rangeValue
                    },
                    {
                        key: key4,
                        value: 4 * rangeValue
                    },
                    {
                        key: key5,
                        value: 5 * rangeValue
                    })
                return keylist
            }

            var limitValuesofdata1 = getLimitValues(maxAndMinValueFordata1)//iki grafik için limit verileri
            // console.log(limitValuesofdata1)
            var limitValuesofdata2 = getLimitValues(maxAndMinValueFordata2)
            //console.log(limitValuesofdata1,limitValuesofdata2)

            //key:[values]//0-62.6:[2,4,45,17,45,60]
            var dictForBuild10 = contrl(Data1controListzero, limitValuesofdata1)
            var dictForBuild11 = contrl(Data1controListone, limitValuesofdata1)
            var dictForBuild12 = contrl(Data1controListtwo, limitValuesofdata1)

            //key:[values]//0-62.6:[2,4,45,17,45,60]
            var dictForBuild20 = contrl(Data1controListzero, limitValuesofdata2)
            var dictForBuild21 = contrl(Data1controListone, limitValuesofdata2)
            var dictForBuild22 = contrl(Data1controListtwo, limitValuesofdata2)


            var buildGraph10 = getDictForgrpah(dictForBuild10)
            var buildGraph11 = getDictForgrpah(dictForBuild11)
            var buildGraph12 = getDictForgrpah(dictForBuild12)

            var buildGraph20 = getDictForgrpah(dictForBuild20)
            var buildGraph21 = getDictForgrpah(dictForBuild21)
            var buildGraph22 = getDictForgrpah(dictForBuild22)


            var length10 = getlengthforgrpah(buildGraph10)
            var length11 = getlengthforgrpah(buildGraph11)
            var length12 = getlengthforgrpah(buildGraph12)

            var length20 = getlengthforgrpah(buildGraph20)
            var length21 = getlengthforgrpah(buildGraph21)
            var length22 = getlengthforgrpah(buildGraph22)


            function getmx(len0, len1, len2, list) {
                var keylist = []
                console.log(keylist)

                var rangeValue = list[0] / 5
                rangeValue = Math.ceil(rangeValue)


                //key1
                var key1 = "0-" + rangeValue
                var key2 = rangeValue + "-" + 2 * rangeValue
                var key3 = 2 * rangeValue + "-" + 3 * rangeValue
                var key4 = 3 * rangeValue + "-" + 4 * rangeValue
                var key5 = +4 * rangeValue + "-" + 5 * rangeValue


                keylist.push({
                        key: key1,
                        value: [len0[key1], len1[key1], len2[key1]]
                    },
                    {
                        key: key2,
                        value: [len0[key2], len1[key2], len2[key2]]
                    },
                    {
                        key: key3,
                        value: [len0[key3], len1[key3], len2[key3]]
                    },
                    {
                        key: key4,
                        value: [len0[key4], len1[key4], len2[key4]]
                    },
                    {
                        key: key5,
                        value: [len0[key5], len1[key5], len2[key5]]
                    },
                )
                return keylist
            }

            function getlengthforgrpah(dict) {
                var newdict = {}
                for (len of Object.keys(dict)) {
                    newdict[len] = dict[len].length
                }

                return newdict
            }


            function getDictForgrpah(data) {
                var addit = {}
                for (var i = 0; i < data.length; i++) {
                    var addkey = data[i].key
                    var addvalue = data[i].value
                    if (Object.hasOwn(addit, addkey)) {
                        addit[addkey].push(addvalue)
                    } else {
                        addit[addkey] = [addvalue,]
                    }
                }
                return addit
            }


//0-10:[1,5,12]
            var x0 = getmx(length10, length11, length12, maxAndMinValueFordata1)
            var y0domainnames = [x0[0].key, x0[1].key, x0[2].key, x0[3].key, x0[4].key]
            var x0values = [
                [x0[0].key, lookinlist(x0[0].value[0]),//ydomain1
                    lookinlist(x0[0].value[1]),
                    lookinlist(x0[0].value[2])],

                [x0[1].key, lookinlist(x0[1].value[0]),//ydomain2
                    lookinlist(x0[1].value[1]),
                    lookinlist(x0[1].value[2])],

                [x0[2].key, lookinlist(x0[2].value[0]),//ydomain3
                    lookinlist(x0[2].value[1]),
                    lookinlist(x0[2].value[2])],

                [x0[3].key, lookinlist(x0[3].value[0]),//ydomain3
                    lookinlist(x0[3].value[1]),
                    lookinlist(x0[3].value[2])],

                [x0[4].key, lookinlist(x0[4].value[0]),//ydomain4
                    lookinlist(x0[4].value[1]),
                    lookinlist(x0[4].value[2])],
            ]

            var x1 = getmx(length20, length21, length22, maxAndMinValueFordata2)
            var y1domainnames = [x1[0].key, x1[1].key, x1[2].key, x1[3].key, x1[4].key]
            var x1values = [[x1[0].key, lookinlist(x1[0].value[0]),//ydomain1
                lookinlist(x1[0].value[1]),
                lookinlist(x1[0].value[2])],

                [x1[1].key, lookinlist(x1[1].value[0]),//ydomain2
                    lookinlist(x1[1].value[1]),
                    lookinlist(x1[1].value[2])],

                [x1[2].key, lookinlist(x1[2].value[0]),//ydomain3
                    lookinlist(x1[2].value[1]),
                    lookinlist(x1[2].value[2])],

                [x1[3].key, lookinlist(x1[3].value[0]),//ydomain3
                    lookinlist(x1[3].value[1]),
                    lookinlist(x1[3].value[2])],

                [x1[4].key, lookinlist(x1[4].value[0]),//ydomain4
                    lookinlist(x1[4].value[1]),
                    lookinlist(x1[4].value[2])],
            ]


            function lookinlist(value) {
                if (value == 1) {
                    value = [5]
                }
                if (value <= 5) {
                    value = [5]//1
                }
                if (value > 5 && value <= 10) {
                    value = [5, 10]//2
                }
                if (value > 10 && value <= 15) {
                    value = [5, 10, 15]//3
                }
                if (value > 15 && value <= 20) {
                    value = [5, 10, 15, 20]//4
                }
                if (value > 20 && value <= 25) {
                    value = [5, 10, 15, 20, 25]//5
                }
                if (value > 25 && value <= 30) {
                    value = [5, 10, 15, 20, 25, 30]//6
                }
                if (value > 30 && value <= 35) {
                    value = [5, 10, 15, 20, 25, 30, 35]//7
                }
                if (value > 35 && value <= 40) {
                    value = [5, 10, 15, 20, 25, 30, 35, 40]//8
                }
                if (value > 40 && value <= 45) {
                    value = [5, 10, 15, 20, 25, 30, 35, 40, 45]//9
                }
                if (value > 45 && value <= 50) {
                    value = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]//10
                }
                if (value > 50) {
                    value = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
                }
                if (value == undefined) {
                    value = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
                }
                return value

            }


            const data0 = [x0values[0], x0values[1], x0values[2], x0values[3], x0values[4]];
            const data11 = [x1values[0], x1values[1], x1values[2], x1values[3], x1values[4]];

            // var liste11=[...]
            // Append a circle

            // Add Y axis
// var y = d3.scaleBand()
// .range([ height, 0 ])
//     .domain(y0domainnames)
//     .padding(0.05);
// svg0.append("g")
//     .style("font-size", 15)
// svg0.append("g")
//     .call(d3.axisLeft(y));


//            // Add X axis
// var x = d3.scaleLinear()
//     .domain([0, 50])
//     .range([ 0, width]);
// svg0.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x))
//     .selectAll("text")
//     .attr("transform", "translate(-10,0)rotate(-45)")
//     .style("text-anchor", "end");


            var y = d3.scaleBand()
                .range([height, 0])
                .domain(y1domainnames)
                .padding(0.05);
            svg1.append("g")
                .style("font-size", 15)
            svg1.append("g")
                .call(d3.axisLeft(y));


            // Add X axis
            var x = d3.scaleLinear()
                .domain([0, 50])
                .range([0, width]);
            svg1.append("g")
                .attr("transform", "translate(0," + height + ")")
                // .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");


            const maxCheckvalue0 = [
                data0[0][1], data0[0][2], data0[0][3],
                data0[1][1], data0[1][2], data0[1][3],
                data0[2][1], data0[2][2], data0[2][3],
                data0[3][1], data0[3][2], data0[3][3],
                data0[4][1], data0[4][2], data0[4][3]]

            const maxCheckvalue1 = [
                data11[0][1], data11[0][2], data11[0][3],
                data11[1][1], data11[1][2], data11[1][3],
                data11[2][1], data11[2][2], data11[2][3],
                data11[3][1], data11[3][2], data11[3][3],
                data11[4][1], data11[4][2], data11[4][3]]

            console.log(maxCheckvalue1)

            let maxVl0 = Math.max(...maxCheckvalue0)
            let maxVl1 = Math.max(...maxCheckvalue1)

            function f(array) {
                for (let i = 0; i < array[1].length; i++) {
                    return array[1][i]
                }

            }


            let newDatazerozero = []
            let newDatazeroone = []
            let newDatazerotwo = []

            for (i of data0) {
                for (val of i[1]) {
                    newDatazerozero.push({
                        key: i[0],
                        value: val
                    })

                }

            }
            for (i of data0) {
                for (val of i[2]) {
                    newDatazeroone.push({
                        key: i[0],
                        value: val
                    })

                }

            }
            for (i of data0) {
                for (val of i[3]) {
                    newDatazerotwo.push({
                        key: i[0],
                        value: val
                    })

                }

            }

            let newDatazero = []
            let newDataone = []
            let newDatatwo = []

            for (i of data11) {
                for (val of i[1]) {
                    newDatazero.push({
                        key: i[0],
                        value: val
                    })

                }

            }
            for (i of data11) {
                for (val of i[2]) {
                    newDataone.push({
                        key: i[0],
                        value: val
                    })

                }

            }
            for (i of data11) {
                for (val of i[3]) {
                    newDatatwo.push({
                        key: i[0],
                        value: val
                    })

                }

            }


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
            var tooltip1 = d3.select("#figure1")
                .append("div")
                .style("position", "absolute")
                .style("visibility", "hidden")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "1px")
                .style("border-radius", "5px")
                .style("padding", "10px")
                .html("");

//     var tooltip2 = d3.select("#figure1")
// .append("div")
//     .style("position", "absolute")
//     .style("visibility", "hidden")
//     .style("background-color", "white")
//     .style("border", "solid")
//     .style("border-width", "1px")
//     .style("border-radius", "5px")
//     .style("padding", "10px")
//     .html("<p>I'm a tooltip written in HTML</p><img src='https://github.com/holtzy/D3-graph-gallery/blob/master/img/section/ArcSmal.png?raw=true'></img><br>Fancy<br><span style='font-size: 40px;'>Isn't it?</span>");


            console.log(newDatazerozero, newDatazeroone, newDatazerotwo)
            console.log(newDatazero, newDataone, newDatatwo)//

// svg0.selectAll("mycircle")
// .data(newDatazero)
// .enter()
// .append("circle")

//     .attr("cx", function(d) {return x(d.value)})
//     .attr("cy", function(d) {console.log(d.key); return y(d.key+10) })
//     .attr("r", "8")
//     .style("fill", "blue")
//     .attr("stroke", "black")
//     .on("mouseover", function(d){return tooltip1.style("visibility", "visible");})
//     .on("mousemove", function(d){return (tooltip1.html("Scene:2"+"<br>"+"Class:HC"+"<br>Range:"+d.path[0]["__data__"].key+"<br> Value:"+d.path[0]["__data__"].value)).style("top", (event.pageY+650)+"px").style("left",(event.pageX-180)+"px");})
//     .on("mouseout", function(d){return tooltip1.style("visibility", "hidden");})


// svg0.selectAll("circle456")
// .data(newDatazeroone)
// .enter()
// .append("circle")
// .on("mouseover", function(d){return tooltip2.style("visibility", "visible");})
//     .on("mousemove", function(d){return (tooltip2.html("Scene:2"+"<br>"+"Class:SZ"+"<br>Range:"+d.path[0]["__data__"].key+"<br> Value:"+d.path[0]["__data__"].value)).style("top", (event.pageY+650)+"px").style("left",(event.pageX-180)+"px");})
//     .on("mouseout", function(d){return tooltip2.style("visibility", "hidden");})

//     .attr("cx", function(d) { return x(d.value);})
//     .attr("cy", function(d) {console.log(d);  return y(d.key);})
//     .attr("r", "8")
//     .style("fill", "green")
//     .attr("stroke", "black")


// svg0.selectAll("mycircle")
// .data(newDatazerotwo)
// .enter()
// .append("circle")
// .on("mouseover", function(d){return tooltip2.style("visibility", "visible");})
//     .on("mousemove", function(d){return (tooltip2.html("Scene:2"+"<br>"+"Class:BD"+"<br>Range:"+d.path[0]["__data__"].key+"<br> Value:"+d.path[0]["__data__"].value)).style("top", (event.pageY+650)+"px").style("left",(event.pageX-180)+"px");})
//     .on("mouseout", function(d){return tooltip2.style("visibility", "hidden");})

//     .attr("cx", function(d) { return x(d.value); })
//     .attr("cy", function(d) {console.log(d); return y(d.key); })
//     .attr("r", "8")
//     .style("fill", "orange")
//     .attr("stroke", "black")


            svg1.selectAll("mycircle")
                .data(newDatazero)
                .enter()
                .append("path")
                .attr("transform",
                    function (d) {
                        return "translate(" + x(d.value) + " " + (y(d.key) + 10) + ") scale(0.05 0.05)"
                    })
                .attr("d", "M234.936 122.235v-19.323c6.912 4.117 13.834 6.185 20.726 6.185 7.588 0 14.818-2.058 21.391-6.185l0.358 19.323h66.263l43.837 186.757h-32.44l-33.843-142.582-19.682 103.219 42.117 223.365h-43.479l-44.185-183.664-43.479 183.664h-43.868l45.23-223.365-22.446-103.557-33.485 142.919h-33.475l44.165-186.757h66.294zM256 108.431c12.421 0 22.784-4.495 31.406-13.118 9.001-8.981 13.118-19.344 13.118-31.785 0-29.675-14.817-44.523-44.524-44.523-12.421 0-22.784 4.465-31.774 13.476-8.632 8.94-13.097 19.323-13.097 31.038 0 12.8 4.475 23.184 13.456 31.785 8.632 8.622 19.323 13.127 31.416 13.127z")

                .style("fill", "#d95f02")
                .attr("stroke", "black")
                .on("mouseover", function (d) {
                    return tooltip2.style("visibility", "visible");
                })
                .on("mousemove", function (d) {
                    return (tooltip2.html("Scene:1" + "<br>" + "Subfeature: " + subfeatur + "<br>Range:" + d.path[0]["__data__"].key + "<br> Value:" + d.path[0]["__data__"].value)).style("top", (event.pageY + 650) + "px").style("left", (event.pageX - 180) + "px");
                })
                .on("mouseout", function (d) {
                    return tooltip2.style("visibility", "hidden");
                })


            svg1.selectAll("circle456")
                .data(newDataone)
                .enter()
                .append("path")
                .attr("transform",
                    function (d) {
                        return "translate(" + x(d.value) + " " + (y(d.key) + 30) + ") scale(0.05 0.05)"
                    })
                .attr("d", "M234.936 122.235v-19.323c6.912 4.117 13.834 6.185 20.726 6.185 7.588 0 14.818-2.058 21.391-6.185l0.358 19.323h66.263l43.837 186.757h-32.44l-33.843-142.582-19.682 103.219 42.117 223.365h-43.479l-44.185-183.664-43.479 183.664h-43.868l45.23-223.365-22.446-103.557-33.485 142.919h-33.475l44.165-186.757h66.294zM256 108.431c12.421 0 22.784-4.495 31.406-13.118 9.001-8.981 13.118-19.344 13.118-31.785 0-29.675-14.817-44.523-44.524-44.523-12.421 0-22.784 4.465-31.774 13.476-8.632 8.94-13.097 19.323-13.097 31.038 0 12.8 4.475 23.184 13.456 31.785 8.632 8.622 19.323 13.127 31.416 13.127z")

                .style("fill", "#7570b3")
                .attr("stroke", "black")
                .on("mouseover", function (d) {
                    return tooltip2.style("visibility", "visible");
                })
                .on("mousemove", function (d) {
                    return (tooltip2.html("Scene:1" + "<br>" + "Subfeature: " + subfeatur + "<br>Range:" + d.path[0]["__data__"].key + "<br> Value:" + d.path[0]["__data__"].value)).style("top", (event.pageY + 650) + "px").style("left", (event.pageX - 180) + "px");
                })
                .on("mouseout", function (d) {
                    return tooltip2.style("visibility", "hidden");
                })


            svg1.selectAll("mycircle")
                .data(newDatatwo)
                .enter()
                .append("path")
                .attr("transform",
                    function (d) {
                        return "translate(" + x(d.value) + " " + (y(d.key) + 50) + ") scale(0.05 0.05)"
                    })
                .attr("d", "M234.936 122.235v-19.323c6.912 4.117 13.834 6.185 20.726 6.185 7.588 0 14.818-2.058 21.391-6.185l0.358 19.323h66.263l43.837 186.757h-32.44l-33.843-142.582-19.682 103.219 42.117 223.365h-43.479l-44.185-183.664-43.479 183.664h-43.868l45.23-223.365-22.446-103.557-33.485 142.919h-33.475l44.165-186.757h66.294zM256 108.431c12.421 0 22.784-4.495 31.406-13.118 9.001-8.981 13.118-19.344 13.118-31.785 0-29.675-14.817-44.523-44.524-44.523-12.421 0-22.784 4.465-31.774 13.476-8.632 8.94-13.097 19.323-13.097 31.038 0 12.8 4.475 23.184 13.456 31.785 8.632 8.622 19.323 13.127 31.416 13.127z")

                .style("fill", "#1b9e77")
                .attr("stroke", "black")
                .on("mouseover", function (d) {
                    return tooltip2.style("visibility", "visible");
                })
                .on("mousemove", function (d) {
                    return (tooltip2.html("Scene:1" + "<br>" + "Subfeature: " + subfeatur + "<br>Range:" + d.path[0]["__data__"].key + "<br> Value:" + d.path[0]["__data__"].value)).style("top", (event.pageY + 650) + "px").style("left", (event.pageX - 180) + "px");
                })
                .on("mouseout", function (d) {
                    return tooltip2.style("visibility", "hidden");
                })


        })
    })
    var chartData = [
        {name: "Scene1 - " + subfeatur, color: NaN}
    ];
    var legendItemSize = 12;
    // console.log("hello7")
    var legendSpacing = 4;
    var xOffset = 0;
    var yOffset = 0;
    var legend = d3
        .select("#figure2")
        .append('svg')
        .attr('style', 'position:absolute;z-index: -99999;top: -13px;left: 200px;')

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
    var chartData = [
        // {name:subfeatur,color:NaN},
        // {name:"Scene1",color:NaN},
        {name: "HC", color: "#d95f02"},
        {name: "BD", color: "#1b9e77"},
        {name: "SZ", color: "#7570b3"}


    ];
    var legendItemSize = 12;
    // console.log("hello7")
    var legendSpacing = 4;
    var xOffset = 0;
    var yOffset = 0;
    var legend = d3
        .select("#figure2")
        .append('svg')
        .attr('style', 'position:absolute;z-index: -99999;top: -30px;left: 145px;')
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
}

function fuc1(subfeatur) {
    // document.querySelector("#figure1").style.backgroundColor="#bdbdbd"
    document.getElementById("figure1").innerHTML = ""

// document.getElementById("figure1").innerHTML=" "


// set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 120},
        width = 400 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page
// var svg0 = d3.select("#figure1")
// .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
// .append("g")
//     .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");

    var svg1 = d3.select("#figure1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


//         var svg2 = d3.select("#figure2")
// .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
// .append("g")
//     .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");


    d3.csv("dosyalar/all_features_300_scene_1_complete.csv").then(function (data2) {

        d3.csv("dosyalar/all_features_300_scene_2_complete.csv").then(function (data1) {


            var subfeatures = subfeatur


            var Data1controListzero = []
            var Data1controListone = []
            var Data1controListtwo = []

            var Data2controListzero = []
            var Data2controListone = []
            var Data2controListtwo = []


            for (var i = 0; i < data1.length; i++) {


                if (data1[i]["label"] == 0) {
                    Data1controListzero.push(data1[i][subfeatures])

                }
                if (data1[i]["label"] == 1) {
                    Data1controListone.push(data1[i][subfeatures])


                }
                if (data1[i]["label"] == 2) {
                    Data1controListtwo.push(data1[i][subfeatures])
                }

            }

            for (var i = 0; i < data2.length; i++) {


                if (data2[i]["label"] == 0) {
                    Data1controListzero.push(data2[i][subfeatures])

                }
                if (data2[i]["label"] == 1) {
                    Data2controListone.push(data2[i][subfeatures])


                }
                if (data2[i]["label"] == 2) {
                    Data2controListtwo.push(data2[i][subfeatures])
                }

            }


            var data1Allofvalues = [...Data1controListzero, ...Data1controListone, ...Data1controListtwo]
            var maxAndMinValueFordata1 = [Math.max(...data1Allofvalues), Math.min(...data1Allofvalues)]//[max,min]
            // console.log(maxAndMinValueFordata1)
            var data2Allofvalues = [...Data2controListzero, ...Data2controListone, ...Data2controListtwo]
            var maxAndMinValueFordata2 = [Math.max(...data2Allofvalues), Math.min(...data2Allofvalues)]//[max,min]

//   console.log(data2Allofvalues,data1Allofvalues)


            function getLimitValues(list) {
                var keylist = []

                var rangeValue = list[0] / 5
                rangeValue = Math.ceil(rangeValue)


                //key1,key2,key3,key4,key5

                //key1
                var key1 = "0-" + rangeValue
                var key2 = rangeValue + "-" + 2 * rangeValue
                var key3 = 2 * rangeValue + "-" + 3 * rangeValue
                var key4 = 3 * rangeValue + "-" + 4 * rangeValue
                var key5 = +4 * rangeValue + "-" + 5 * rangeValue

                keylist.push({
                        key: key1,
                        value: rangeValue
                    },
                    {
                        key: key2,
                        value: 2 * rangeValue
                    },
                    {
                        key: key3,
                        value: 3 * rangeValue
                    },
                    {
                        key: key4,
                        value: 4 * rangeValue
                    },
                    {
                        key: key5,
                        value: 5 * rangeValue
                    })
                return keylist
            }

            var limitValuesofdata1 = getLimitValues(maxAndMinValueFordata1)//iki grafik için limit verileri
            // console.log(limitValuesofdata1)
            var limitValuesofdata2 = getLimitValues(maxAndMinValueFordata2)
            //console.log(limitValuesofdata1,limitValuesofdata2)

            //key:[values]//0-62.6:[2,4,45,17,45,60]
            var dictForBuild10 = contrl(Data1controListzero, limitValuesofdata1)
            var dictForBuild11 = contrl(Data1controListone, limitValuesofdata1)
            var dictForBuild12 = contrl(Data1controListtwo, limitValuesofdata1)

            //key:[values]//0-62.6:[2,4,45,17,45,60]
            var dictForBuild20 = contrl(Data1controListzero, limitValuesofdata2)
            var dictForBuild21 = contrl(Data1controListone, limitValuesofdata2)
            var dictForBuild22 = contrl(Data1controListtwo, limitValuesofdata2)


            var buildGraph10 = getDictForgrpah(dictForBuild10)
            var buildGraph11 = getDictForgrpah(dictForBuild11)
            var buildGraph12 = getDictForgrpah(dictForBuild12)

            var buildGraph20 = getDictForgrpah(dictForBuild20)
            var buildGraph21 = getDictForgrpah(dictForBuild21)
            var buildGraph22 = getDictForgrpah(dictForBuild22)


            var length10 = getlengthforgrpah(buildGraph10)
            var length11 = getlengthforgrpah(buildGraph11)
            var length12 = getlengthforgrpah(buildGraph12)

            var length20 = getlengthforgrpah(buildGraph20)
            var length21 = getlengthforgrpah(buildGraph21)
            var length22 = getlengthforgrpah(buildGraph22)


            function getmx(len0, len1, len2, list) {
                var keylist = []

                var rangeValue = list[0] / 5
                rangeValue = Math.ceil(rangeValue)


                //key1
                var key1 = "0-" + rangeValue
                var key2 = rangeValue + "-" + 2 * rangeValue
                var key3 = 2 * rangeValue + "-" + 3 * rangeValue
                var key4 = 3 * rangeValue + "-" + 4 * rangeValue
                var key5 = +4 * rangeValue + "-" + 5 * rangeValue


                keylist.push({
                        key: key1,
                        value: [len0[key1], len1[key1], len2[key1]]
                    },
                    {
                        key: key2,
                        value: [len0[key2], len1[key2], len2[key2]]
                    },
                    {
                        key: key3,
                        value: [len0[key3], len1[key3], len2[key3]]
                    },
                    {
                        key: key4,
                        value: [len0[key4], len1[key4], len2[key4]]
                    },
                    {
                        key: key5,
                        value: [len0[key5], len1[key5], len2[key5]]
                    },
                )
                return keylist
            }

            function getlengthforgrpah(dict) {
                var newdict = {}
                for (len of Object.keys(dict)) {
                    newdict[len] = dict[len].length
                }

                return newdict
            }


            function getDictForgrpah(data) {
                var addit = {}
                for (var i = 0; i < data.length; i++) {
                    var addkey = data[i].key
                    var addvalue = data[i].value
                    if (Object.hasOwn(addit, addkey)) {
                        addit[addkey].push(addvalue)
                    } else {
                        addit[addkey] = [addvalue,]
                    }
                }
                return addit
            }


//0-10:[1,5,12]
            var x0 = getmx(length10, length11, length12, maxAndMinValueFordata1)
            var y0domainnames = [x0[0].key, x0[1].key, x0[2].key, x0[3].key, x0[4].key]
            var x0values = [
                [x0[0].key, lookinlist(x0[0].value[0]),//ydomain1
                    lookinlist(x0[0].value[1]),
                    lookinlist(x0[0].value[2])],

                [x0[1].key, lookinlist(x0[1].value[0]),//ydomain2
                    lookinlist(x0[1].value[1]),
                    lookinlist(x0[1].value[2])],

                [x0[2].key, lookinlist(x0[2].value[0]),//ydomain3
                    lookinlist(x0[2].value[1]),
                    lookinlist(x0[2].value[2])],

                [x0[3].key, lookinlist(x0[3].value[0]),//ydomain3
                    lookinlist(x0[3].value[1]),
                    lookinlist(x0[3].value[2])],

                [x0[4].key, lookinlist(x0[4].value[0]),//ydomain4
                    lookinlist(x0[4].value[1]),
                    lookinlist(x0[4].value[2])],
            ]

            var x1 = getmx(length20, length21, length22, maxAndMinValueFordata2)
            var y1domainnames = [x1[0].key, x1[1].key, x1[2].key, x1[3].key, x1[4].key]
            var x1values = [[x1[0].key, lookinlist(x1[0].value[0]),//ydomain1
                lookinlist(x1[0].value[1]),
                lookinlist(x1[0].value[2])],

                [x1[1].key, lookinlist(x1[1].value[0]),//ydomain2
                    lookinlist(x1[1].value[1]),
                    lookinlist(x1[1].value[2])],

                [x1[2].key, lookinlist(x1[2].value[0]),//ydomain3
                    lookinlist(x1[2].value[1]),
                    lookinlist(x1[2].value[2])],

                [x1[3].key, lookinlist(x1[3].value[0]),//ydomain3
                    lookinlist(x1[3].value[1]),
                    lookinlist(x1[3].value[2])],

                [x1[4].key, lookinlist(x1[4].value[0]),//ydomain4
                    lookinlist(x1[4].value[1]),
                    lookinlist(x1[4].value[2])],
            ]


            function lookinlist(value) {
                if (value <= 5) {
                    value = [5]//1
                }
                if (value > 5 && value <= 10) {
                    value = [5, 10]//2
                }
                if (value > 10 && value <= 15) {
                    value = [5, 10, 15]//3
                }
                if (value > 15 && value <= 20) {
                    value = [5, 10, 15, 20]//4
                }
                if (value > 20 && value <= 25) {
                    value = [5, 10, 15, 20, 25]//5
                }
                if (value > 25 && value <= 30) {
                    value = [5, 10, 15, 20, 25, 30]//6
                }
                if (value > 30 && value <= 35) {
                    value = [5, 10, 15, 20, 25, 30, 35]//7
                }
                if (value > 35 && value <= 40) {
                    value = [5, 10, 15, 20, 25, 30, 35, 40]//8
                }
                if (value > 40 && value <= 45) {
                    value = [5, 10, 15, 20, 25, 30, 35, 40, 45]//9
                }
                if (value > 45 && value <= 50) {
                    value = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]//10
                }
                if (value > 50) {
                    value = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
                }
                if (value == undefined) {
                    value = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
                }
                return value

            }


            const data0 = [x0values[0], x0values[1], x0values[2], x0values[3], x0values[4]];
            const data11 = [x1values[0], x1values[1], x1values[2], x1values[3], x1values[4]];

            // var liste11=[...]
            // Append a circle

            // Add Y axis
// var y = d3.scaleBand()
// .range([ height, 0 ])
//     .domain(y0domainnames)
//     .padding(0.05);
// svg0.append("g")
//     .style("font-size", 15)
// svg0.append("g")
//     .call(d3.axisLeft(y));


//            // Add X axis
// var x = d3.scaleLinear()
//     .domain([0, 50])
//     .range([ 0, width]);
// svg0.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x))
//     .selectAll("text")
//     .attr("transform", "translate(-10,0)rotate(-45)")
//     .style("text-anchor", "end");


            var y = d3.scaleBand()
                .range([height, 0])
                .domain(y1domainnames)
                .padding(0.05);
            svg1.append("g")
                .style("font-size", 15)
            svg1.append("g")
                .call(d3.axisLeft(y));


            // Add X axis
            var x = d3.scaleLinear()
                .domain([0, 50])
                .range([0, width]);
            svg1.append("g")
                .attr("transform", "translate(0," + height + ")")
                // .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");


            const maxCheckvalue0 = [
                data0[0][1], data0[0][2], data0[0][3],
                data0[1][1], data0[1][2], data0[1][3],
                data0[2][1], data0[2][2], data0[2][3],
                data0[3][1], data0[3][2], data0[3][3],
                data0[4][1], data0[4][2], data0[4][3]]

            const maxCheckvalue1 = [
                data11[0][1], data11[0][2], data11[0][3],
                data11[1][1], data11[1][2], data11[1][3],
                data11[2][1], data11[2][2], data11[2][3],
                data11[3][1], data11[3][2], data11[3][3],
                data11[4][1], data11[4][2], data11[4][3]]

            console.log(maxCheckvalue1)

            let maxVl0 = Math.max(...maxCheckvalue0)
            let maxVl1 = Math.max(...maxCheckvalue1)

            function f(array) {
                for (let i = 0; i < array[1].length; i++) {
                    return array[1][i]
                }

            }


            let newDatazerozero = []
            let newDatazeroone = []
            let newDatazerotwo = []

            for (i of data0) {
                for (val of i[1]) {
                    newDatazerozero.push({
                        key: i[0],
                        value: val
                    })

                }

            }
            for (i of data0) {
                for (val of i[2]) {
                    newDatazeroone.push({
                        key: i[0],
                        value: val
                    })

                }

            }
            for (i of data0) {
                for (val of i[3]) {
                    newDatazerotwo.push({
                        key: i[0],
                        value: val
                    })

                }

            }

            let newDatazero = []
            let newDataone = []
            let newDatatwo = []

            for (i of data11) {
                for (val of i[1]) {
                    newDatazero.push({
                        key: i[0],
                        value: val
                    })

                }

            }
            for (i of data11) {
                for (val of i[2]) {
                    newDataone.push({
                        key: i[0],
                        value: val
                    })

                }

            }
            for (i of data11) {
                for (val of i[3]) {
                    newDatatwo.push({
                        key: i[0],
                        value: val
                    })

                }

            }


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

//     var tooltip2 = d3.select("#figure1")
// .append("div")
//     .style("position", "absolute")
//     .style("visibility", "hidden")
//     .style("background-color", "white")
//     .style("border", "solid")
//     .style("border-width", "1px")
//     .style("border-radius", "5px")
//     .style("padding", "10px")
//     .html("<p>I'm a tooltip written in HTML</p><img src='https://github.com/holtzy/D3-graph-gallery/blob/master/img/section/ArcSmal.png?raw=true'></img><br>Fancy<br><span style='font-size: 40px;'>Isn't it?</span>");


            console.log(newDatazerozero, newDatazeroone, newDatazerotwo)
            console.log(newDatazero, newDataone, newDatatwo)//

// svg0.selectAll("mycircle")
// .data(newDatazero)
// .enter()
// .append("circle")

//     .attr("cx", function(d) {return x(d.value)})
//     .attr("cy", function(d) {console.log(d.key); return y(d.key+10) })
//     .attr("r", "8")
//     .style("fill", "blue")
//     .attr("stroke", "black")
//     .on("mouseover", function(d){return tooltip1.style("visibility", "visible");})
//     .on("mousemove", function(d){return (tooltip1.html("Scene:2"+"<br>"+"Class:HC"+"<br>Range:"+d.path[0]["__data__"].key+"<br> Value:"+d.path[0]["__data__"].value)).style("top", (event.pageY+650)+"px").style("left",(event.pageX-180)+"px");})
//     .on("mouseout", function(d){return tooltip1.style("visibility", "hidden");})


// svg0.selectAll("circle456")
// .data(newDatazeroone)
// .enter()
// .append("circle")
// .on("mouseover", function(d){return tooltip2.style("visibility", "visible");})
//     .on("mousemove", function(d){return (tooltip2.html("Scene:2"+"<br>"+"Class:SZ"+"<br>Range:"+d.path[0]["__data__"].key+"<br> Value:"+d.path[0]["__data__"].value)).style("top", (event.pageY+650)+"px").style("left",(event.pageX-180)+"px");})
//     .on("mouseout", function(d){return tooltip2.style("visibility", "hidden");})

//     .attr("cx", function(d) { return x(d.value);})
//     .attr("cy", function(d) {console.log(d);  return y(d.key);})
//     .attr("r", "8")
//     .style("fill", "green")
//     .attr("stroke", "black")


// svg0.selectAll("mycircle")
// .data(newDatazerotwo)
// .enter()
// .append("circle")
// .on("mouseover", function(d){return tooltip2.style("visibility", "visible");})
//     .on("mousemove", function(d){return (tooltip2.html("Scene:2"+"<br>"+"Class:BD"+"<br>Range:"+d.path[0]["__data__"].key+"<br> Value:"+d.path[0]["__data__"].value)).style("top", (event.pageY+650)+"px").style("left",(event.pageX-180)+"px");})
//     .on("mouseout", function(d){return tooltip2.style("visibility", "hidden");})

//     .attr("cx", function(d) { return x(d.value); })
//     .attr("cy", function(d) {console.log(d); return y(d.key); })
//     .attr("r", "8")
//     .style("fill", "orange")
//     .attr("stroke", "black")


            svg1.selectAll("mycircle")
                .data(newDatazero)
                .enter()
                .append("path")
                .attr("transform",
                    function (d) {
                        return "translate(" + x(d.value) + " " + (y(d.key) + 10) + ") scale(0.05 0.05)"
                    })
                .attr("d", "M234.936 122.235v-19.323c6.912 4.117 13.834 6.185 20.726 6.185 7.588 0 14.818-2.058 21.391-6.185l0.358 19.323h66.263l43.837 186.757h-32.44l-33.843-142.582-19.682 103.219 42.117 223.365h-43.479l-44.185-183.664-43.479 183.664h-43.868l45.23-223.365-22.446-103.557-33.485 142.919h-33.475l44.165-186.757h66.294zM256 108.431c12.421 0 22.784-4.495 31.406-13.118 9.001-8.981 13.118-19.344 13.118-31.785 0-29.675-14.817-44.523-44.524-44.523-12.421 0-22.784 4.465-31.774 13.476-8.632 8.94-13.097 19.323-13.097 31.038 0 12.8 4.475 23.184 13.456 31.785 8.632 8.622 19.323 13.127 31.416 13.127z")

                .style("fill", "#d95f02")
                .attr("stroke", "black")
                .on("mouseover", function (d) {
                    return tooltip2.style("visibility", "visible");
                })
                .on("mousemove", function (d) {
                    return (tooltip2.html("Scene:2" + "<br>" + "Subfeature: " + subfeatur + "<br>Range:" + d.path[0]["__data__"].key + "<br> Value:" + d.path[0]["__data__"].value)).style("top", (event.pageY + 650) + "px").style("left", (event.pageX - 180) + "px");
                })
                .on("mouseout", function (d) {
                    return tooltip2.style("visibility", "hidden");
                })


            svg1.selectAll("circle456")
                .data(newDataone)
                .enter()
                .append("path")
                .attr("transform",
                    function (d) {
                        return "translate(" + x(d.value) + " " + (y(d.key) + 30) + ") scale(0.05 0.05)"
                    })
                .attr("d", "M234.936 122.235v-19.323c6.912 4.117 13.834 6.185 20.726 6.185 7.588 0 14.818-2.058 21.391-6.185l0.358 19.323h66.263l43.837 186.757h-32.44l-33.843-142.582-19.682 103.219 42.117 223.365h-43.479l-44.185-183.664-43.479 183.664h-43.868l45.23-223.365-22.446-103.557-33.485 142.919h-33.475l44.165-186.757h66.294zM256 108.431c12.421 0 22.784-4.495 31.406-13.118 9.001-8.981 13.118-19.344 13.118-31.785 0-29.675-14.817-44.523-44.524-44.523-12.421 0-22.784 4.465-31.774 13.476-8.632 8.94-13.097 19.323-13.097 31.038 0 12.8 4.475 23.184 13.456 31.785 8.632 8.622 19.323 13.127 31.416 13.127z")

                .style("fill", "#7570b3")
                .attr("stroke", "black")
                .on("mouseover", function (d) {
                    return tooltip2.style("visibility", "visible");
                })
                .on("mousemove", function (d) {
                    return (tooltip2.html("Scene:2" + "<br>" + "Subfeature: " + subfeatur + "<br>Range:" + d.path[0]["__data__"].key + "<br> Value:" + d.path[0]["__data__"].value)).style("top", (event.pageY + 650) + "px").style("left", (event.pageX - 180) + "px");
                })
                .on("mouseout", function (d) {
                    return tooltip2.style("visibility", "hidden");
                })

// var d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
// {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"   stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> */}
// <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"></circle><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path></svg>

            svg1.selectAll("mycircle")
                .data(newDatatwo)
                .enter()
                .append("path")
                .attr("transform",
                    function (d) {
                        return "translate(" + x(d.value) + " " + (y(d.key) + 50) + ") scale(0.05 0.05)"
                    })
                .attr("d", "M234.936 122.235v-19.323c6.912 4.117 13.834 6.185 20.726 6.185 7.588 0 14.818-2.058 21.391-6.185l0.358 19.323h66.263l43.837 186.757h-32.44l-33.843-142.582-19.682 103.219 42.117 223.365h-43.479l-44.185-183.664-43.479 183.664h-43.868l45.23-223.365-22.446-103.557-33.485 142.919h-33.475l44.165-186.757h66.294zM256 108.431c12.421 0 22.784-4.495 31.406-13.118 9.001-8.981 13.118-19.344 13.118-31.785 0-29.675-14.817-44.523-44.524-44.523-12.421 0-22.784 4.465-31.774 13.476-8.632 8.94-13.097 19.323-13.097 31.038 0 12.8 4.475 23.184 13.456 31.785 8.632 8.622 19.323 13.127 31.416 13.127z")

                .style("fill", "#1b9e77")
                .attr("stroke", "black")
                .on("mouseover", function (d) {
                    return tooltip2.style("visibility", "visible");
                })
                .on("mousemove", function (d) {
                    return (tooltip2.html("Scene:2" + "<br>" + "Subfeature: " + subfeatur + "<br>Range:" + d.path[0]["__data__"].key + "<br> Value:" + d.path[0]["__data__"].value)).style("top", (event.pageY + 650) + "px").style("left", (event.pageX - 180) + "px");
                })
                .on("mouseout", function (d) {
                    return tooltip2.style("visibility", "hidden");
                })


        })
    })

    var chartData = [
        // {name:subfeatur,color:"black"},
        {name: "Scene2 - " + subfeatur, color: NaN}
        // {name:"HC",color:"#d95f02"},
        // {name:"BD",color:"#1b9e77"},
        // {name:"SZ",color:"#7570b3"}


    ];
    var legendItemSize = 12;
    // console.log("hello7")
    var legendSpacing = 4;
    var xOffset = 0;
    var yOffset = 0;
    var legend = d3
        .select("#figure1")
        .append('svg')
        .attr('style', 'position:absolute;z-index: -99999;top: -10px;left: 200px;')
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


    var chartData = [
        // {name:subfeatur,color:"black"},
        {name: "Pictogram Showing The Comparision", color: "red"}

        // {name:"HC",color:"#d95f02"},
        // {name:"BD",color:"#1b9e77"},
        // {name:"SZ",color:"#7570b3"}


    ];
    var legendItemSize = 12;
    // console.log("hello7")
    var legendSpacing = 4;
    var xOffset = 0;
    var yOffset = 0;
    var legend = d3
        .select("#figure1")
        .append('svg')
        .attr('style', 'position:absolute;z-index: -99999;top: -45px;left: 135px;font-weight: bold;')
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
        .attr('x', xOffset + legendItemSize - 5)
        .attr('y', (d, i) => yOffset + (legendItemSize + legendSpacing) * i + 12)
        .text(d => d.name);

    var chartData = [
        // {name:subfeatur,color:"black"},
        {name: "Of cohorts In Both The Sceness", color: "red"}

        // {name:"HC",color:"#d95f02"},
        // {name:"BD",color:"#1b9e77"},
        // {name:"SZ",color:"#7570b3"}


    ];
    var legendItemSize = 12;
    // console.log("hello7")
    var legendSpacing = 4;
    var xOffset = 0;
    var yOffset = 0;
    var legend = d3
        .select("#figure1")
        .append('svg')
        .attr('style', 'position:absolute;z-index: -99999;top: -25px;left: 150px;font-weight: bold;')
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
        .attr('x', xOffset + legendItemSize)
        .attr('y', (d, i) => yOffset + (legendItemSize + legendSpacing) * i + 12)
        .text(d => d.name);

    // drawperson(id)

}

