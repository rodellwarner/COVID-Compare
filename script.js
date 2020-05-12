"use strict"

const URL = "https://api.covid19api.com/live/country"

const graphURL = "https://quickchart.io/chart?c={type:'line',data:{labels:["

function setInitialConditions() {
  $('#selectCountryForm').show();
  $('#graphDisplay').show();
}

function clearResults() {
  $('#countries').empty();
}

function clearGraph() {
  $('#graphDisplay').empty();
  }

function getListOfCountries() {
  fetch('https://api.covid19api.com/countries')
  .then(response => response.json())
  .then(responseJson => {
    const sortedCountries = responseJson.sort(function compare(countryA, countryB) {
      if (countryA.Country < countryB.Country) {
        return -1;
      }
      else if (countryA.Country > countryB.Country) {
        return 1;
      }
      else {
        return 0;
      }
    });
    createSelectElement(sortedCountries);
  });
}

function createSelectElement(responseJson) {
  clearResults();
  clearGraph();
  const populateListOfCountries = responseJson.forEach(element => {
    $('#countries').append(`<option value="${element.Slug}">${element.Country}</option>`);
  });
  }

 
  function handleSubmitForm() {
    $('#selectCountryForm').submit(function() {
      event.preventDefault();
      getCovidData();
    });
  }

  function getCovidData() {
    fetch(URL + '/' + `${$("#countries").val()}` + '/status/' + `${$("#dataType").val()}` + '/date/' + `${$("#afterDate").val()}` + 'T00:00:00Z')
    .then(response => response.json())
    .then(responseJsonCovidData => showGraph(responseJsonCovidData))
  }

  function showGraph(responseJsonCovidData) {
    let datesForGraphs = [];
    let dataSetsForGraph = [];
    const separateOutDatesAndDatasets = responseJsonCovidData.forEach(element => {
      datesForGraphs.push(element.Date);
      if ($("#dataType").val() === 'confirmed') {
        dataSetsForGraph.push(element.Confirmed);
      }
      else if ($("#dataType").val() === 'recovered') {
        dataSetsForGraph.push(element.Recovered);
      }
      else if ($("#dataType").val() === 'deaths') {
        dataSetsForGraph.push(element.Deaths);
      }
    }); 

    
    let finalDates = [];
    function datesForGraphFormatted(arrayOfDates) {
      (arrayOfDates).forEach(date => {
        finalDates.push(`'${date}'`)
      });
    }
    datesForGraphFormatted(datesForGraphs);
    console.log(finalDates);


    let finalNumbers = [];
    function numbersOfCasesForGraphFormatted(arrayOfNumbersOfCases) {
      arrayOfNumbersOfCases.forEach(numberOfCases => {
        finalNumbers.push(`'${numberOfCases}'`)
      });
    }
    numbersOfCasesForGraphFormatted(dataSetsForGraph);
    console.log(finalNumbers);

   

    let imageURL = graphURL + finalDates + '], datasets:[{label:\'' + `${$("#dataType").val()}` + '\', data:[' + finalNumbers + '],fill:\'false\'}]}}'

    

    console.log(imageURL);

    // console.log(datesForGraphs.map(date => toDateString(date)).join());

  }

    
  


function handleSearchCovid19Data() {
  setInitialConditions();
  getListOfCountries();
  handleSubmitForm();
}


$(handleSearchCovid19Data);