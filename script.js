







function getListOfCountries() {
  fetch('https://api.covid19api.com/countries')
  .then(response => response.json())
  // .then(responseJson => console.log(responseJson))
  .then(responseJson => createSelectElement(responseJson));
}

function createSelectElement(responseJson) {
  // $('#countries')
  // console.log(responseJson);
  let listOfCountries = [];
  for (let i = 0; i < responseJson.length; i++) {
    listOfCountries.push(responseJson[i].Country);
  }
  listOfCountries.sort();
  console.log(listOfCountries);

  let listOfSlugs = [];
  for (let i = 0; i < responseJson.length; i++) {
    listOfSlugs.push(responseJson[i].Slug);
  }
  listOfSlugs.sort();
  console.log(listOfSlugs);  
}




function handleSearchCovid19Data() {
  getListOfCountries();
}


$(handleSearchCovid19Data);