"use strict"

let STORE = [];

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

function clearNewsDisplay() {
  $('#newsDisplay').empty();
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
    clearNewsDisplay();
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
  let numbersDeceased = [object1[0].deceased,object2[0].deceased];
  let numbersInfected = [object1[0].infected, object2[0].infected];
  let numbersInfectedJoined = numbersInfected.join();
  let countryNames = `%27${object1[0].country}%27,%27${object2[0].country}%27`;
  // let imageURLBeforeReplace = `https://quickchart.io/chart?c={type:%27bar%27,data:{labels:[${countryNames}],datasets:[{label:%27Infected%27,data:[${numbersInfectedJoined}]},{label:%27Deceased%27,data:[${numbersDeceased}]}]}}`
  let imageURLBeforeReplace = `https://quickchart.io/chart?c=%7Btype:%27bar%27,data:%7Blabels:%5B${countryNames}%5D,datasets:%5B%7Blabel:%27Infected%27,data:%5B${numbersInfectedJoined}%5D%7D,%7Blabel:%27Deceased%27,data:%5B${numbersDeceased}%5D%7D%5D%7D%7D`
  let imageURL = imageURLBeforeReplace.replace(/\s+/g, '');
  $('#statsDetails').append(`<br><b>${country1}</b> Infected: ${numbersInfected[0]} <br>`);
  $('#statsDetails').append(`<b>${country2}</b> Infected: ${numbersInfected[1]} <br>`);
  $('#statsDetails').append(`<br><b>${country1}</b> Deceased: ${numbersDeceased[0]} <br>`)
  $('#statsDetails').append(`<b>${country2}</b> Deceased: ${numbersDeceased[1]} <br>`)
  $('#graphDisplay').append(`<img src=${imageURL} alt="bar chart showing coronavirus infections and deaths for the two selected countries">`);
  $('#statsDetails2').append(`<br>Last Updated = ${object1[0].lastUpdatedApify.slice(0, 10)}`);
}

function prepareNews(objectA, objectB) {
  let firstCountry = objectA[0].country;
  let secondCountry = objectB[0].country;

  Promise.all([
    fetch(`https://gnews.io/api/v3/search?q=${firstCountry}+coronavirus&token=7a4c334a3321ea87ad9b31418ac622bb`),
    fetch(`https://gnews.io/api/v3/search?q=${secondCountry}+coronavirus&token=7a4c334a3321ea87ad9b31418ac622bb`)
  ])
    .then(function (responses) {
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(function (data) {
       $("#newsDisplay").append(`<b>Latest COVID-19 News Articles For ${firstCountry}</b><br><br>`);
       showNews(data[0].articles.slice(0, 3));
       $("#newsDisplay").append(`<br><b>Latest COVID-19 News Articles For ${secondCountry}</b><br><br>`);
       showNews(data[1].articles.slice(0, 3));
    }).catch(function (error) {
      $("#errorMessage").show();
      console.log(error);
    });
}

function showNews(articles) {
  const articleElements = articles.map(function(article) {
    return `<a href="${article.url}"target="_blank">${article.title}</a><br><br>`;
  });
  $("#newsDisplay").append(articleElements);

}

function handleSearchCovid19Data() {
  $("#errorMessage").hide();
  getListOfCountries();
  handleSubmitForm();
}

$(handleSearchCovid19Data);