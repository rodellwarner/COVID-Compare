"use strict"

let arrayOfCountries = [];
const URL = "https://api.covid19api.com/live/country"

const graphURL = "https://quickchart.io/chart?c={type:'line',data:{labels:"

let graphDataDates = [];
let graphDataSetsCases = [];

function setInitialConditions() {
  $('#selectCountryForm').show();
  console.log("***setInitialConditions ran***")
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
  // for (let i = 0; i < responseJson.length; i++) {
  //   arrayOfCountries.push(responseJson[i].Country);
  // }
  // arrayOfCountries.sort();
  // console.log(arrayOfCountries);

  // function turnArrayOfCountriesIntoListOfCountries(arrayOfCountries) {
  //   function searchForSlug(nameKey, myArray) {
  //     for (let j = 0; j < myArray.length; j++) {
  //       if (myArray[j].Country === nameKey) {
  //         return myArray[j].Slug;
  //       }
  //     }
  //   }
  //   for (let i = 0; i < arrayOfCountries.length; i++) {
  //     let countryValue = searchForSlug(arrayOfCountries[i], responseJson);
  //     $('#countries').append(`<option value="${countryValue}">${arrayOfCountries[i]}</option>`);
  //   }
  //   }
  //   turnArrayOfCountriesIntoListOfCountries(arrayOfCountries);
  }

 
  function handleSubmitForm() {
    $('#selectCountryForm').submit(function() {
      event.preventDefault();
      getCovidData();
      displayGraph();
    });
  }

  function getCovidData() {
    console.log($("#countries").val());
    console.log($("#dataType").val());
    console.log($("#afterDate").val());
    fetch(URL + '/' + `${$("#countries").val()}` + '/status/' + `${$("#dataType").val()}` + '/date/' + `${$("#afterDate").val()}` + 'T00:00:00Z')
    .then(response => response.json())
    // .then(responseJsonCases => console.log(responseJsonCases))
    .then(responseJsonCases => aggregateGraphInfo(responseJsonCases))
    console.log('***getCovidData ran***');
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