const drawBarChart = function(data, options, element){
  //create bar chart outline located at element parameter
  let barChart = $(element);
  let table = $("<table class='barChart'></table>");
  table.appendTo(barChart);

  //loop through data values to generate cells for each bar
  for(let property in data){
    let newRow = $("<tr></tr>");
    newRow.appendTo(table);
    let yLabel = $("<th class='yLabels'>" + data[property] + "</th>");
    yLabel.appendTo(newRow);
    //make a loop to fill out table cells for each data catagory
    for(let property2 in data){
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


let testData = {"a": 1, "b": 2, "c": 3, "d": 4};
let testOptions = "";
let testElement = "#barChart";
drawBarChart(testData, testOptions, testElement);
