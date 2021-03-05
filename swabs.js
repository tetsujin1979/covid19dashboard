function DailySwabs() {
  const thisObject = this;
  const csvHeader = ['Date,Total Daily Tests,Positive Daily Tests,Negative Daily Tests,% Positive,Change in daily positive tests,Percentage change in daily positive tests'];
  thisObject.data = new Array();
  thisObject.graphData = new Array();
  thisObject.name = 'swabs';
  thisObject.tableHead = '<tr><th>Date</th><th>Postive</th><th>Negative</th><th>Total</th><th>% Positive</th><th>Change</th><th>% Change</th></tr>';
      
  thisObject.positiveSwabs = {
    label: "Positive Tests",
    data: [],
    backgroundColor: "rgba(237, 100, 127, .6)",
    borderColor: "rgba(233,0,45, 1)",
    borderWidth: 0,
    yAxisID: "SwabsAxis"
  };
  
  thisObject.negativeSwabs = {
    label: "Negative Tests",
    data: [],
    backgroundColor: "rgba(63, 63, 191, 0.6)",
    borderColor: "rgba(14, 54, 201, 0.5)",
    borderWidth: 0,
    yAxisID: "SwabsAxis"
  };

  thisObject.percentagePositive = {
    label: "% Positive",
    data: [],
    backgroundColor: "transparent",
    borderColor: "red",
    borderWidth: 4,
    yAxisID: "PercentagePositiveAxis",
    type: "line"
  };
  
  thisObject.chartConfig = {
    type: "bar",
    data: {
      labels: [],
      datasets: [thisObject.positiveSwabs, thisObject.negativeSwabs, thisObject.percentagePositive]
    },
    options: {
    scales: {
        xAxes: [{
            stacked: true
        }],
        yAxes: [{
            id: "SwabsAxis",
            stacked: true,
            position: "left",
            ticks: {
                beginAtZero: true
            },
            scaleLabel: {
                display: true,
                labelString: "Total Tests"
            }
        }, {
            id: "PercentagePositiveAxis",
            position: "right",
            ticks: {
                beginAtZero: true
            },
            gridLines: {
                display: false
            },
            scaleLabel: {
                display: true,
                labelString: "% Positive"
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
                    if (data.datasets[i].label != '% Positive') {
                      total += Number(data.datasets[i].data[tooltipItem.index]);
                    }
                    if (data.datasets[i].label === 'Positive Tests' && tooltipItem.index > 0) {
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
                      return ['Total Tests: ' + total, 'Difference: ' + difference, '% Difference: ' + percentageChange + '%', datasetLabel + ": " + datasetValue];
                  }
              }
            }
        }
    }
  };

  thisObject.populateData = function(items) {
    items.forEach(function(item, index) { 
      if (item.date && item.positiveSwabs && item.dailySwabs) {
        let percentagePositive = ((item.positiveSwabs * 100) / item.dailySwabs).toFixed(2);
        let swabData = {
          date: item.date,
          positiveSwabs: item.positiveSwabs,
          negativeSwabs: (item.dailySwabs - item.positiveSwabs),
          percentagePositive: percentagePositive
        }
        thisObject.data.push(swabData);
      }
    });
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
  }

  thisObject.lastTwoMonths = function() {
    thisObject.graphData = new Array();
    let twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    thisObject.data.forEach(function(value, index) {
      if (value.date > twoMonthsAgo) {
        thisObject.graphData.push(value);
      }
    });
  }
  
  thisObject.betweenDates = function(startDate, endDate) {
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
      thisObject.positiveSwabs.data.push(value.positiveSwabs);
      thisObject.negativeSwabs.data.push(value.negativeSwabs);
      thisObject.percentagePositive.data.push(value.percentagePositive);
    });
  };
  
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
  };

  thisObject.byDay = function(day) {
    reset();
    thisObject.graphData.forEach(function(value, index) {
      if (value.date.getDay() == day) {
        thisObject.chartConfig.data.labels.push(value.date.toDateString());
        thisObject.positiveSwabs.data.push(value.positiveSwabs);
        thisObject.negativeSwabs.data.push(value.negativeSwabs);
        thisObject.percentagePositive.data.push(value.percentagePositive);
      }
    });
  };
  
  thisObject.dayAverage = function(increment, prefix) {
    reset();
    let initialTestsIndex = 0;
    let todayDay = new Date().getDay();
    for (let counter = 6; counter < 15; counter++) {
      if (thisObject.graphData[counter].date.getDay() === todayDay) {
        initialTestsIndex = counter;
        break;
      }
    }
    for (let counter = initialTestsIndex; counter < thisObject.graphData.length; counter += increment) {
      let today = thisObject.graphData[counter];
      let yesterday = thisObject.graphData[counter - 1];
      let twoDaysAgo = thisObject.graphData[counter - 2];
      let threeDaysAgo = thisObject.graphData[counter - 3];
      let fourDaysAgo = thisObject.graphData[counter - 4];
      let fiveDaysAgo = thisObject.graphData[counter - 5];
      let sixDayAgo = thisObject.graphData[counter - 6];
      let totalPositiveSwabs = today.positiveSwabs + yesterday.positiveSwabs + twoDaysAgo.positiveSwabs + threeDaysAgo.positiveSwabs + fourDaysAgo.positiveSwabs + fiveDaysAgo.positiveSwabs + sixDayAgo.positiveSwabs;
      let totalNegativeSwabs = today.negativeSwabs + yesterday.negativeSwabs + twoDaysAgo.negativeSwabs + threeDaysAgo.negativeSwabs + fourDaysAgo.negativeSwabs + fiveDaysAgo.negativeSwabs + sixDayAgo.negativeSwabs;
      let dailySwabs = totalPositiveSwabs + totalNegativeSwabs;
      thisObject.chartConfig.data.labels.push(prefix + today.date.toDateString());
      thisObject.positiveSwabs.data.push((totalPositiveSwabs / 7).toFixed(2));
      thisObject.negativeSwabs.data.push((totalNegativeSwabs / 7).toFixed(2));
      thisObject.percentagePositive.data.push(((totalPositiveSwabs * 100) / dailySwabs).toFixed(2));
    }
  };
  
  thisObject.twoMonthView = function(startDate, endDate) {
    thisObject.graphData = new Array();
    thisObject.data.forEach(function(item, index) {
      if (item.date >= startDate && item.date <= endDate) {
        thisObject.graphData.push(item);
      }
    });
  };

  thisObject.weeklyTotal = function() {
    reset();
    for (let counter = 6; counter < thisObject.graphData.length; counter++) {
      let today = thisObject.graphData[counter];
      if (today.date.getDay() === 6) {
        let yesterday = thisObject.graphData[counter - 1];
        let twoDaysAgo = thisObject.graphData[counter - 2];
        let threeDaysAgo = thisObject.graphData[counter - 3];
        let fourDaysAgo = thisObject.graphData[counter - 4];
        let fiveDaysAgo = thisObject.graphData[counter - 5];
        let sixDayAgo = thisObject.graphData[counter - 6];
        let totalPositiveSwabs = today.positiveSwabs + yesterday.positiveSwabs + twoDaysAgo.positiveSwabs + threeDaysAgo.positiveSwabs + fourDaysAgo.positiveSwabs + fiveDaysAgo.positiveSwabs + sixDayAgo.positiveSwabs;
        let totalNegativeSwabs = today.negativeSwabs + yesterday.negativeSwabs + twoDaysAgo.negativeSwabs + threeDaysAgo.negativeSwabs + fourDaysAgo.negativeSwabs + fiveDaysAgo.negativeSwabs + sixDayAgo.negativeSwabs;
        let totalSwabs = totalPositiveSwabs + totalNegativeSwabs;
        
        thisObject.chartConfig.data.labels.push('Week ending ' + today.date.toDateString());
        thisObject.positiveSwabs.data.push(totalPositiveSwabs);
        thisObject.negativeSwabs.data.push(totalNegativeSwabs);
        thisObject.percentagePositive.data.push(((totalPositiveSwabs * 100) / totalSwabs).toFixed(2));
      }
    }
  };

  thisObject.generateTableBody = function() {
    let tableBody = document.createElement('tbody');
    let previousDaysPositiveTests = 0;
    thisObject.graphData.forEach(function(item, index) {
      let csvData = new Array();
      // Insert date cell
      let newRow = tableBody.insertRow();
      let newCell = newRow.insertCell();
      let newText = document.createTextNode(item.date.toDateString());
      let dailyTests = Number(item.positiveSwabs) + Number(item.negativeSwabs);

      newCell.appendChild(newText);
      createCell(newRow, item.positiveSwabs);
      createCell(newRow, item.negativeSwabs);
      createCell(newRow, dailyTests);
      createCell(newRow, item.percentagePositive);
      if (index > 0) {
          let changeInPositiveTests = item.positiveSwabs - previousDaysPositiveTests;
          let percentageChange = ((changeInPositiveTests * 100) / previousDaysPositiveTests).toFixed(2)
          createCell(newRow, changeInPositiveTests);
          createCell(newRow, percentageChange);
      } else {
          createCell(newRow, '-');
          createCell(newRow, '-');
      }
      previousDaysPositiveTests = item.positiveSwabs;
    });
    return tableBody;
  };

  thisObject.generateCSV = function() {
    let retVal = new Array();
    let previousDaysPositiveTests = 0;
    retVal.push(csvHeader);
    thisObject.graphData.forEach(function(item, index) {
      let csvData = new Array();
      let dailyTests = Number(item.positiveSwabs) + Number(item.negativeSwabs);
      csvData.push(item.date.toDateString());
      csvData.push(dailyTests);
      csvData.push(item.positiveSwabs);
      csvData.push(item.negativeSwabs);
      csvData.push(item.percentagePositive);

      if (index > 0) {
          let changeInPositiveTests = item.positiveSwabs - previousDaysPositiveTests;
          let percentageChange = ((changeInPositiveTests * 100) / previousDaysPositiveTests).toFixed(2)
          csvData.push(changeInPositiveTests);
          csvData.push(percentageChange + '%');
      } else {
          csvData.push('-');
          csvData.push('-');
      }
      previousDaysPositiveTests = item.positiveSwabs;
      retVal.push(csvData.join(','))
    });
    return retVal.join("\n");
  };

  thisObject.setTrendLine = function(displayTrendLine) {
    if (displayTrendLine) {
      thisObject.positiveSwabs.trendlineLinear = positiveSwabsTrendLine;
      thisObject.negativeSwabs.trendlineLinear = negativeSwabsTrendLine;
    } else {
      thisObject.positiveSwabs.trendlineLinear = null;
      thisObject.negativeSwabs.trendlineLinear = null;
    }
  }
  
  function reset() {
    thisObject.chartConfig.data.labels = new Array();
    thisObject.positiveSwabs.data = new Array();
    thisObject.negativeSwabs.data = new Array();
    thisObject.percentagePositive.data = new Array();
  }
};

const swabs = new DailySwabs();
swabs.populateData(data);
