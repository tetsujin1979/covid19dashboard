function DailyDeaths(items) {
  const thisObject = this;
  const csvHeader = ['Date,Daily Deaths,Change In Deaths,Percentage Change In Daily Deaths,Total Deaths'];
  thisObject.data = new Array();
  thisObject.graphData = new Array();
  thisObject.name = 'deaths';
  thisObject.tableHead = '<tr><th>Date</th><th>Deaths</th><th>Change</th><th>% Change</th><th>Total Deaths</th></tr>';
      
  thisObject.dailyDeaths = {
    label: "Deaths",
    data: [],
    backgroundColor: "rgba(63, 63, 191, 0.6)",
    borderColor: "rgba(14, 54, 201, 0.5)",
    borderWidth: 0,
    yAxisID: "dailyDeathsAxis"
  };
  
  thisObject.totalDeaths = {
    label: "Total Deaths",
    data: [],
    backgroundColor: "transparent",
    borderColor: "red",
    borderWidth: 4,
    type: "line",
    yAxisID: "totalDeathsAxis"
  };

  thisObject.chartConfig = {
    type: "bar",
    data: {
      labels: [],
      datasets: [thisObject.totalDeaths, thisObject.dailyDeaths]
    },
    options: {
        scales: {
          yAxes: [{
              id: "dailyDeathsAxis",
              ticks: {
                  beginAtZero: true
              },
              gridLines: {
                  display: false
              },
              scaleLabel: {
                  display: true,
                  labelString: "Daily Deaths"
              }
          }, {
              id: "totalDeathsAxis",
              position: "right",
              ticks: {
                  beginAtZero: true
              },
              gridLines: {
                  display: false
              },
              scaleLabel: {
                  display: true,
                  labelString: "Total Deaths"
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
                  if (data.datasets[i].label === 'Deaths' && tooltipItem.index > 0) {
                      let previousValue = Number(data.datasets[i].data[tooltipItem.index - 1]);
                      let currentValue = Number(data.datasets[i].data[tooltipItem.index]);
                      difference = currentValue - previousValue;
                      percentageChange = ((difference * 100) / previousValue).toFixed(2);
                  }
                }

                if (tooltipItem.datasetIndex != data.datasets.length - 1) {
                    return datasetLabel + ": " + Number(datasetValue).toLocaleString('en');
                } else {
                    total = total.toString().includes('.') ? total.toFixed(2) : total;
                    difference = difference.toString().includes('.') ? roundToTwo(difference) : difference;
                    let retVal = [datasetLabel + ": " + Number(datasetValue).toLocaleString('en')];
                    if (Number(difference) != 0) {
                      let tooltipLabel = 'Difference: ' + Number(difference).toLocaleString('en');
                      if (percentageChange !== "Infinity" && tooltipItem.index > 0) {
                        tooltipLabel += '(' + percentageChange + '%)';
                      }
                      retVal.push(tooltipLabel);
                    }
                    return retVal;
                 }
              }
           }
        }
    }
  };

  thisObject.populateData = function(items) {
    let totalDeaths = 0;
    items.forEach(function(item, index) { 
      if (item.hasOwnProperty("date") && item.hasOwnProperty("deaths")) {
        totalDeaths += item.deaths;
        let deathData = {
          date: item.date,
          deaths: item.deaths,
          totalDeaths: totalDeaths
        }
        if (index > 7) {
          let today = items[index];
          let yesterday = items[index - 1];
          let twoDaysAgo = items[index - 2];
          let threeDaysAgo = items[index - 3];
          let fourDaysAgo = items[index - 4];
          let fiveDaysAgo = items[index - 5];
          let sixDayAgo = items[index - 6];
          let weeklyDeaths = today.deaths + yesterday.deaths + twoDaysAgo.deaths + threeDaysAgo.deaths + fourDaysAgo.deaths + fiveDaysAgo.deaths + sixDayAgo.deaths;
          deathData.sevenDayAverage = (weeklyDeaths / 7).toFixed(2);
          if (item.date.getDay() === 0) {
            deathData.weeklyDeaths = weeklyDeaths;
          }
        }
        thisObject.data.push(deathData);
      }
    });
  }

  thisObject.allDates = function() {
    thisObject.graphData = new Array();
    thisObject.data.forEach(function(value, index) {
      thisObject.graphData.push(value);
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
  };

  thisObject.lastTwoMonths = function() {
    thisObject.graphData = new Array();
    let twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    thisObject.data.filter(item => (item.date > twoMonthsAgo))
                   .forEach(function(value, index) {
      thisObject.graphData.push(value);
    });
  }
  
  thisObject.betweenDates = function(startDate, endDate) {
    thisObject.graphData = new Array();
    thisObject.data.filter(item => (item.date >= startDate && item.date <= endDate))
                   .forEach(function(item, index) {
      thisObject.graphData.push(item);
    });
  };

  thisObject.twoMonthView = function(startDate, endDate) {
    thisObject.graphData = new Array();
    thisObject.data.filter(item => (item.date >= startDate && item.date <= endDate))
                   .forEach(function(item, index) {
      thisObject.graphData.push(item);
    });
  }

  thisObject.getStartAndEndDates = function() {
    return {
      startDate: thisObject.data[0].date,
      endDate: thisObject.data[thisObject.data.length - 1].date
    }
  };

  thisObject.setTrendLine = function(displayTrendLine) {
    if (displayTrendLine) {
      thisObject.dailyDeaths.trendlineLinear = negativeSwabsTrendLine;
    } else {
      thisObject.dailyDeaths.trendlineLinear = null;
    }
  }

  thisObject.standardGraph = function() {
    reset();
    thisObject.graphData.forEach(function(value, index) { 
      thisObject.chartConfig.data.labels.push(value.date.toDateString());
      thisObject.dailyDeaths.data.push(value.deaths);
      thisObject.totalDeaths.data.push(value.totalDeaths);
    });
  }

  thisObject.byDay = function(day) {
    reset();
    thisObject.graphData.filter(item => (item.date.getDay() == day))
                        .forEach(function(value, index) { 
      thisObject.chartConfig.data.labels.push(value.date.toDateString());
      thisObject.dailyDeaths.data.push(value.deaths);
      thisObject.totalDeaths.data.push(value.totalDeaths);
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
      thisObject.dailyDeaths.data.push(today.sevenDayAverage);
      thisObject.totalDeaths.data.push(today.totalDeaths);
    }
  };

  thisObject.weeklyTotal = function() {
    reset();
    thisObject.graphData.filter(item => (item.date.getDay() === 0 && item.hasOwnProperty("weeklyDeaths")))
                        .forEach(function(today, index) {
      thisObject.chartConfig.data.labels.push('Week ending ' + today.date.toDateString());
      thisObject.dailyDeaths.data.push(today.weeklyDeaths);
      thisObject.totalDeaths.data.push(today.totalDeaths);
    });
  };

  thisObject.generateTableBody = function() {
    let tableBody = document.createElement('tbody');
    let previousDaysDeaths = 0;
    thisObject.chartConfig.data.labels.forEach(function(item, index) {
      let newRow = tableBody.insertRow();
      
      let newCell = newRow.insertCell();
      let newText = document.createTextNode(item);
      newCell.appendChild(newText);
  
      let dailyDeaths = thisObject.dailyDeaths.data[index];
      createCell(newRow, dailyDeaths);

      if (index > 0) {
        let changeInDeaths = dailyDeaths - previousDaysDeaths;
        let percentageChange = ((changeInDeaths * 100) / previousDaysDeaths).toFixed(2)
        createCell(newRow, changeInDeaths);
        createCell(newRow, percentageChange);
      } else {
        createCell(newRow, '-');
        createCell(newRow, '-');
      }
      previousDaysDeaths = dailyDeaths;
      createCell(newRow, thisObject.totalDeaths.data[index]);
    });
    return tableBody;
  };
  
  thisObject.generateCSV = function() {
    let retVal = new Array();
    retVal.push(csvHeader);
    let previousDaysDeaths = 0;
    thisObject.chartConfig.data.labels.forEach(function(item, index) {
      let csvData = new Array();
      let dailyDeaths = thisObject.dailyDeaths.data[index];
      
      csvData.push(item);
      csvData.push(dailyDeaths);      
      if (index > 0) {
          let changeInDeaths = dailyDeaths - previousDaysDeaths;
          let percentageChange = ((changeInDeaths * 100) / previousDaysDeaths).toFixed(2)
          csvData.push(changeInDeaths);
          csvData.push(percentageChange + '%');
      } else {
          csvData.push('-');
          csvData.push('-');
      }
      csvData.push(thisObject.totalDeaths.data[index]);
      previousDaysDeaths = dailyDeaths;
      retVal.push(csvData.join(','))
    });
    return retVal.join("\n");
  };
  
  function reset() {
    thisObject.chartConfig.data.labels = new Array();
    thisObject.dailyDeaths.data = new Array();
    thisObject.totalDeaths.data = new Array();
  }
};

const deaths = new DailyDeaths();