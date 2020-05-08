"use strict"

let arrayOfCountries = [];
// let arrayOfSlugs = []
const URL = "https://api.covid19api.com/live/country"

function setInitialConditions() {
  $('#selectCountryForm').show();
  console.log("***setInitialConditions ran***")
}

function clearResults() {
  $('#countries').empty();
}

function getListOfCountries() {
  fetch('https://api.covid19api.com/countries')
  .then(response => response.json())
  // .then(responseJson => console.log(responseJson))
  .then(responseJson => createSelectElement(responseJson));
}

function createSelectElement(responseJson) {
  clearResults();
  // console.log(responseJson);
  // let arrayOfCountries = [];
  for (let i = 0; i < responseJson.length; i++) {
    arrayOfCountries.push(responseJson[i].Country);
    // arrayOfSlugs.push(responseJson[i].Slug);
  }
  arrayOfCountries.sort();
  console.log(arrayOfCountries);

  function turnArrayOfCountriesIntoListOfCountries(arrayOfCountries) {
    function searchForSlug(nameKey, myArray) {
      for (let j = 0; j < myArray.length; j++) {
        if (myArray[j].Country === nameKey) {
          return myArray[j].Slug;
        }
      }
    }
    for (let i = 0; i < arrayOfCountries.length; i++) {
      let countryValue = searchForSlug(arrayOfCountries[i], responseJson);
      // console.log(countryValue);
      // console.log(responseJson);
      $('#countries').append(`<option value="${countryValue}">${arrayOfCountries[i]}</option>`);
    }
    }
    turnArrayOfCountriesIntoListOfCountries(arrayOfCountries);
  }

 
  function handleSubmitForm() {
    $('#selectCountryForm').submit(function() {
      event.preventDefault();
      getCountryData();
    });
  }

  function getCountryData() {
    console.log($("#countries").val());
    console.log($("#dataType").val());
    console.log($("#afterDate").val());
    fetch(URL + '/' + `${$("#countries").val()}` + '/status/' + `${$("#dataType").val()}` + '/date/' + `${$("#afterDate").val()}` + 'T00:00:00Z')
    .then(response => response.json())
    .then(responseJson => console.log(responseJson))
    console.log('***getCountryData ran***');
  }



function handleSearchCovid19Data() {
  setInitialConditions();
  getListOfCountries();
  handleSubmitForm();
}


$(handleSearchCovid19Data);