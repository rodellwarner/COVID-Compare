"use strict"

function getListOfCountries() {
  fetch('https://api.covid19api.com/countries')
  .then(response => response.json())
  // .then(responseJson => console.log(responseJson))
  .then(responseJson => createSelectElement(responseJson));
}

function createSelectElement(responseJson) {
  console.log(responseJson);
  let arrayOfCountries = [];
  for (let i = 0; i < responseJson.length; i++) {
    arrayOfCountries.push(responseJson[i].Country);
  }
  arrayOfCountries.sort();
  console.log(arrayOfCountries);

  function turnArrayOfCountriesIntoListOfCountries(arrayOfCountries) {
    for (let i = 0; i < arrayOfCountries.length; i++) {
      $('#countries').append(`<option value="volvo">${arrayOfCountries[i]}</option>`);
    }
    fetch('https://api.covid19api.com/countries')
    .then(response => response.json())
    .then(responseJson => console.log(responseJson))
    }

    turnArrayOfCountriesIntoListOfCountries(arrayOfCountries);

  }

 

  // let listOfSlugs = [];
  // for (let i = 0; i < responseJson.length; i++) {
  //   listOfSlugs.push(responseJson[i].Slug);
  // }
  // listOfSlugs.sort();
  // console.log(listOfSlugs);  





function handleSearchCovid19Data() {
  getListOfCountries();
}


$(handleSearchCovid19Data);