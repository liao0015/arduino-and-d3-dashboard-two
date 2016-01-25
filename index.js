
//load the data asynchronously from json
d3.json('alcoholdata.json', function(error, data){
    if(error){
        console.error('Error accessing or parsing the JSON file');
        return error;
    }
    //reformat JSON obj into array
    console.log(data);
    
    var rData = [];
    for(var i = 0; i<data.length; i++){
       
        rData.push(data[i].alcohol);
    }
    console.log(rData);
    
    var newData = [];
    for(var j = 0; j<40; j++){
        newData.push(rData[j]);
    }
    console.log(newData);
    
    var n = 40;
    
    var margin = {top: 20, right: 20, bottom: 20, left: 40},
        width = 960-margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.linear()
                .domain([0, n-1])
                .range([0, width]);

    var y = d3.scale.linear()
                .domain([150, 400])
                .range([height, 0]);

    var line = d3.svg.line()
                .x(function(d, i){return x(i);})
                .y(function(d, i){return y(d);});

    var svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate("+margin.left+","+ margin.top+")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + y(160) + ")")
        .call(d3.svg.axis().scale(x).orient("bottom"));

    var path = svg.append("path")
                .datum(newData)
                .attr("class", "line")
                .attr("d", line);
    tick();
    function tick() {
        newData.push(rData[n+1]);
        rData.shift();
        newData.shift();
        
        path.transition()
          .duration(500)
          .ease("linear")
          .attr("d", line)
          .each("end", tick);
    }    
});












                        