function DailyVaccinations() {
  const thisObject = this;
  const csvHeader = ['Date,First Dose,Second Dose,Total Daily Dose,Total 1st Dose,Total 2nd Dose,% Population With 1st Dose,% Population with 2nd Dose'];
  const population = 4977400;

  thisObject.data = new Array();
  thisObject.graphData = new Array();
  thisObject.name = 'vaccinations';
  thisObject.tableHead = '<tr><th>Date</th><th>First Dose</th><th>Second Dose</th><th>Total Daily Dose</th><th>Total 1st Dose</th><th>Total 2nd Dose</th><th>% Population With 1st Dose</th><th>% Population with 2nd Dose</th></tr>';
      
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
    label: "Population - 1st Dose",
    data: [],
    backgroundColor: "transparent",
    borderColor: "red",
    borderWidth: 4,
    yAxisID: "VaccinatedAxis",
    type: "line"
  };
  
  thisObject.populationSecondDose = {
    label: "Population - 2nd Dose",
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
            labelString: "Population Vaccinated"
          }
        }]
      },
      tooltips: {
        mode: 'label',
        callbacks: {
          label: function (tooltipItem, data) {
            let datasetLabel = data.datasets[tooltipItem.datasetIndex].label;
            let datasetValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            let totalDailyDose = 0;
            let totalVaccinesAdministered = 0;
            for (let i = 0; i < data.datasets.length; i++) {
              if (data.datasets[i].label === 'First Dose' || data.datasets[i].label === 'Second Dose') {
                totalDailyDose += Number(data.datasets[i].data[tooltipItem.index]);
              }
              if (data.datasets[i].label === 'Population - 1st Dose' || data.datasets[i].label === 'Population - 2nd Dose') {
                totalVaccinesAdministered += Number(data.datasets[i].data[tooltipItem.index]);
              }
            }
            if (datasetLabel.includes('Second Dose')) {
              totalDailyDose = totalDailyDose.toString().includes('.') ? roundToTwo(totalDailyDose) : totalDailyDose;
              return [datasetLabel + ": " + Number(datasetValue).toLocaleString('en'), 'Total Doses: ' + totalDailyDose.toLocaleString('en')];
            } if (datasetLabel.includes('Population - 1st Dose')) {
              let percentageVaccinated = ((datasetValue * 100) / population).toFixed(2);
              return datasetLabel + ": " + datasetValue.toLocaleString('en') + '(' + percentageVaccinated + '%)';
            } if (datasetLabel.includes('Population - 2nd Dose')) {
              let percentageVaccinated = ((datasetValue * 100) / population).toFixed(2);
              return [datasetLabel + ": " + datasetValue.toLocaleString('en') + '(' + percentageVaccinated + '%)', 'Total Doses Administered: ' + totalVaccinesAdministered.toLocaleString('en')];
            } else {
                return datasetLabel + ": " + Number(datasetValue).toLocaleString('en');
            }
          }
        }
      }
    }
  };

  thisObject.populateData = function(items) {
    let totalFirstDose = 0;
    let totalSecondDose = 0;
    items.forEach(function(item, index) { 
      if (item.hasOwnProperty("date") && item.hasOwnProperty("firstDose")) {
        totalFirstDose += item.firstDose;
        let populationFirstDose = ((totalFirstDose * 100) / population).toFixed(2);
        let populationSecondDose = 0;
        if (item.hasOwnProperty("secondDose")) {
          totalSecondDose += item.secondDose;
          populationSecondDose = ((totalSecondDose * 100) / population).toFixed(2);
        }
        let vaccinatedData = {
          date: item.date,
          firstDose: item.firstDose,
          secondDose: (item.hasOwnProperty("secondDose") ? item.secondDose : 0),
          totalFirstDose: totalFirstDose,
          totalSecondDose: totalSecondDose,
          populationFirstDose: populationFirstDose,
          populationSecondDose: populationSecondDose
        };
        if (index > 7) {
          let today = items[index];
          let yesterday = items[index - 1];
          let twoDaysAgo = items[index - 2];
          let threeDaysAgo = items[index - 3];
          let fourDaysAgo = items[index - 4];
          let fiveDaysAgo = items[index - 5];
          let sixDayAgo = items[index - 6];
          let sevenDayTotalFirstDoses = today.firstDose + yesterday.firstDose + twoDaysAgo.firstDose + threeDaysAgo.firstDose + fourDaysAgo.firstDose + fiveDaysAgo.firstDose + sixDayAgo.firstDose;
          let sevenDayTotalSecondDoses = today.secondDose + yesterday.secondDose + twoDaysAgo.secondDose + threeDaysAgo.secondDose + fourDaysAgo.secondDose + fiveDaysAgo.secondDose + sixDayAgo.secondDose;
          vaccinatedData.sevenDayAverageFirstDose = (sevenDayTotalFirstDoses / 7).toFixed(2);
          vaccinatedData.sevenDayAverageSecondDose = (sevenDayTotalSecondDoses / 7).toFixed(2);
          if (item.date.getDay() === 0) {
            vaccinatedData.weeklyFirstDoses = sevenDayTotalFirstDoses;
            vaccinatedData.weeklySecondDoses = sevenDayTotalSecondDoses;
          }
        }
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

  thisObject.standardGraph = function() {
    reset();
    thisObject.graphData.forEach(function(value, index) { 
      thisObject.chartConfig.data.labels.push(value.date.toDateString());
      thisObject.firstDose.data.push(value.firstDose);
      thisObject.secondDose.data.push(value.secondDose);
      thisObject.populationFirstDose.data.push(value.totalFirstDose);
      thisObject.populationSecondDose.data.push(value.totalSecondDose);
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
    thisObject.graphData.filter(item => (item.date.getDay() == day))
                        .forEach(function(value, index) {
      thisObject.chartConfig.data.labels.push(value.date.toDateString());
      thisObject.firstDose.data.push(value.firstDose);
      thisObject.secondDose.data.push(value.secondDose);
      thisObject.populationFirstDose.data.push(value.totalFirstDose);
      thisObject.populationSecondDose.data.push(value.totalSecondDose);
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
      thisObject.firstDose.data.push(today.sevenDayAverageFirstDose);
      thisObject.secondDose.data.push(today.sevenDayAverageSecondDose);
      thisObject.populationFirstDose.data.push(today.totalFirstDose);
      thisObject.populationSecondDose.data.push(today.totalSecondDose);
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
    thisObject.graphData.filter(item => (item.date.getDay() === 0 && item.hasOwnProperty("weeklyFirstDoses")))
                        .forEach(function (today, index) {
      thisObject.chartConfig.data.labels.push('Week ending ' + today.date.toDateString());
      thisObject.firstDose.data.push(today.weeklyFirstDoses);
      thisObject.secondDose.data.push(today.weeklySecondDoses);
      thisObject.populationFirstDose.data.push(today.totalFirstDose);
      thisObject.populationSecondDose.data.push(today.totalSecondDose);
    });
  };

  thisObject.generateTableBody = function() {
    let tableBody = document.createElement('tbody');
    let totalFirstDose = 0;
    let totalSecondDose = 0;
    thisObject.chartConfig.data.labels.forEach(function(item, index) {
      // Insert date cell
      let newRow = tableBody.insertRow();
      let newCell = newRow.insertCell();
      let newText = document.createTextNode(item);
      let firstDose = Number(thisObject.firstDose.data[index]);
      let secondDose = (thisObject.secondDose.data[index] ? Number(thisObject.secondDose.data[index]) : 0);
      let populationFirstDose = Number(thisObject.populationFirstDose.data[index]);
      let populationSecondDose = (thisObject.populationSecondDose.data[index] ? Number(thisObject.populationSecondDose.data[index]) : 0);

      let totalDoses = firstDose + secondDose;

      totalFirstDose += firstDose;
      totalSecondDose += secondDose;
      
      newCell.appendChild(newText);
      createCell(newRow, firstDose);
      createCell(newRow, (secondDose ? secondDose : '-'));
      createCell(newRow, totalDoses);
      createCell(newRow, populationFirstDose);
      createCell(newRow, populationSecondDose);
      createCell(newRow, ((populationFirstDose * 100) / population).toFixed(2));
      createCell(newRow, ((populationSecondDose * 100) / population).toFixed(2));
    });
    return tableBody;
  };

  thisObject.generateCSV = function() {
    let retVal = new Array();
    let totalFirstDose = 0;
    let totalSecondDose = 0;
    retVal.push(csvHeader);
    thisObject.chartConfig.data.labels.forEach(function(item, index) {
      let csvData = new Array();
      let firstDose = Number(thisObject.firstDose.data[index]);
      let secondDose = (thisObject.secondDose.data[index] ? Number(thisObject.secondDose.data[index]) : 0);
      let populationFirstDose = Number(thisObject.populationFirstDose.data[index]);
      let populationSecondDose = (thisObject.populationSecondDose.data[index] ? Number(thisObject.populationSecondDose.data[index]) : 0);
      let totalDoses = firstDose + secondDose;

      totalFirstDose += firstDose;
      totalSecondDose += secondDose;
      csvData.push(item);
      csvData.push(firstDose);
      csvData.push(secondDose);
      csvData.push(totalDoses);
      csvData.push(totalFirstDose);
      csvData.push(totalSecondDose);
      csvData.push(((populationFirstDose * 100) / population).toFixed(2));
      csvData.push(((populationSecondDose * 100) / population).toFixed(2));
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
