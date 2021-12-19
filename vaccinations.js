function DailyVaccinations() {
  const thisObject = this;
  const columns = ['Date','First Dose','Second Dose','Single Dose','Booster','Total Daily Dose','Total 1st Dose','Total 2nd Dose','Total Single Dose','Total Booster', '% Population With 1st Dose','% Population with 2nd Dose','% Population with Single Dose', '% Booster'];
  const csvHeader = [columns.join(',')];
  const population = 4977400;

  thisObject.data = new Array();
  thisObject.graphData = new Array();
  thisObject.name = 'vaccinations';

  thisObject.tableHead = '<tr><th>' + columns.join('</th><th>') + '</th></tr>';
      
  thisObject.firstDose = {
    label: "First Dose",
    data: [],
    backgroundColor: "rgba(237, 100, 127, .6)",
    borderColor: "rgba(233,0,45, 1)",
    borderWidth: 0,
    yAxisID: "DosesAxis",
    order: 2
  };
  
  thisObject.secondDose = {
    label: "Second Dose",
    data: [],
    backgroundColor: "rgba(63, 63, 191, 0.6)",
    borderColor: "rgba(14, 54, 201, 0.5)",
    borderWidth: 0,
    yAxisID: "DosesAxis",
    order: 2
  };

  thisObject.singleDose = {
    label: "Single Dose",
    data: [],
    backgroundColor: "rgba(150, 81, 159, 0.6)",
    borderColor: "rgba(14, 54, 201, 0.5)",
    borderWidth: 0,
    yAxisID: "DosesAxis",
    order: 2
  };

  thisObject.booster = {
    label: "Booster",
    data: [],
    backgroundColor: "rgba(0, 168, 168)",
    borderColor: "rgba(14, 54, 201, 0.5)",
    borderWidth: 0,
    yAxisID: "DosesAxis",
    order: 2
  };

  thisObject.populationFirstDose = {
    label: "Population - 1st Dose",
    data: [],
    backgroundColor: "transparent",
    borderColor: "red",
    borderWidth: 4,
    yAxisID: "VaccinatedAxis",
    type: "line",
    order: 1
  };
  
  thisObject.populationSecondDose = {
    label: "Population - 2nd Dose",
    data: [],
    backgroundColor: "transparent",
    borderColor: "green",
    borderWidth: 4,
    yAxisID: "VaccinatedAxis",
    type: "line",
    order: 1
  };
  
  thisObject.populationSingleDose = {
    label: "Population - Single Dose",
    data: [],
    backgroundColor: "transparent",
    borderColor: "orange",
    borderWidth: 4,
    yAxisID: "VaccinatedAxis",
    type: "line",
    order: 1
  };
  
  thisObject.populationBooster = {
    label: "Population - Booster",
    data: [],
    backgroundColor: "transparent",
    borderColor: "yellow",
    borderWidth: 4,
    yAxisID: "VaccinatedAxis",
    type: "line",
    order: 1
  };
  
  thisObject.chartConfig = {
    type: "bar",
    data: {
      labels: [],
      datasets: [thisObject.firstDose, thisObject.secondDose, thisObject.singleDose, thisObject.booster, thisObject.populationFirstDose, thisObject.populationSecondDose, thisObject.populationSingleDose, thisObject.populationBooster]
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
            beginAtZero: true,
            min: 0
          },
          scaleLabel: {
            display: true,
            labelString: "Total Vaccinated"
          }
        }, {
          id: "VaccinatedAxis",
          position: "right",
          ticks: {
            beginAtZero: true,
            min: 0
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
              if (data.datasets[i].label === 'Population - 1st Dose' || data.datasets[i].label === 'Population - 2nd Dose' || data.datasets[i].label === 'Population - Single Dose') {
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
    let totalSingleDose = 0;
    let totalBooster = 0;
    items.forEach(function(item, index) { 
      if (item.hasOwnProperty("date") && item.hasOwnProperty("firstDose")) {
        totalFirstDose += item.firstDose;
        let populationFirstDose = ((totalFirstDose * 100) / population).toFixed(2);
        let populationSecondDose = 0;
        let populationSingleDose = 0;
        let populationBooster = 0;
        if (item.hasOwnProperty("secondDose")) {
          totalSecondDose += item.secondDose;
          populationSecondDose = ((totalSecondDose * 100) / population).toFixed(2);
        }
        if (item.hasOwnProperty("singleDose")) {
          totalSingleDose += item.singleDose;
          populationSingleDose = ((totalSingleDose * 100) / population).toFixed(2);
        }
        if (item.hasOwnProperty("booster")) {
          totalBooster += item.booster;
          populationBooster = ((totalBooster * 100) / population).toFixed(2);
        }
        let vaccinatedData = {
          date: item.date,
          firstDose: item.firstDose,
          secondDose: (item.hasOwnProperty("secondDose") ? item.secondDose : 0),
          singleDose: (item.hasOwnProperty("singleDose") ? item.singleDose : 0),
          booster: (item.hasOwnProperty("booster") ? item.booster : 0),
          totalFirstDose: totalFirstDose,
          totalSecondDose: totalSecondDose,
          totalSingleDose: totalSingleDose,
          totalBooster: totalBooster,
          populationFirstDose: populationFirstDose,
          populationSecondDose: populationSecondDose,
          populationBooster: populationBooster
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
          let sevenDayTotalSingleDoses = today.singleDose + yesterday.singleDose + twoDaysAgo.singleDose + threeDaysAgo.singleDose + fourDaysAgo.singleDose + fiveDaysAgo.singleDose + sixDayAgo.singleDose;
          let sevenDayTotalBooster = today.booster + yesterday.booster + twoDaysAgo.booster + threeDaysAgo.booster + fourDaysAgo.booster + fiveDaysAgo.booster + sixDayAgo.booster;
          vaccinatedData.sevenDayAverageFirstDose = (sevenDayTotalFirstDoses / 7).toFixed(2);
          vaccinatedData.sevenDayAverageSecondDose = (sevenDayTotalSecondDoses / 7).toFixed(2);
          vaccinatedData.sevenDayAverageSecondDose = (sevenDayTotalSecondDoses / 7).toFixed(2);
          vaccinatedData.sevenDayAverageSingleDose = (sevenDayTotalSingleDoses / 7).toFixed(2);
          vaccinatedData.sevenDayAverageBooster = (sevenDayTotalBooster / 7).toFixed(2);
          if (item.date.getDay() === 0) {
            vaccinatedData.weeklyFirstDoses = sevenDayTotalFirstDoses;
            vaccinatedData.weeklySecondDoses = sevenDayTotalSecondDoses;
            vaccinatedData.weeklySingleDoses = sevenDayTotalSingleDoses;
            vaccinatedData.weeklyBooster = sevenDayTotalBooster;
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
      thisObject.singleDose.data.push(value.singleDose);
      thisObject.booster.data.push(value.booster);
      thisObject.populationFirstDose.data.push(value.totalFirstDose);
      thisObject.populationSecondDose.data.push(value.totalSecondDose);
      thisObject.populationSingleDose.data.push(value.totalSingleDose);
      thisObject.populationBooster.data.push(value.totalBooster);
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
      thisObject.singleDose.data.push(value.singleDose);
      thisObject.booster.data.push(value.booster);
      thisObject.populationFirstDose.data.push(value.totalFirstDose);
      thisObject.populationSecondDose.data.push(value.totalSecondDose);
      thisObject.populationSingleDose.data.push(value.totalSingleDose);
      thisObject.populationBooster.data.push(value.totalBooster);
    });
  };
  
  thisObject.dayAverage = function(increment, prefix) {
    reset();
    let todayDay = new Date().getDay();
    let initialIndex = thisObject.graphData.findIndex(function (value) { 
      return value.date.getDay() === todayDay && value.hasOwnProperty("sevenDayAverageFirstDose");
    });
    for (let counter = initialIndex; counter < thisObject.graphData.length; counter += increment) {
      let today = thisObject.graphData[counter];
      thisObject.chartConfig.data.labels.push(prefix + today.date.toDateString());
      thisObject.firstDose.data.push(today.sevenDayAverageFirstDose);
      thisObject.secondDose.data.push(today.sevenDayAverageSecondDose);
      thisObject.singleDose.data.push(today.sevenDayAverageSingleDose);
      thisObject.populationFirstDose.data.push(today.totalFirstDose);
      thisObject.populationSecondDose.data.push(today.totalSecondDose);
      thisObject.populationSingleDose.data.push(today.totalSingleDose);
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
      thisObject.singleDose.data.push(today.weeklySingleDoses);
      thisObject.populationFirstDose.data.push(today.totalFirstDose);
      thisObject.populationSecondDose.data.push(today.totalSecondDose);
      thisObject.populationSingleDose.data.push(today.totalSingleDose);
    });
  };

  thisObject.generateTableBody = function() {
    let tableBody = document.createElement('tbody');
    let totalFirstDose = 0;
    let totalSecondDose = 0;
    let totalSingleDose = 0;
    thisObject.chartConfig.data.labels.forEach(function(item, index) {
      // Insert date cell
      let newRow = tableBody.insertRow();
      let newCell = newRow.insertCell();
      let newText = document.createTextNode(item);
      let firstDose = Number(thisObject.firstDose.data[index]);
      let secondDose = (thisObject.secondDose.data[index] ? Number(thisObject.secondDose.data[index]) : 0);
      let singleDose = (thisObject.singleDose.data[index] ? Number(thisObject.singleDose.data[index]) : 0);
      let booster = (thisObject.booster.data[index] ? Number(thisObject.booster.data[index]) : 0);
      let populationFirstDose = Number(thisObject.populationFirstDose.data[index]);
      let populationSecondDose = (thisObject.populationSecondDose.data[index] ? Number(thisObject.populationSecondDose.data[index]) : 0);
      let populationSingleDose = (thisObject.populationSingleDose.data[index] ? Number(thisObject.populationSingleDose.data[index]) : 0);
      let populationBooster = (thisObject.populationBooster.data[index] ? Number(thisObject.populationBooster.data[index]) : 0);

      let totalDoses = firstDose + secondDose + singleDose + booster;

      totalFirstDose += firstDose;
      totalSecondDose += secondDose;
      totalSingleDose += singleDose;
      
      newCell.appendChild(newText);
      createCell(newRow, firstDose);
      createCell(newRow, (secondDose ? secondDose : '-'));
      createCell(newRow, (singleDose ? singleDose : '-'));
      createCell(newRow, (booster ? booster : '-'));
      createCell(newRow, totalDoses);
      createCell(newRow, populationFirstDose);
      createCell(newRow, populationSecondDose);
      createCell(newRow, populationSingleDose);
      createCell(newRow, populationBooster);
      createCell(newRow, ((populationFirstDose * 100) / population).toFixed(2));
      createCell(newRow, ((populationSecondDose * 100) / population).toFixed(2));
      createCell(newRow, ((populationSingleDose * 100) / population).toFixed(2));
      createCell(newRow, ((populationBooster * 100) / population).toFixed(2));
    });
    return tableBody;
  };

  thisObject.generateCSV = function() {
    let retVal = new Array();
    let totalFirstDose = 0;
    let totalSecondDose = 0;
    let totalSingleDose = 0;
    retVal.push(csvHeader);
    thisObject.chartConfig.data.labels.forEach(function(item, index) {
      let csvData = new Array();
      let firstDose = Number(thisObject.firstDose.data[index]);
      let secondDose = (thisObject.secondDose.data[index] ? Number(thisObject.secondDose.data[index]) : 0);
      let singleDose = (thisObject.singleDose.data[index] ? Number(thisObject.singleDose.data[index]) : 0);
      let booster = (thisObject.booster.data[index] ? Number(thisObject.booster.data[index]) : 0);
      let populationFirstDose = Number(thisObject.populationFirstDose.data[index]);
      let populationSecondDose = (thisObject.populationSecondDose.data[index] ? Number(thisObject.populationSecondDose.data[index]) : 0);
      let populationSingleDose = (thisObject.populationSingleDose.data[index] ? Number(thisObject.populationSingleDose.data[index]) : 0);
      let populationBooster = (thisObject.populationBooster.data[index] ? Number(thisObject.populationBooster.data[index]) : 0);
      let totalDoses = firstDose + secondDose + singleDose + booster;

      totalFirstDose += firstDose;
      totalSecondDose += secondDose;
      totalSingleDose += singleDose;

      csvData.push(item);
      csvData.push(firstDose);
      csvData.push(secondDose);
      csvData.push(singleDose);
      csvData.push(booster);
      csvData.push(totalDoses);
      csvData.push(totalFirstDose);
      csvData.push(totalSecondDose);
      csvData.push(populationSingleDose);
      csvData.push(populationBooster);
      csvData.push(((populationFirstDose * 100) / population).toFixed(2));
      csvData.push(((populationSecondDose * 100) / population).toFixed(2));
      csvData.push(((populationSingleDose * 100) / population).toFixed(2));
      csvData.push(((populationBooster * 100) / population).toFixed(2));
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
    thisObject.singleDose.data = new Array();
    thisObject.booster.data = new Array();
    thisObject.populationFirstDose.data = new Array();
    thisObject.populationSecondDose.data = new Array();
    thisObject.populationBooster.data = new Array();
  }
};

const vaccinations = new DailyVaccinations();
