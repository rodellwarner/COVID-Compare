"use strict"

let arrayOfCountries = [];
// let arrayOfSlugs = []

function setInitialConditions() {
  $('#selectCountryForm').show();
  console.log("***setInitialConditions ran***")
}

function getListOfCountries() {
  fetch('https://api.covid19api.com/countries')
  .then(response => response.json())
  // .then(responseJson => console.log(responseJson))
  .then(responseJson => createSelectElement(responseJson));
}

function createSelectElement(responseJson) {
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
    console.log('***getCountryData ran***');
  }





// }
 

  // let listOfSlugs = [];
  // for (let i = 0; i < responseJson.length; i++) {
  //   listOfSlugs.push(responseJson[i].Slug);
  // }
  // listOfSlugs.sort();
  // console.log(listOfSlugs);  





function handleSearchCovid19Data() {
  setInitialConditions();
  getListOfCountries();
  handleSubmitForm();
}


$(handleSearchCovid19Data);