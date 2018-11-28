var drawBarChart = function(data, options, element){
  //bar chart options
  var barChartWidth = "100%";
  var barChartHeight = "500px";
  var barChartTitle = 'Bar Chart Title';
  var barValuePosition = 'middle';

  if(options.valuePosition){
    barValuePosition = options.valuePosition;
  }
  if(options.title){
    barChartTitle = options.title;
  }
  if(options.width){
    barChartWidth = options.width;
  }
  if(options.height){
    barChartHeight = options.height;
  }

  //create bar chart outline located at element parameter
  var barChart = $(element);
  var table = $(`<table style="height: ${barChartHeight}; width: ${barChartWidth}" class='barChart'></table>`);
  table.appendTo(barChart);

  //add a title to bar chart
  var title = $(`<h1 id='title'>${barChartTitle}</h1>`);
  title.prependTo(barChart);

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

  //make a column for y axis values
  let yCell = $("<td class='yCell'></td>");
  let yColumn = $("<table class='yTable'></table>").appendTo(yCell);
  yCell.appendTo(tableRow);
  //add values to y column
  while(yMax + yAxisInc > yAxis){
    $(`<tr><th class='yAxis'>${yAxis}-<th></tr>`).prependTo(yColumn);
    yAxis += yAxisInc;
  }

  //create labels and bars for each property given
  for(let property in data){
    //select correct colour for current property
    var barColour = 'lightblue';
    for(let prop in options){
      if(prop == property + "BarColour"){
        barColour = options[prop];
      }
    }

    //make variable to keep track of bar width
    let heightPercent = (data[property] / yMax) * 100;

    //make variables for html table tags
    let subTable = $("<table class='subTable'</table>");
    let row = $("<tr></tr>");
    let bar = $(`<td style="
      height: ${heightPercent}%;
      background-color: ${barColour};
      vertical-align: ${barValuePosition}"
      class='bar'>${data[property]}</td>`);
    let empty = $(`<tr><td style="height: ${100 - heightPercent}%;" class='empty'></td></tr>`);
    let tableCell = $("<td class='dataCell'></td>");

    // label.appendTo(row);
    bar.appendTo(row);
    empty.appendTo(subTable);
    row.appendTo(subTable);
    subTable.appendTo(tableCell);
    tableCell.appendTo(tableRow);
  }

  //add table row for x labels
  let xRow = $("<tr></tr>");
  //add a placeholder
  $("<th></th>").appendTo(xRow);
  xRow.appendTo(table);
  for(let property in data){
    //change label to chosen colour
    var labelColour = 'black';
    for(let prop in options){
      if(prop == property + "LabelColour"){
        labelColour = options[prop];
      }
    }
    let xLabel = $(`<th style="color: ${labelColour}" class='xLabel'><p>${property}</p></th>`);
    xLabel.appendTo(xRow);
  }
}

//variable to keep track of user inputed data in order to select and delete
var track = 0;

//function that adds users input for label and value for bar chart
var customizeInupt = function(){
  let inputLabel = $(".inputLabel")[0].value;
  let inputValue = $(".inputValue")[0].value;

  //bool var to check if label is already in data object
  let inObj = false;
  for(var property in testData){
    if(property == inputLabel){
      inObj = true;
    }
  }
  //make conditions to make sure inputed value is a non negative number
  if((Number(inputValue) || inputValue == 0) && inputValue >= 0 && !(inObj) ){
    testData[inputLabel] = inputValue;
    $(`<p id='p${track}'>
      <span id='sp${track}'>${inputLabel}: ${inputValue}</span><button id='${track}' class='remove'>Remove</button></p>`)
      .prependTo("#userInput");
    testOptions[inputLabel+"LabelColour"] = currentLabelColour;
    testOptions[inputLabel+"BarColour"] = currentBarColour;
    //add event listener to "remove" button to delete label and value from chart
    $(".remove").click(removeInput);
    track++;
    newChart();
  }
}
//function that removes specified value and key from chart
var removeInput = function(event){
  spTrack = event.target.id;
  var par = $(`#p${spTrack}`);
  var item = $(`#sp${spTrack}`);
  var str = item[0].innerHTML;
  var rmKey = str.split(":")[0];

  delete testData[rmKey];
  par.remove();
  newChart();
}

//function that clears old graph and calls drawBarChart function
var newChart = function (){
  $(".barChart").remove();
  $("#title").remove();
  drawBarChart(testData, testOptions, testElement);
}

//adding event listener to change colour of label and bar
var currentBarColour = "blue";
var currentLabelColour = "black";
$('.inputLabelColour').change(function(e){
currentLabelColour = e.target.value;
});
$('.inputBarColour').change(function(e){
currentBarColour = e.target.value;
});

// event listener that adds user input when "add to chart" button is clicked
$(".inputData").click(customizeInupt);

//add event listener that changes width and height to users input
$(".inputDim").click(function(){
  testOptions["height"] = $('.inputHeight')[0].value;
  testOptions["width"] = $('.inputWidth')[0].value;
  newChart();
});

//add event listener that chagnes chart title to users input
$(".changeTitle").click(function(){
  testOptions["title"] = $('.inputTitle')[0].value;
  newChart();
})

//add event listeners to top mid and bot radio buttons
var setPosition = function(){
  if($('#positionTop')[0].checked){
    testOptions["valuePosition"] = 'top';
  }else if($('#positionMiddle')[0].checked){
    testOptions["valuePosition"] = 'middle';
  }else if($('#positionBottom')[0].checked){
    testOptions["valuePosition"] = 'bottom';
  }
  newChart();
}
$('#positionTop').click(setPosition);
$('#positionMiddle').click(setPosition);
$('#positionBottom').click(setPosition);

var testData = {};
var testOptions = {
  width: '80%',
  height: '400px',
  title: 'Bar Chart Title',
  valuePosition: 'middle'
};
var testElement = "#barChart";

drawBarChart(testData, testOptions, testElement);
