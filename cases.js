function DailyCases() {
  const thisObject = this;
  const csvHeader = ['Date,Daily Cases,Change In Cases,Percentage Change In Daily Cases'];
  thisObject.data = new Array();
  thisObject.graphData = new Array();
  thisObject.name = 'cases';
  thisObject.tableHead = '<tr><th>Date</th><th>Cases</th><th>Change</th><th>% Change</th><th>Total Cases</th></tr>';
  
  thisObject.dailyCases = {
    label: "Cases",
    data: [],
    backgroundColor: "rgba(237, 100, 127, .6)",
    borderColor: "rgba(233,0,45, 1)",
    borderWidth: 0,
    yAxisID: "dailyCasesAxis"
  };
      
  thisObject.totalCases = {
    label: "Total Cases",
    data: [],
    backgroundColor: "transparent",
    borderColor: "rgba(63, 63, 191, 0.6)",
    borderWidth: 4,
    type: "line",
    yAxisID: "totalCasesAxis"
  };

  thisObject.chartConfig = {
    type: "bar",
    data: {
      labels: [],
      datasets: [thisObject.totalCases, thisObject.dailyCases]
    },
    options: {
        scales: {
          yAxes: [{
              id: "dailyCasesAxis",
              position: "left",
              ticks: {
                  beginAtZero: true
              },
              scaleLabel: {
                  display: true,
                  labelString: "Daily Cases"
              }
          }, {
              id: "totalCasesAxis",
              position: "right",
              ticks: {
                  beginAtZero: true
              },
              gridLines: {
                  display: false
              },
              scaleLabel: {
                  display: true,
                  labelString: "Total Cases"
              }
          }]
        },
        tooltips: {
            mode: 'label',
            callbacks: {
              label: function (tooltipItem, data) {
                let datasetLabel = data.datasets[tooltipItem.datasetIndex].label;
                let datasetValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                let total = 0;
                let percentageChange = 0;
                let difference = 0;
                for (let i = 0; i < data.datasets.length; i++) {
                if (data.datasets[i].label === 'Cases' && tooltipItem.index > 0) {
                    let previousValue = Number(data.datasets[i].data[tooltipItem.index - 1]);
                    let currentValue = Number(data.datasets[i].data[tooltipItem.index]);
                    difference = currentValue - previousValue;
                    percentageChange = ((difference * 100) / previousValue).toFixed(2);
                  }
                }

                if (tooltipItem.datasetIndex != data.datasets.length - 1) {
                    return datasetLabel + ": " + datasetValue;
                } else {
                    total = total.toString().includes('.') ? total.toFixed(2) : total;
                    difference = difference.toString().includes('.') ? difference.toFixed(2) : difference;
                    let retVal = [datasetLabel + ": " + datasetValue, 'Difference: ' + difference];
                    if (percentageChange !== "Infinity") {
                      retVal.push('% Difference: ' + percentageChange + '%');
                    }
                    return retVal;
                }
              }
           }
        }
      }
  };
  
  thisObject.populateData = function(items) {
    let totalCases = 0;

    items.forEach(function(item, index) { 
      if (item.date && item.cases) {
        totalCases += item.cases; 
        let caseData = {
          date: item.date,
          cases: item.cases,
          totalCases: totalCases
        }
        thisObject.data.push(caseData);
      }
    });
  }
  
  thisObject.twoMonthViewOptions = function() {
    let startTimestamps = new Array();
    thisObject.data.forEach(function(value, index) {
      let date = new Date(value.date.getTime());
      date.setDate(1);
      date.setHours(12);
      let startTimestamp = date.getTime();
      if (!startTimestamps.includes(startTimestamp)) {
          startTimestamps.push(startTimestamp);
      }
    });
    return startTimestamps;
  }

  thisObject.getStartAndEndDates = function() {
    return {
      startDate: thisObject.data[0].date,
      endDate: thisObject.data[thisObject.data.length - 1].date
    }
  };
  
  thisObject.allDates = function() {
    thisObject.graphData = new Array();
    thisObject.data.forEach(function(value, index) {
      thisObject.graphData.push(value);
    });
  };
  
  thisObject.lastTwoMonths = function() {
    thisObject.graphData = new Array();
    let twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    thisObject.data.forEach(function(value, index) {
      if (value.date > twoMonthsAgo) {
        thisObject.graphData.push(value);
      }
    });
  };
  
  thisObject.betweenDates = function(startDate, endDate) {
    thisObject.graphData = new Array();
    thisObject.data.forEach(function(item, index) {
      if (item.date >= startDate && item.date <= endDate) {
        thisObject.graphData.push(item);
      }
    });
  };

  thisObject.twoMonthView = function(startDate, endDate) {
    thisObject.graphData = new Array();
    thisObject.data.forEach(function(item, index) {
      if (item.date >= startDate && item.date <= endDate) {
        thisObject.graphData.push(item);
      }
    });
  };

  thisObject.standardGraph = function() {
    reset();
    thisObject.graphData.forEach(function(value, index) {
      thisObject.chartConfig.data.labels.push(value.date.toDateString());
      thisObject.dailyCases.data.push(value.cases);
      thisObject.totalCases.data.push(value.totalCases);
    });
  };

  thisObject.byDay = function(day) {
    reset();    
    thisObject.graphData.forEach(function(value, index) { 
      if (value.date.getDay() == day) {
        thisObject.chartConfig.data.labels.push(value.date.toDateString());
        thisObject.dailyCases.data.push(value.cases);
        thisObject.totalCases.data.push(value.totalCases);
      }
    });
  };
  
  thisObject.dayAverage = function(increment, prefix) {
    reset();
    let initialCasesIndex = 0;
    let todayDay = new Date().getDay();
    for (let counter = 6; counter < 15; counter++) {
      if (thisObject.graphData[counter].date.getDay() === todayDay) {
        initialCasesIndex = counter;
        break;
      }
    }
    for (let counter = initialCasesIndex; counter < thisObject.graphData.length; counter += increment) {
        let today = thisObject.graphData[counter];
        let yesterday = thisObject.graphData[counter - 1];
        let twoDaysAgo = thisObject.graphData[counter - 2];
        let threeDaysAgo = thisObject.graphData[counter - 3];
        let fourDaysAgo = thisObject.graphData[counter - 4];
        let fiveDaysAgo = thisObject.graphData[counter - 5];
        let sixDayAgo = thisObject.graphData[counter - 6];

        let totalCases = today.cases + yesterday.cases + twoDaysAgo.cases + threeDaysAgo.cases + fourDaysAgo.cases + fiveDaysAgo.cases + sixDayAgo.cases;        
        thisObject.chartConfig.data.labels.push(prefix + today.date.toDateString());
        thisObject.dailyCases.data.push((totalCases / 7).toFixed(2));
        thisObject.totalCases.data.push(today.totalCases);
    }
  };

  thisObject.weeklyTotal = function() {
    reset();
    for (let counter = 6; counter < thisObject.graphData.length; counter++) {
      let today = thisObject.graphData[counter];
      if (today.date.getDay() === 6) {
        let today = thisObject.graphData[counter];
        let yesterday = thisObject.graphData[counter - 1];
        let twoDaysAgo = thisObject.graphData[counter - 2];
        let threeDaysAgo = thisObject.graphData[counter - 3];
        let fourDaysAgo = thisObject.graphData[counter - 4];
        let fiveDaysAgo = thisObject.graphData[counter - 5];
        let sixDayAgo = thisObject.graphData[counter - 6];
        let totalCases = today.cases + yesterday.cases + twoDaysAgo.cases + threeDaysAgo.cases + fourDaysAgo.cases + fiveDaysAgo.cases + sixDayAgo.cases;

        thisObject.chartConfig.data.labels.push('Week ending ' + today.date.toDateString());
        thisObject.dailyCases.data.push(totalCases);
        thisObject.totalCases.data.push(today.totalCases);
      }
    }
  };

  thisObject.generateTableBody = function() {
    let tableBody = document.createElement('tbody');
    let previousDaysCases = 0;
    thisObject.graphData.forEach(function(item, index) {
        let newRow = tableBody.insertRow();
        let newCell = newRow.insertCell();
        
        let newText = document.createTextNode(item.date.toDateString());
        newCell.appendChild(newText);
        
        createCell(newRow, item.cases);
        if (index > 0) {
            let changeInCases = item.cases - previousDaysCases;
            let percentageChange = ((changeInCases * 100) / previousDaysCases).toFixed(2)
            createCell(newRow, changeInCases);
            createCell(newRow, percentageChange);
        } else {
            createCell(newRow, '-');
            createCell(newRow, '-');
        }
        createCell(newRow, item.totalCases);
        previousDaysCases = item.cases;
    });
    return tableBody;
  };  
  
  thisObject.generateCSV = function() {
    let retVal = new Array();
    let previousDaysCases = 0;
    retVal.push(csvHeader);
    thisObject.graphData.forEach(function(item, index) {
      let csvData = new Array();
      csvData.push(item.date.toDateString());
      csvData.push(item.dailyCases);
      if (index > 0) {
        let changeInCases = item.dailyCases - previousDaysCases;
        let percentageChange = ((changeInCases * 100) / previousDaysCases).toFixed(2)
        csvData.push(changeInCases);
        csvData.push(percentageChange + '%');
      } else {
        csvData.push('-');
        csvData.push('-');
      }
      previousDaysCases = item.dailyCases;
      retVal.push(csvData.join(','))
    });
    return retVal.join("\n");
  };
  
  thisObject.setTrendLine = function(displayTrendLine) {
    if (displayTrendLine) {
      thisObject.dailyCases.trendlineLinear = positiveSwabsTrendLine;
    } else {
      thisObject.dailyCases.trendlineLinear = null;
    }
  }
  
  function reset() {
    thisObject.chartConfig.data.labels = new Array();
    thisObject.dailyCases.data = new Array();
    thisObject.totalCases.data = new Array();
  }
};

const cases = new DailyCases();
cases.populateData(data);
