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
  while(xArray[xArray.length - 1] - xArray[0] > xAxisInc * 5){
    xAxisInc *= 5;
  }
  //make variable that will be displayed on y axis
  let xAxis = xAxisInc;

  //make a variable containing max domain value
  let xMax = xAxisInc;
  while(xMax < xArray[xArray.length - 1]){
    xMax += xAxisInc;
  }

  //create labels and bars for each property givin
  for(let property in data){
    //make variable to keep track of bar width
    let widthPercent = (data[property] / xMax) * 100;
    console.log(widthPercent);

    //make variables for html table tags
    let subTable = $("<table class='subTable'></table>");
    let row = $("<tr></tr>");
    let label = $("<th class='label'><p class='test'>" + property + "</p></th>");
    let bar = $(`<td style="width: ${widthPercent}%;" class='bar'></td>`);
    let empty = $(`<td style="width: ${100 - widthPercent}%;"></td>`);
    let tableRow = $("<tr></tr>");
    let tableCell = $("<td class='dataCell'></td>");

    label.appendTo(row);
    bar.appendTo(row);
    empty.appendTo(row);
    row.appendTo(subTable);
    subTable.appendTo(tableCell);
    tableCell.appendTo(tableRow);
    tableRow.appendTo(table);
  }
//create bottom row that contains value intervals
  // let bottomRow = $("<tr><th class='placeholder'></th></tr>");
  // while(xAxis < xArray[xArray.length - 1]){
  //   let bottomTable = $("<table><tr><td></td></tr></table>");
  //   let cell = $("<td class='xAxis'>" + xAxis + "</td>");
  //   xAxis += xAxisInc;
  //   cell.appendTo(bottomRow);
  // }
  // bottomRow.appendTo(table);
}


let testData = {"hello": 3, "asdf": 5, "qdsafreasdfsadfsdaqrerqwerwqee": 9, "d": 1, "e": 10};
let testOptions = "";
let testElement = "#barChart";
drawBarChart(testData, testOptions, testElement);
