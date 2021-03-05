function DailyVaccinations() {
  const thisObject = this;
  const csvHeader = ['Date,First Dose,Second Dose,Total,% Population With 1st Dose, % Population with 2nd Dose'];
  const population = 4977400;
  thisObject.data = new Array();
  thisObject.graphData = new Array();
  thisObject.name = 'vaccinations';
  thisObject.tableHead = '<tr><th>Date</th><th>First Dose</th><th>Second Dose</th><th>Total</th><th>Total 1st Dose</th><th>Total 2nd Dose</th><th>% Population With 1st Dose</th><th>% Population with 2nd Dose</th></tr>';
      
  thisObject.firstDose = {
    label: "First Dose",
    data: [],
    backgroundColor: "rgba(237, 100, 127, .6)",
    borderColor: "rgba(233,0,45, 1)",
    borderWidth: 0,
    yAxisID: "DosesAxis"
  };
  
  thisObject.secondDose = {
    label: "Second Dose",
    data: [],
    backgroundColor: "rgba(63, 63, 191, 0.6)",
    borderColor: "rgba(14, 54, 201, 0.5)",
    borderWidth: 0,
    yAxisID: "DosesAxis"
  };

  thisObject.populationFirstDose = {
    label: "% of Population - 1st Dose",
    data: [],
    backgroundColor: "transparent",
    borderColor: "red",
    borderWidth: 4,
    yAxisID: "VaccinatedAxis",
    type: "line"
  };
  
  thisObject.populationSecondDose = {
    label: "% of Population - 2nd Dose",
    data: [],
    backgroundColor: "transparent",
    borderColor: "green",
    borderWidth: 4,
    yAxisID: "VaccinatedAxis",
    type: "line"
  };
  
  thisObject.chartConfig = {
    type: "bar",
    data: {
      labels: [],
      datasets: [thisObject.firstDose, thisObject.secondDose, thisObject.populationFirstDose, thisObject.populationSecondDose]
    },
    options: {
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          id: "DosesAxis",
          stacked: true,
          position: "left",
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: "Total Vaccinated"
          }
        }, {
          id: "VaccinatedAxis",
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
        mode: 'label'
      }
    }
  };

  thisObject.populateData = function(items) {
    let totalFirstDose = 0;
    let totalSecondDose = 0;
    items.forEach(function(item, index) { 
      if (item.date && item.firstDose) {
        totalFirstDose += item.firstDose;
        let populationFirstDose = ((totalFirstDose * 100) / population).toFixed(2);
        let populationSecondDose = 0;
        if (item.secondDose) {
          totalSecondDose += item.secondDose;
          populationSecondDose = ((totalSecondDose * 100) / population).toFixed(2);
        }
        let vaccinatedData = {
          date: item.date,
          firstDose: item.firstDose,
          secondDose: item.secondDose,
          totalFirstDose: totalFirstDose,
          totalSecondDose: totalSecondDose,
          populationFirstDose: populationFirstDose,
          populationSecondDose: populationSecondDose
        };
        thisObject.data.push(vaccinatedData);
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
      thisObject.firstDose.data.push(value.firstDose);
      thisObject.secondDose.data.push(value.secondDose);
      thisObject.populationFirstDose.data.push(value.populationFirstDose);
      thisObject.populationSecondDose.data.push(value.populationSecondDose);
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
        thisObject.firstDose.data.push(value.firstDose);
        thisObject.secondDose.data.push(value.secondDose);
        thisObject.populationFirstDose.data.push(value.populationFirstDose);
        thisObject.populationSecondDose.data.push(value.populationSecondDose);
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
      let totalFirstDose = today.firstDose + yesterday.firstDose + twoDaysAgo.firstDose + threeDaysAgo.firstDose + fourDaysAgo.firstDose + fiveDaysAgo.firstDose + sixDayAgo.firstDose;
      let totalSecondDose = today.secondDose + yesterday.secondDose + twoDaysAgo.secondDose + threeDaysAgo.secondDose + fourDaysAgo.secondDose + fiveDaysAgo.secondDose + sixDayAgo.secondDose;
      let dailyDoses = totalFirstDose + totalSecondDose;
      thisObject.chartConfig.data.labels.push(prefix + today.date.toDateString());
      thisObject.firstDose.data.push((totalFirstDose / 7).toFixed(2));
      thisObject.secondDose.data.push((totalSecondDose / 7).toFixed(2));
      thisObject.populationFirstDose.data.push(today.populationFirstDose);
      thisObject.populationSecondDose.data.push(today.populationSecondDose);
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
        let totalFirstDose = today.firstDose + yesterday.firstDose + twoDaysAgo.firstDose + threeDaysAgo.firstDose + fourDaysAgo.firstDose + fiveDaysAgo.firstDose + sixDayAgo.firstDose;
        let totalSecondDose = today.secondDose + yesterday.secondDose + twoDaysAgo.secondDose + threeDaysAgo.secondDose + fourDaysAgo.secondDose + fiveDaysAgo.secondDose + sixDayAgo.secondDose;
        let dailyDoses = totalFirstDose + totalSecondDose;
        
        thisObject.chartConfig.data.labels.push('Week ending ' + today.date.toDateString());
        thisObject.firstDose.data.push(totalFirstDose);
        thisObject.secondDose.data.push(totalSecondDose);
        thisObject.populationFirstDose.data.push(today.populationFirstDose);
        thisObject.populationSecondDose.data.push(today.populationSecondDose);
      }
    }
  };

  thisObject.generateTableBody = function() {
    let tableBody = document.createElement('tbody');
    let previousDaysPositiveTests = 0;
    let totalFirstDose = 0;
    let totalSecondDose = 0;
    thisObject.graphData.forEach(function(item, index) {
      let csvData = new Array();
      // Insert date cell
      let newRow = tableBody.insertRow();
      let newCell = newRow.insertCell();
      let newText = document.createTextNode(item.date.toDateString());
      let totalDoses = Number(item.firstDose) + (item.secondDose ? Number(item.secondDose) : 0);

      totalFirstDose += item.firstDose;
      totalSecondDose += (item.secondDose ? Number(item.secondDose) : 0);
      
      newCell.appendChild(newText);
      createCell(newRow, item.firstDose);
      createCell(newRow, (item.secondDose ? item.secondDose : '-'));
      createCell(newRow, totalDoses);
      createCell(newRow, totalFirstDose);
      createCell(newRow, totalSecondDose);
      createCell(newRow, item.populationFirstDose);
      createCell(newRow, item.populationSecondDose);
    });
    return tableBody;
  };

  thisObject.generateCSV = function() {
    let retVal = new Array();
    let previousDaysPositiveTests = 0;
    retVal.push(csvHeader);
    thisObject.graphData.forEach(function(item, index) {
      let csvData = new Array();
      let totalDoses = Number(item.firstDose) + Number(item.secondDose);

      csvData.push(item.date.toDateString());
      csvData.push(dailyTests);
      csvData.push(item.firstDose);
      csvData.push(item.secondDose);
      csvData.push(totalDoses);
      csvData.push(item.populationFirstDose);
      csvData.push(item.populationSecondDose);
      retVal.push(csvData.join(','))
    });
    return retVal.join("\n");
  };

  thisObject.setTrendLine = function(displayTrendLine) {
    if (displayTrendLine) {
      thisObject.firstDose.trendlineLinear = positiveSwabsTrendLine;
      thisObject.secondDose.trendlineLinear = negativeSwabsTrendLine;
    } else {
      thisObject.firstDose.trendlineLinear = null;
      thisObject.secondDose.trendlineLinear = null;
    }
  }
  
  function reset() {  
    thisObject.chartConfig.data.labels = new Array();
    thisObject.firstDose.data = new Array();
    thisObject.secondDose.data = new Array();
    thisObject.populationFirstDose.data = new Array();
    thisObject.populationSecondDose.data = new Array();
  }
};

const vaccinations = new DailyVaccinations();
vaccinations.populateData(data);
