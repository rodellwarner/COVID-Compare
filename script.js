"use strict"

let STORE = [];

const apiKey = "7389ed1c464847618909833f40f394de"
const newsURL = "https://newsapi.org/v2/everything?"


// function setInitialConditions() {
//   $('#selectCountryForm').show();
// }

function clearResults() {
  $('#countries').empty();
}

function clearGraph() {
  $('#graphDisplay').empty();
}

function clearStatsDetails() {
  $('#statsDetails').empty();
  $('#statsDetails2').empty();
}

function getListOfCountries() {
  fetch('https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true')
  .then(response => response.json())
  .then(responseJson => {
    const sortedCountries = responseJson.sort(function compare(countryA, countryB) {
      if (countryA.country < countryB.country) {
        return -1;
      }
      else if (countryA.country > countryB.country) {
        return 1;
      }
      else {
        return 0;
      }
    });
    createSelectElement(sortedCountries);
  });
}

function createSelectElement(sortedCountries) {
  STORE = sortedCountries;
  clearResults();
  clearGraph();
  const populateListOfCountries = sortedCountries.forEach(element => {
    $('#countries').append(`<option value="${element.country}">${element.country}</option>`);
    $('#countries2').append(`<option value="${element.country}">${element.country}</option>`);
  });
}

function handleSubmitForm() {
  $('#selectCountryForm').submit(function() {
    clearGraph();
    clearStatsDetails();
    event.preventDefault();
    getCovidData();
  });
}

function getCovidData() {
  let country1 = `${$("#countries").val()}`;
  let country2 = `${$("#countries2").val()}`;
  let chosenObject1 = STORE.filter(object => object.country === country1);
  let chosenObject2 = STORE.filter(object => object.country === country2);
  showGraph(chosenObject1, chosenObject2);
  prepareNews(chosenObject1, chosenObject2);
}

function showGraph(object1, object2) {
  let country1 = `${$("#countries").val()}`;
  let country2 = `${$("#countries2").val()}`;
  // let numbersDeceased = `%27${object1[0].deceased}%27,%27${object2[0].deceased}%27`;
  // console.log('numbersDeceased', numbersDeceased);
  let numbersDeceased = [object1[0].deceased,object2[0].deceased];
  let numbersInfected = [object1[0].infected, object2[0].infected];
  let numbersInfectedJoined = numbersInfected.join();
  let countryNames = `%27${object1[0].country}%27,%27${object2[0].country}%27`;
  // let imageURLBeforeReplace = `https://quickchart.io/chart?c={type:%27bar%27,data:{labels:[${countryNames}],datasets:[{label:%27Infected%27,data:[${numbersInfectedJoined}]}]}}`
  // console.log(encodeURIComponent(imageURL));
  let imageURLBeforeReplace = `https://quickchart.io/chart?c={type:%27bar%27,data:{labels:[${countryNames}],datasets:[{label:%27Infected%27,data:[${numbersInfectedJoined}]},{label:%27Deceased%27,data:[${numbersDeceased}]}]}}`
  let imageURL = imageURLBeforeReplace.replace(/\s+/g, '');
  $('#statsDetails').append(`<br>${country1} infected = ${numbersInfected[0]} <br>`);
  $('#statsDetails').append(`${country2} infected = ${numbersInfected[1]} <br>`);
  $('#statsDetails').append(`<br>${country1} deceased = ${numbersDeceased[0]} <br>`)
  $('#statsDetails').append(`${country2} deceased = ${numbersDeceased[1]} <br>`)
  $('#graphDisplay').append(`<img src=${imageURL}>`);
  $('#graphDisplay').show();
  $('#statsDetails2').append(`<br>last updated = ${object1[0].lastUpdatedApify}`);
}


function prepareNews(objectA, objectB) {
  // console.log("objectA", objectA, "objectB", objectB);
  let firstCountry = objectA[0].country;
  console.log("firstCountry", firstCountry);
  let secondCountry = objectB[0].country;
  console.log("secondCountry", secondCountry);

  fetch(`https://gnews.io/api/v3/search?q=${firstCountry}+coronavirus&token=7a4c334a3321ea87ad9b31418ac622bb`)
  .then((response) => response.json())
  .then(responseJson => {
    let newsObjectForFirstCountry = responseJson;
    console.log(newsObjectForFirstCountry);
    fetch(`https://gnews.io/api/v3/search?q=${secondCountry}+coronavirus+COVID-19&token=7a4c334a3321ea87ad9b31418ac622bb`)
    .then((response) => response.json())
    .then(responseJsonB => {
      let newsObjectForSecondCountry = responseJsonB;
      showNews(newsObjectForFirstCountry, newsObjectForSecondCountry);
    })
  })

  // Promise.all([
  //   fetch(`https://gnews.io/api/v3/search?q=${firstCountry}+coronavirus&token=7a4c334a3321ea87ad9b31418ac622bb`),
  //   fetch(`https://gnews.io/api/v3/search?q=${secondCountry}+coronavirus&token=7a4c334a3321ea87ad9b31418ac622bb`)
  // ])
  //   .then(function (responses) {
  //     // Get a JSON object from each of the responses
  //     return responses.map(function (response) {
  //       return response.json();
  //     });
  //   }).then(function (data) {
  //     // Log the data to the console
  //     // You would do something with both sets of data here
  //      console.log(data);
  //      showNews(data);
  //   }).catch(function (error) {
  //     // if there's an error, log it
  //     console.log(error);
  //   });
}

function showNews(newsObject1, newsObject2) {
  console.log(newsObject1, newsObject2);
  $("#newsDisplay").append(`<a href=${newsObject1.articles[0].url}>${newsObject1.articles[0].title}</a><br><br><a href=${newsObject1.articles[1].url}>${newsObject1.articles[1].title}</a><br><br><a href=${newsObject1.articles[2].url}>${newsObject1.articles[2].title}</a><br><br><br><br>`);
  $("#newsDisplay").append(`<a href=${newsObject2.articles[0].url}>${newsObject2.articles[0].title}</a><br><br><a href=${newsObject2.articles[1].url}>${newsObject2.articles[1].title}</a><br><br><a href=${newsObject1.articles[0].url}>${newsObject2.articles[2].title}</a>`);
}

function handleSearchCovid19Data() {
  getListOfCountries();
  handleSubmitForm();
}

$(handleSearchCovid19Data);