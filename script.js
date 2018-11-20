var drawBarChart = function(data, options, element){
  //create bar chart outline located at element parameter
  var barChart = $(element);
  var table = $("<table class='barChart'></table>");
  table.appendTo(barChart);
  //make a variable that will contain an array of the y-values and be used to determine y increment
  var yArray = [];
  //make a variable that will contain the increment the y axis will contain
  var yAxisInc = 1;

  //fill yArray with y values inputed by user
  for(let yValue in data){
    yArray.push(data[yValue]);
  }
  //sort yArray and make a loop to determine if increment should be increased based on array range
  yArray.sort(function(a, b){
    return a - b;
  });
  while(yArray[yArray.length - 1] - yArray[0] > yAxisInc * 5){
    yAxisInc *= 5;
  }
  //make variable that will be displayed on y axis
  let yAxis = Math.ceil((yArray[yArray.length - 1] / yAxisInc))* yAxisInc;


  //loop through data values to generate cells for each bar
  while(yAxis > 0){
    let newRow = $("<tr></tr>");
    newRow.appendTo(table);
    let yLabel = $("<th class='yLabels'>" + yAxis + "</th>");
    yLabel.appendTo(newRow);
    yAxis -= yAxisInc;
    //make a loop to fill out table cells for each data catagory
    for(let property in data){
      let cell = $("<th class='data'</th>");
      cell.appendTo(newRow);
    }
  }
   //create a table row that will contain the labes of the bar chart
  let labelRow = $("<tr></tr>");
  labelRow.appendTo(table);

  //make an empty cell in label row to hold place under y axis values
  labelRow.append("<th id='placeholder'></th>");

  //loop through data values and display label names on x axis
  for(let property in data){
    let xLabel = $("<th class='label'>" + property + "</th>");
    xLabel.appendTo(labelRow);
  }
}


let testData = {"a": 1, "b": 2, "c": 3, "d": 4, "e": 5};
let testOptions = "";
let testElement = "#barChart";
drawBarChart(testData, testOptions, testElement);
