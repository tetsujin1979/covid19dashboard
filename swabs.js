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
      datasets: [thisObject.percentagePositive, thisObject.positiveSwabs, thisObject.negativeSwabs]
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
        filter: function (tooltipItem) {
          return tooltipItem.datasetIndex != 0;
        },
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
              let percentage = ((Number(datasetValue) * 100) / total).toFixed(2);
              return datasetLabel + ": " + Number(datasetValue).toLocaleString('en') + '(' + percentage + '%)';
            } else {
              let percentage = ((Number(datasetValue) * 100) / total).toFixed(2);
              total = total.toString().includes('.') ? roundToTwo(total) : total;
              difference = difference.toString().includes('.') ? roundToTwo(difference) : difference;
              let retVal = [datasetLabel + ": " + datasetValue.toLocaleString('en') + '(' + percentage + '%)', 'Total Tests: ' + total.toLocaleString('en')];
              if (tooltipItem.index > 0) {
                retVal.push('Difference: ' + difference.toLocaleString('en') + '(' + percentageChange + '%)');
              }
              return retVal;
            }
          }
        }
      }
    }
  };

  thisObject.populateData = function(items) {
    items.forEach(function(item, index) { 
      if (item.hasOwnProperty("date") && item.hasOwnProperty("positiveSwabs") && item.hasOwnProperty("dailySwabs")) {
        let percentagePositive = ((item.positiveSwabs * 100) / item.dailySwabs).toFixed(2);
        let swabData = {
          date: item.date,
          positiveSwabs: item.positiveSwabs,
          negativeSwabs: (item.dailySwabs - item.positiveSwabs),
          percentagePositive: percentagePositive
        }
        if (index > 7) {
          let today = items[index];
          let yesterday = items[index - 1];
          let twoDaysAgo = items[index - 2];
          let threeDaysAgo = items[index - 3];
          let fourDaysAgo = items[index - 4];
          let fiveDaysAgo = items[index - 5];
          let sixDayAgo = items[index - 6];
          let totalPositiveSwabs = today.positiveSwabs + yesterday.positiveSwabs + twoDaysAgo.positiveSwabs + threeDaysAgo.positiveSwabs + fourDaysAgo.positiveSwabs + fiveDaysAgo.positiveSwabs + sixDayAgo.positiveSwabs;
          let totalNegativeSwabs = (today.dailySwabs - today.positiveSwabs) +
                                   (yesterday.dailySwabs - yesterday.positiveSwabs) +
                                   (twoDaysAgo.dailySwabs - twoDaysAgo.positiveSwabs) +
                                   (threeDaysAgo.dailySwabs - threeDaysAgo.positiveSwabs) +
                                   (fourDaysAgo.dailySwabs - fourDaysAgo.positiveSwabs) +
                                   (fiveDaysAgo.dailySwabs - fiveDaysAgo.positiveSwabs) +
                                   (sixDayAgo.dailySwabs - sixDayAgo.positiveSwabs);

          let sevenDayTotalSwabs = totalPositiveSwabs + totalNegativeSwabs;
          swabData.sevenDayAveragePositiveSwabs = (totalPositiveSwabs / 7).toFixed(2);
          swabData.sevenDayAverageNegativeSwabs = (totalNegativeSwabs / 7).toFixed(2);
          swabData.sevenDayAveragePercentagePositive = ((totalPositiveSwabs * 100) / sevenDayTotalSwabs).toFixed(2);
          if (item.date.getDay() === 0) {
            swabData.weeklyPositiveSwabs = totalPositiveSwabs;
            swabData.weeklyNegativeSwabs = totalNegativeSwabs;
            swabData.weeklyPercentagePositive = ((totalPositiveSwabs * 100) / (totalPositiveSwabs + totalNegativeSwabs));
          }
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
    thisObject.data.filter(item => (item.date >= startDate && item.date <= endDate))
                   .forEach(function(item, index) {
      thisObject.graphData.push(item);
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
    thisObject.graphData.filter(item => item.date.getDay() == day)
                        .forEach(function(value, index) {
      thisObject.chartConfig.data.labels.push(value.date.toDateString());
      thisObject.positiveSwabs.data.push(value.positiveSwabs);
      thisObject.negativeSwabs.data.push(value.negativeSwabs);
      thisObject.percentagePositive.data.push(value.percentagePositive);
    });
  };
  
  thisObject.dayAverage = function(increment, prefix) {
    reset();
    let initialTestsIndex = 0;
    let todayDay = new Date().getDay();
    for (let counter = 6; counter < 13; counter++) {
      if (thisObject.graphData[counter].date.getDay() === todayDay) {
        initialTestsIndex = counter;
        break;
      }
    }
    for (let counter = initialTestsIndex; counter < thisObject.graphData.length; counter += increment) {
      let today = thisObject.graphData[counter];
      thisObject.chartConfig.data.labels.push(prefix + today.date.toDateString());
      thisObject.positiveSwabs.data.push(today.sevenDayAveragePositiveSwabs);
      thisObject.negativeSwabs.data.push(today.sevenDayAverageNegativeSwabs);
      thisObject.percentagePositive.data.push(today.sevenDayAveragePercentagePositive);
    }
  };
  
  thisObject.twoMonthView = function(startDate, endDate) {
    thisObject.graphData = new Array();
    thisObject.data.filter(item => (item.date >= startDate && item.date <= endDate))
                   .forEach(function(item, index) {
      thisObject.graphData.push(item);
    });
  };

  thisObject.weeklyTotal = function() {
    reset();
    thisObject.graphData.filter(item => item.date.getDay() === 0 && item.hasOwnProperty("weeklyPositiveSwabs"))
                        .forEach(function (today, index) {
      thisObject.chartConfig.data.labels.push('Week ending ' + today.date.toDateString());
      thisObject.positiveSwabs.data.push(weeklyPositiveSwabs);
      thisObject.negativeSwabs.data.push(weeklyNegativeSwabs);
      thisObject.percentagePositive.data.push(weeklyPercentagePositive);
    });
  };

  thisObject.generateTableBody = function() {
    let tableBody = document.createElement('tbody');
    let previousDaysPositiveTests = 0;
    thisObject.chartConfig.data.labels.forEach(function(item, index) {
      let csvData = new Array();
      // Insert date cell
      let newRow = tableBody.insertRow();
      let newCell = newRow.insertCell();
      let newText = document.createTextNode(item);
      let positiveSwabs = thisObject.positiveSwabs.data[index];
      let negativeSwabs = thisObject.negativeSwabs.data[index];
      let percentagePositive = thisObject.percentagePositive.data[index];
      let dailyTests = Number(positiveSwabs) + Number(negativeSwabs);

      newCell.appendChild(newText);
      createCell(newRow, positiveSwabs);
      createCell(newRow, negativeSwabs);
      createCell(newRow, dailyTests);
      createCell(newRow, percentagePositive);
      if (index > 0) {
          let changeInPositiveTests = positiveSwabs - previousDaysPositiveTests;
          let percentageChange = ((changeInPositiveTests * 100) / previousDaysPositiveTests).toFixed(2)
          createCell(newRow, changeInPositiveTests);
          createCell(newRow, percentageChange);
      } else {
          createCell(newRow, '-');
          createCell(newRow, '-');
      }
      previousDaysPositiveTests = positiveSwabs;
    });
    return tableBody;
  };

  thisObject.generateCSV = function() {
    let retVal = new Array();
    let previousDaysPositiveTests = 0;
    retVal.push(csvHeader);
    thisObject.chartConfig.data.labels.forEach(function(item, index) {
      let csvData = new Array();
      let positiveSwabs = thisObject.positiveSwabs.data[index];
      let negativeSwabs = thisObject.negativeSwabs.data[index];
      let percentagePositive = thisObject.percentagePositive.data[index];
      let dailyTests = Number(positiveSwabs) + Number(negativeSwabs);
      csvData.push(item);
      csvData.push(dailyTests);
      csvData.push(positiveSwabs);
      csvData.push(negativeSwabs);
      csvData.push(percentagePositive);

      if (index > 0) {
          let changeInPositiveTests = positiveSwabs - previousDaysPositiveTests;
          let percentageChange = ((changeInPositiveTests * 100) / previousDaysPositiveTests).toFixed(2)
          csvData.push(changeInPositiveTests);
          csvData.push(percentageChange + '%');
      } else {
          csvData.push('-');
          csvData.push('-');
      }
      previousDaysPositiveTests = positiveSwabs;
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
