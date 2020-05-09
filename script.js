"use strict"

let arrayOfCountries = [];
const URL = "https://api.covid19api.com/live/country"

const graphURL = "https://quickchart.io/chart?c={type:'line',data:{labels:"

let graphDataDates = [];
let graphDataSetsCases = [];

function setInitialConditions() {
  $('#selectCountryForm').show();
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
      displayGraph();
    });
  }

  function getCovidData() {
    fetch(URL + '/' + `${$("#countries").val()}` + '/status/' + `${$("#dataType").val()}` + '/date/' + `${$("#afterDate").val()}` + 'T00:00:00Z')
    .then(response => response.json())
    .then(responseJsonCases => console.log(responseJsonCases))
    // .then(responseJsonCases => aggregateGraphInfo(responseJsonCases))
  }

  function aggregateGraphInfo(responseJsonCases) {
    console.log(responseJsonCases);
    for (let k = 0; k < responseJsonCases.length; k++) {
      graphDataDates.push(responseJsonCases[k].Date);
    }
    for (let l = 0; l < responseJsonCases.length; l++) {
    graphDataSetsCases.push(responseJsonCases[l].Confirmed);
    }
    console.log("graphDataDates", graphDataDates);
    console.log("graphDataSetsCases", graphDataSetsCases);
  }

  function displayGraph() {
    console.log(graphDataDates.map(date => toDateString(date)).join());
    console.log(graphDataSetsCases.toString());
    
    // console.log(graphURL + graphDataDates);
  }




function handleSearchCovid19Data() {
  setInitialConditions();
  getListOfCountries();
  handleSubmitForm();
}


$(handleSearchCovid19Data);