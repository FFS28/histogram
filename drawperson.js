function drawpersons(subfeatur) {
    console.log(subfeatur)

    document.getElementById("figure1").innerHTML = " "


    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 120},
        width = 335 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#figure1")
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


            function getLimitValues(list) {
                var keylist = []

                var rangeValue = list[0] / 5
                Math.floor(rangeValue)

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

            var limitValuesofdata1 = getLimitValues(maxAndMinValueFordata1)
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
            var x = getmx(length10, length11, length12, maxAndMinValueFordata1)
            var ydomainnames = [x[0].key, x[1].key, x[2].key, x[3].key, x[4].key]
            var xvalues = [[x[0].key, lookinlist(x[0].value[0]),//ydomain1
                lookinlist(x[0].value[1]),
                lookinlist(x[0].value[2])],

                [x[1].key, lookinlist(x[1].value[0]),//ydomain2
                    lookinlist(x[1].value[1]),
                    lookinlist(x[1].value[2])],

                [x[2].key, lookinlist(x[2].value[0]),//ydomain3
                    lookinlist(x[2].value[1]),
                    lookinlist(x[2].value[2])],

                [x[3].key, lookinlist(x[3].value[0]),//ydomain3
                    lookinlist(x[3].value[1]),
                    lookinlist(x[3].value[2])],

                [x[4].key, lookinlist(x[4].value[0]),//ydomain4
                    lookinlist(x[4].value[1]),
                    lookinlist(x[4].value[2])],
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
                    value = []
                }
                return value

            }


            const data0 = [xvalues[0], xvalues[1], xvalues[2], xvalues[3], xvalues[4]];

            // var liste11=[...]
            // Append a circle


            // Add Y axis
            var y = d3.scaleBand()
                .range([height, 0])
                .domain(ydomainnames)
                .padding(0.05);
            svg.append("g")
                .style("font-size", 15)
            svg.append("g")
                .call(d3.axisLeft(y));


            // Add X axis
            var x = d3.scaleLinear()
                .domain([0, 50])
                .range([0, width]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                // .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");


            // Y axis
            function multidraw(value) {
                let i = 0
                while (i < value) {


                    i = i + 5
                }

            }

            const maxCheckvalue = [
                data0[0][1], data0[0][2], data0[0][3],
                data0[1][1], data0[1][2], data0[1][3],
                data0[2][1], data0[2][2], data0[2][3],
                data0[3][1], data0[3][2], data0[3][3],
                data0[4][1], data0[4][2], data0[4][3]]

            maxCheckvalue.sort

            let maxVl = Math.max(...maxCheckvalue)

            function f(array) {
                for (let i = 0; i < array[1].length; i++) {
                    return array[1][i]
                }

            }

            console.log(f(data0))


            let newData0 = []
            let newData1 = []
            let newData2 = []

            for (i of data0) {
                for (val of i[1]) {
                    newData0.push({
                        key: i[0],
                        value: val
                    })

                }

            }
            for (i of data0) {
                for (val of i[2]) {
                    newData1.push({
                        key: i[0],
                        value: val
                    })

                }

            }
            for (i of data0) {
                for (val of i[3]) {
                    newData2.push({
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
                .html("<p>I'm a tooltip written in HTML</p><img src='https://github.com/holtzy/D3-graph-gallery/blob/master/img/section/ArcSmal.png?raw=true'></img><br>Fancy<br><span style='font-size: 40px;'>Isn't it?</span>");


            svg.selectAll("mycircle")
                .data(newData0)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    return x(d.value)
                })
                .attr("cy", function (d) {
                    return y(d.key) + 10;
                })
                .attr("r", "8")
                .style("fill", "blue")
                .attr("stroke", "black")
                .on("mouseover", function (d) {
                    return tooltip2.style("visibility", "visible");
                })
                .on("mousemove", function (d) {
                    return (tooltip2.html("Scene:2" + "<br>" + "Class:HC" + "<br>Range:" + d.path[0]["__data__"].key + "<br> Value:" + d.path[0]["__data__"].value)).style("top", (event.pageY - 150) + "px").style("left", (event.pageX - 150) + "px");
                })
                .on("mouseout", function (d) {
                    return tooltip2.style("visibility", "hidden");
                })


            svg.selectAll("circle456")
                .data(newData1)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    return x(d.value)
                })
                .attr("cy", function (d) {
                    return y(d.key) + 30;
                })
                .attr("r", "8")
                .style("fill", "green")
                .attr("stroke", "black")
                .on("mouseover", function (d) {
                    return tooltip2.style("visibility", "visible");
                })
                .on("mousemove", function (d) {
                    return (tooltip2.html("Scene:2" + "<br>" + "Class:SZ" + "<br>Range:" + d.path[0]["__data__"].key + "<br> Value:" + d.path[0]["__data__"].value)).style("top", (event.pageY - 150) + "px").style("left", (event.pageX - 150) + "px");
                })
                .on("mouseout", function (d) {
                    return tooltip2.style("visibility", "hidden");
                })


            svg.selectAll("mycircle")
                .data(newData2)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    return x(d.value);
                })
                .attr("cy", function (d) {
                    return y(d.key) + 50;
                })
                .attr("r", "8")
                .style("fill", "orange")
                .attr("stroke", "black")
                .on("mouseover", function (d) {
                    return tooltip2.style("visibility", "visible");
                })
                .on("mousemove", function (d) {
                    return (tooltip2.html("Scene:2" + "<br>" + "Class:BD" + "<br>Range:" + d.path[0]["__data__"].key + "<br> Value:" + d.path[0]["__data__"].value)).style("top", (event.pageY - 150) + "px").style("left", (event.pageX - 150) + "px");
                })
                .on("mouseout", function (d) {
                    return tooltip2.style("visibility", "hidden");
                })


            // svg2.selectAll("mycircle")
            // .data(newData0)
            // .enter()
            // .append("circle")
            //     .attr("cx", function(d) {console.log(d);return x(d.value)})
            //     .attr("cy", function(d) { return y(d.key)+10; })
            //     .attr("r", "8")
            //     .style("fill", "blue")
            //     .attr("stroke", "black")


            // svg2.selectAll("circle456")
            // .data(newData1)
            // .enter()
            // .append("circle")
            //     .attr("cx", function(d) {console.log(d); return x(d.value)})
            //     .attr("cy", function(d) { return y(d.key)+30; })
            //     .attr("r", "8")
            //     .style("fill", "green")
            //     .attr("stroke", "black")


            // svg2.selectAll("mycircle")
            // .data(newData2)
            // .enter()
            // .append("circle")
            //     .attr("cx", function(d) { return x(d.value); })
            //     .attr("cy", function(d) { return y(d.key)+50; })
            //     .attr("r", "8")
            //     .style("fill", "orange")
            //     .attr("stroke", "black")


        })
    })


}


function drawperson2(subfeatur) {
    console.log("2", subfeatur)
    // console.log(document.getElementById("figure1"))


    document.getElementById("figure2").innerHTML = " "


    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 120},
        width = 335 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#figure2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    d3.csv("dosyalar/all_features_300_scene_1_complete.csv").then(function (data2) {

        d3.csv("dosyalar/all_features_300_scene_2_complete.csv").then(function (data1) {

            // var keyList=[...limitValuesofdata1]
            // console.log(keyList)


            var subfeatures = subfeatur


            var Data1controListzero = []
            var Data1controListone = []
            var Data1controListtwo = []

            var Data2controListzero = []
            var Data2controListone = []
            var Data2controListtwo = []


            //add all values for a subfeatures in array
            for (var i = 0; i < data1.length; i++) {
                //console.log(i)

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
                //console.log(i)

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
            // console.log(Data2controListone)


            var data1Allofvalues = [...Data1controListzero, ...Data1controListone, ...Data1controListtwo]
            var maxAndMinValueFordata1 = [Math.max(...data1Allofvalues), Math.min(...data1Allofvalues)]//[max,min]
            // console.log(maxAndMinValueFordata1)
            var data2Allofvalues = [...Data2controListzero, ...Data2controListone, ...Data2controListtwo]
            var maxAndMinValueFordata2 = [Math.max(...data2Allofvalues), Math.min(...data2Allofvalues)]//[max,min]

            // console.log(maxAndMinValueFordata1,maxAndMinValueFordata2)

            // //{
            //     key:"0-100"
            //         value:10
            // // }

            //getYaxislimitvalues
            console.log(Math.floor(3.44555555))


            function getLimitValues(list) {
                var keylist = []


                var rangeValue = Math.floor(list[0] / 5)

                Math.floor(rangeValue)
                // rangeValue=parseInt(String(rangeValue))
                // rangeValue=parseInt(rangeValue)
                console.log(3 * rangeValue)

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

            var limitValuesofdata1 = getLimitValues(maxAndMinValueFordata1)
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

            //   console.log(contrl(Data1controListzero,limitValuesofdata1))//sağlıklı insanların max_time değerleri
            //   console.log(contrl(Data1controListone,limitValuesofdata1))//SZ insanların max_time değerleri
            //   console.log(contrl(Data1controListtwo,limitValuesofdata1))//BD insanların max_time değerleri

            // buildGraph1["0-60"]=[10,22,30]

            var buildGraph10 = getDictForgrpah(dictForBuild10)
            var buildGraph11 = getDictForgrpah(dictForBuild11)
            var buildGraph12 = getDictForgrpah(dictForBuild12)

            var buildGraph20 = getDictForgrpah(dictForBuild20)
            var buildGraph21 = getDictForgrpah(dictForBuild21)
            var buildGraph22 = getDictForgrpah(dictForBuild22)


            // console.log(Object.keys(buildGraph10))

            var length10 = getlengthforgrpah(buildGraph10)
            var length11 = getlengthforgrpah(buildGraph11)
            var length12 = getlengthforgrpah(buildGraph12)

            var length20 = getlengthforgrpah(buildGraph20)
            var length21 = getlengthforgrpah(buildGraph21)
            var length22 = getlengthforgrpah(buildGraph22)


            //   getgrapCircles(length10,length11,length12)

            //     function getgrapCircles(length0,length1,length2){
            //         let grpahlist={}
            //         // for(i of Object.keys(length0)){
            //         //     grpahlist[i]=length0[i]

            //         // }


            //         console.log(grpahlist)

            // //     }

            //     var keys = d3.map(length10, function(d){return d.key;}).keys()
            //     var values = d3.map(length10, function(d){return d.value;}).keys()
            //0-10:[4,14,10]

            // console.log(length10,length11,length12)
            // console.log(getmx(length10,length11,length12,maxAndMinValueFordata1))
            function getmx(len0, len1, len2, list) {
                var keylist = []

                var rangeValue = list[0] / 5

                //key1,key2,key3,key4,key5

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

            //     var x = d3.scaleBand()
            //     .range([ 0, width ])
            //     .domain([10,20,30,40,50])
            //     .padding(0.05);
            // svg.append("g")
            //     .style("font-size", 15)
            //     .attr("transform", "translate(0," + height + ")")
            //     .call(d3.axisBottom(x).tickSize(0))
            //     .select(".domain").remove()

            // // Build Y scales and axis:
            // var y = d3.scaleBand()
            // .range([ height, 0 ])
            //     .domain(Object.keys(buildGraph10))
            //     .padding(0.05);
            // svg.append("g")
            //     .style("font-size", 15)
            // svg.append("g")
            //     .call(d3.axisLeft(y));

            //     console.log(buildGraph10)
            // svg.selectAll("whatever")
            //     .data(buildGraph10)
            //     .enter()
            //     .append("circle")
            //     .attr("r", 40)
            //         .attr("x1", function(d) { console.log(buildGraph10);return x(10); })

            //         .attr("y1", function(d) { return y("0-62.6"); })

            //         .attr("stroke", "grey")


            // Append a circle

            //0-10:[1,5,12]
            var x = getmx(length10, length11, length12, maxAndMinValueFordata1)
            var ydomainnames = [x[0].key, x[1].key, x[2].key, x[3].key, x[4].key]
            var xvalues = [[x[0].key, lookinlist(x[0].value[0]),//ydomain1
                lookinlist(x[0].value[1]),
                lookinlist(x[0].value[2])],

                [x[1].key, lookinlist(x[1].value[0]),//ydomain2
                    lookinlist(x[1].value[1]),
                    lookinlist(x[1].value[2])],

                [x[2].key, lookinlist(x[2].value[0]),//ydomain3
                    lookinlist(x[2].value[1]),
                    lookinlist(x[2].value[2])],

                [x[3].key, lookinlist(x[3].value[0]),//ydomain3
                    lookinlist(x[3].value[1]),
                    lookinlist(x[3].value[2])],

                [x[4].key, lookinlist(x[4].value[0]),//ydomain4
                    lookinlist(x[4].value[1]),
                    lookinlist(x[4].value[2])],
            ]
            // x0=x[0].key
            // x1=x[1].key
            // x2=x[2].key
            // x3=x[3].key
            // x4=x[4].key
            //   var xvalues=[


            //     {x0:
            //     }


            //     }[lookinlist(x[0].value[0]),lookinlist(x[0].value[1]),lookinlist(x[0].value[2])]}
            //       ,

            //       [x[1].key,lookinlist(x[1].value[0]),//ydomain2
            //       lookinlist(x[1].value[1]),
            //       lookinlist(x[1].value[2])],

            //       [x[2].key,lookinlist(x[2].value[0]),//ydomain3
            //                 lookinlist(x[2].value[1]),
            //                 lookinlist(x[2].value[2])],

            //       [x[3].key,lookinlist(x[3].value[0]),//ydomain3
            //               lookinlist(x[3].value[1]),
            //               lookinlist(x[3].value[2])],

            //       [x[4].key,lookinlist(x[4].value[0]),//ydomain4
            //       lookinlist(x[4].value[1]),
            //       lookinlist(x[4].value[2])],
            // ]


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
                    value = []
                }
                return value

            }


            //    function trad5tolast(data){
            //     for(let i=0;i<Object.keys(data);i++){

            //     }


            //    }

            const data0 = [xvalues[0], xvalues[1], xvalues[2], xvalues[3], xvalues[4]];

            // var liste11=[...]
            // Append a circle


            // Add Y axis
            var y = d3.scaleBand()
                .range([height, 0])
                .domain(ydomainnames)
                .padding(0.05);
            svg.append("g")
                .style("font-size", 15)
            svg.append("g")
                .call(d3.axisLeft(y));


            // Add X axis
            var x = d3.scaleLinear()
                .domain([0, 50])
                .range([0, width]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                // .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");


            // Y axis
            function multidraw(value) {
                let i = 0
                while (i < value) {


                    i = i + 5
                }

            }

            const maxCheckvalue = [
                data0[0][1], data0[0][2], data0[0][3],
                data0[1][1], data0[1][2], data0[1][3],
                data0[2][1], data0[2][2], data0[2][3],
                data0[3][1], data0[3][2], data0[3][3],
                data0[4][1], data0[4][2], data0[4][3]]

            maxCheckvalue.sort

            let maxVl = Math.max(...maxCheckvalue)

            function f(array) {
                for (let i = 0; i < array[1].length; i++) {
                    return array[1][i]
                }

            }


            let newData0 = []
            let newData1 = []
            let newData2 = []

            for (i of data0) {
                for (val of i[1]) {
                    console.log(i)
                    newData0.push({
                        key: i[0],
                        value: val
                    })

                }

            }
            for (i of data0) {
                for (val of i[2]) {
                    newData1.push({
                        key: i[0],
                        value: val
                    })

                }

            }
            for (i of data0) {
                for (val of i[3]) {
                    newData2.push({
                        key: i[0],
                        value: val
                    })

                }

            }
            console.log(newData0)

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


            svg.selectAll("mycircle")
                .data(newData0)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    return x(d.value)
                })
                .attr("cy", function (d) {
                    return y(d.key) + 10;
                })
                .attr("r", "8")
                .style("fill", "blue")
                .attr("stroke", "black")
                .on("mouseover", function (d) {
                    return tooltip2.style("visibility", "visible");
                })
                .on("mousemove", function (d) {
                    return (tooltip2.html("Scene:2" + "<br>" + "Class:HC" + "<br>Range:" + d.path[0]["__data__"].key + "<br> Value:" + d.path[0]["__data__"].value)).style("top", (event.pageY - 150) + "px").style("left", (event.pageX - 150) + "px");
                })
                .on("mouseout", function (d) {
                    return tooltip2.style("visibility", "hidden");
                })


            svg.selectAll("circle456")
                .data(newData1)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    return x(d.value)
                })
                .attr("cy", function (d) {
                    return y(d.key) + 30;
                })
                .attr("r", "8")
                .style("fill", "green")
                .attr("stroke", "black")
                .on("mouseover", function (d) {
                    return tooltip2.style("visibility", "visible");
                })
                .on("mousemove", function (d) {
                    return (tooltip2.html("Scene:2" + "<br>" + "Class:SZ" + "<br>Range:" + d.path[0]["__data__"].key + "<br> Value:" + d.path[0]["__data__"].value)).style("top", (event.pageY - 150) + "px").style("left", (event.pageX - 150) + "px");
                })
                .on("mouseout", function (d) {
                    return tooltip2.style("visibility", "hidden");
                })


            svg.selectAll("mycircle")
                .data(newData2)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    return x(d.value);
                })
                .attr("cy", function (d) {
                    return y(d.key) + 50;
                })
                .attr("r", "8")
                .style("fill", "orange")
                .attr("stroke", "black")
                .on("mouseover", function (d) {
                    return tooltip2.style("visibility", "visible");
                })
                .on("mousemove", function (d) {
                    return (tooltip2.html("Scene:2" + "<br>" + "Class:BD" + "<br>Range:" + d.path[0]["__data__"].key + "<br> Value:" + d.path[0]["__data__"].value)).style("top", (event.pageY - 150) + "px").style("left", (event.pageX - 150) + "px");
                })
                .on("mouseout", function (d) {
                    return tooltip2.style("visibility", "hidden");
                })


            // svg2.selectAll("mycircle")
            // .data(newData0)
            // .enter()
            // .append("circle")
            //     .attr("cx", function(d) {console.log(d);return x(d.value)})
            //     .attr("cy", function(d) { return y(d.key)+10; })
            //     .attr("r", "8")
            //     .style("fill", "blue")
            //     .attr("stroke", "black")


            // svg2.selectAll("circle456")
            // .data(newData1)
            // .enter()
            // .append("circle")
            //     .attr("cx", function(d) {console.log(d); return x(d.value)})
            //     .attr("cy", function(d) { return y(d.key)+30; })
            //     .attr("r", "8")
            //     .style("fill", "green")
            //     .attr("stroke", "black")


            // svg2.selectAll("mycircle")
            // .data(newData2)
            // .enter()
            // .append("circle")
            //     .attr("cx", function(d) { return x(d.value); })
            //     .attr("cy", function(d) { return y(d.key)+50; })
            //     .attr("r", "8")
            //     .style("fill", "orange")
            //     .attr("stroke", "black")


        })
    })


}
