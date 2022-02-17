function DailyCases() {
  const thisObject = this;
  const csvHeader = ['Date,Daily Cases,Change In Cases,Percentage Change In Daily Cases,Total Cases'];
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
      
  thisObject.dailyAntigenCases = {
    label: "Antigen Cases",
    data: [],
    backgroundColor: "rgba(43, 57, 133, 0.5)",
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
      datasets: [thisObject.totalCases, thisObject.dailyCases, thisObject.dailyAntigenCases]
    },
    options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            id: "dailyCasesAxis",
            stacked: true,
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
                    return datasetLabel + ": " + Number(datasetValue).toLocaleString('en');
                } else {
                    total = total.toString().includes('.') ? roundToTwo(total) : total;
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
    let totalCases = 0;

    items.forEach(function(item, index) { 
      if (item.hasOwnProperty("date") && item.hasOwnProperty("cases")) {
        totalCases += item.cases; 
        let caseData = {
          date: item.date,
          cases: item.cases,
          antigen: item.antigen,
          totalCases: totalCases
        }
        if (index > 7) {
          let today = items[index];
          let yesterday = items[index - 1];
          let twoDaysAgo = items[index - 2];
          let threeDaysAgo = items[index - 3];
          let fourDaysAgo = items[index - 4];
          let fiveDaysAgo = items[index - 5];
          let sixDayAgo = items[index - 6];
          let weeklyCases = today.cases + yesterday.cases + twoDaysAgo.cases + threeDaysAgo.cases + fourDaysAgo.cases + fiveDaysAgo.cases + sixDayAgo.cases;
          let weeklyAntigen = testUndefined(today.antigen) + testUndefined(yesterday.antigen) + testUndefined(twoDaysAgo.antigen) + testUndefined(threeDaysAgo.antigen) + testUndefined(fourDaysAgo.antigen) + testUndefined(fiveDaysAgo.antigen) + testUndefined(sixDayAgo.antigen);
          caseData.sevenDayAverage = (weeklyCases / 7).toFixed(2);
          caseData.sevenDayAverageAntigen = (weeklyAntigen / 7).toFixed(2);
          if (item.date.getDay() === 0) {
              caseData.weeklyCases = weeklyCases;
              caseData.weeklyAntigen = weeklyAntigen;
          }
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
    thisObject.data.filter(item => (item.date > twoMonthsAgo))
                   .forEach(function(value, index) {
      thisObject.graphData.push(value);
    });
  };
  
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
  };

  thisObject.standardGraph = function() {
    reset();
    thisObject.graphData.forEach(function(value, index) {
      thisObject.chartConfig.data.labels.push(value.date.toDateString());
      thisObject.dailyCases.data.push(value.cases);
      thisObject.dailyAntigenCases.data.push(value.antigen);
      thisObject.totalCases.data.push(value.totalCases);
    });
  };

  thisObject.byDay = function(day) {
    reset();    
    thisObject.graphData.filter(item => (item.date.getDay() == day))
                        .forEach(function(value, index) { 
      thisObject.chartConfig.data.labels.push(value.date.toDateString());
      thisObject.dailyCases.data.push(value.cases);
      thisObject.dailyAntigenCases.data.push(value.antigen);
      thisObject.totalCases.data.push(value.totalCases);
    });
  };
  
  thisObject.dayAverage = function(increment, prefix) {
    reset();
    let todayDay = new Date().getDay();
    let initialIndex = thisObject.graphData.findIndex(function (value) { 
      return value.date.getDay() === todayDay && value.hasOwnProperty("sevenDayAverage");
    });
    for (let counter = initialIndex; counter < thisObject.graphData.length; counter += increment) {
      let today = thisObject.graphData[counter];
      thisObject.chartConfig.data.labels.push(prefix + today.date.toDateString());
      thisObject.dailyCases.data.push(today.sevenDayAverage);
      thisObject.dailyAntigenCases.data.push(today.sevenDayAverageAntigen);
      thisObject.totalCases.data.push(today.totalCases);
    }
  };

  thisObject.weeklyTotal = function() {
    reset();
    thisObject.graphData.filter(item => item.date.getDay() === 0 && item.hasOwnProperty("weeklyCases"))
                        .forEach(function (today, index) {
        thisObject.chartConfig.data.labels.push('Week ending ' + today.date.toDateString());
        thisObject.dailyCases.data.push(today.weeklyCases);
        thisObject.dailyAntigenCases.data.push(today.weeklyAntigen);
        thisObject.totalCases.data.push(today.totalCases);
      });
  };

  thisObject.generateTableBody = function() {
    let tableBody = document.createElement('tbody');
    let previousDaysCases = 0;
    thisObject.chartConfig.data.labels.forEach(function(item, index) {
      let newRow = tableBody.insertRow();
      let newCell = newRow.insertCell();
            
      let newText = document.createTextNode(item);
      newCell.appendChild(newText);
      
      let cases = thisObject.dailyCases.data[index];
      createCell(newRow, cases);
      if (index > 0) {
          let changeInCases = cases - previousDaysCases;
          let percentageChange = ((changeInCases * 100) / previousDaysCases).toFixed(2)
          createCell(newRow, changeInCases);
          createCell(newRow, percentageChange);
      } else {
          createCell(newRow, '-');
          createCell(newRow, '-');
      }
      createCell(newRow, thisObject.totalCases.data[index]);
      previousDaysCases = cases;
    });
    return tableBody;
  };  
  
  thisObject.generateCSV = function() {
    let retVal = new Array();
    let previousDaysCases = 0;
    retVal.push(csvHeader);
    thisObject.chartConfig.data.labels.forEach(function(item, index) {
      let csvData = new Array();
      let cases = thisObject.dailyCases.data[index];
      
      csvData.push(item);
      csvData.push(cases);
      if (index > 0) {
        let changeInCases = cases - previousDaysCases;
        let percentageChange = ((changeInCases * 100) / previousDaysCases).toFixed(2)
        csvData.push(changeInCases);
        csvData.push(percentageChange + '%');
      } else {
        csvData.push('-');
        csvData.push('-');
      }
      csvData.push(thisObject.totalCases.data[index]);
      previousDaysCases = cases;
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
    thisObject.dailyAntigenCases.data = new Array();
    thisObject.totalCases.data = new Array();
  }

  function testUndefined(value) {
    let retVal = value;
    if (!value) {
      retVal = 0;
    }
    return retVal;
  }
};

const cases = new DailyCases();
