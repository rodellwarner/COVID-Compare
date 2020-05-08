







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





  

  $('#countries').append(`<option value="volvo">${arrayOfCountries[0]}</option>`);

  // let listOfSlugs = [];
  // for (let i = 0; i < responseJson.length; i++) {
  //   listOfSlugs.push(responseJson[i].Slug);
  // }
  // listOfSlugs.sort();
  // console.log(listOfSlugs);  
}




function handleSearchCovid19Data() {
  getListOfCountries();
}


$(handleSearchCovid19Data);