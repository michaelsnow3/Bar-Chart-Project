var drawBarChart = function(data, options, element){
  //create bar chart outline located at element parameter
  var barChart = $(element);
  var table = $("<table class='barChart'></table>");
  table.appendTo(barChart);
  //make a variable that will contain an array of the x-values and be used to determine x increment
  var xArray = [];
  //make a variable that will contain the increment the x axis will contain
  var xAxisInc = 1;

  //fill yArray with x values inputed by user
  for(let xValue in data){
    xArray.push(data[xValue]);
  }
  //sort yArray and make a loop to determine if increment should be increased based on array range
  xArray.sort(function(a, b){
    return a - b;
  });
  while(xArray[yArray.length - 1] - xArray[0] > xAxisInc * 5){
    xAxisInc *= 5;
  }
  //make variable that will be displayed on y axis
  let xAxis = xAxisInc;
//create labels and bars for each property givin
  for(let property in data){
    let row = $("<tr></tr>");
    let label = $("<th class='label'>" + property + "</th>");
    let bar = $("<td class='bar'></td>");
    let empty = $("<td class='empty'></td>");

    label.appendTo(row);
    bar.appendTo(row);
    empty.appendTo(row);
    row.appendTo(table);
  }
  //create bottom row that contains value intervals
  let bottomRow = $("<tr><th class='placeholder'></th></tr>");
}


let testData = {"a": 4.8, "b": 2.3, "c": 6.8, "d": 10, "e": 15};
let testOptions = "";
let testElement = "#barChart";
drawBarChart(testData, testOptions, testElement);
