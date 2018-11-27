var drawBarChart = function(data, options, element){
  //create bar chart outline located at element parameter
  var barChart = $(element);
  var table = $("<table class='barChart'></table>");
  table.appendTo(barChart);
  //make a variable that will contain an array of the y-values and be used to determine y increment
  var yArray = [];
  //make a variable that will contain the increment the y ayis will contain
  var yAxisInc = 1;

  //fill yArray with y values inputed by user
  for(let yValue in data){
    yArray.push(data[yValue]);
  }
  //sort yArray and make a loop to determine if increment should be increased based on array range
  yArray.sort(function(a, b){
    return a - b;
  });
  while(yArray[yArray.length - 1] > yAxisInc * 5){
    yAxisInc *= 5;
  }
  //make variable that will be displayed on y ayis
  let yAxis = yAxisInc;

  //make a variable containing may domain value
  let yMax = yAxisInc;
  while(yMax < yArray[yArray.length - 1]){
    yMax += yAxisInc;
  }

  let tableRow = $("<tr></tr>");
  tableRow.appendTo(table);
  //create labels and bars for each property givin
  for(let property in data){
    //make variable to keep track of bar width
    let heightPercent = (data[property] / yMax) * 100;

    //make variables for html table tags
    let subTable = $("<table class='subTable'</table>");
    let row = $("<tr></tr>");
    // let label = $("<th class='label'><p class='test'>" + property + "</p></th>");
    let bar = $(`<td style="height: ${heightPercent}%;" class='bar'>${data[property]}</td>`);
    let empty = $(`<tr><td style="height: ${100 - heightPercent}%;" class='empty'></td></tr>`);
    let tableCell = $("<td class='dataCell'></td>");

    console.log(heightPercent)

    // label.appendTo(row);
    bar.appendTo(row);
    empty.appendTo(subTable);
    row.appendTo(subTable);
    subTable.appendTo(tableCell);
    tableCell.appendTo(tableRow);
  }
}


let testData = {"hello": 2, "asdf": 1, "qdsafreasdfsadfsdaqrerqwerwqee": 3, "d": 8, "e": 9};
let testOptions = "";
let testElement = "#barChart";
drawBarChart(testData, testOptions, testElement);
