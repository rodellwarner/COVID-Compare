"use strict"

// const URL = "https://api.covid19api.com/live/country"

// const graphURL = "https://quickchart.io/chart?c={type:'bar',data:{labels:["

let STORE = [];

function setInitialConditions() {
  $('#selectCountryForm').show();
  // $('#graphDisplay').hide();
}

function clearResults() {
  $('#countries').empty();
}

function clearGraph() {
  $('#graphDisplay').empty();
}

function clearStatsDetails() {
  $('#statsDetails').empty();
}

// function clearSTORE() {
//   let STORE = [];
// }

function getListOfCountries() {
  fetch('https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true')
  .then(response => response.json())
  // .then(responseJson => console.log(responseJson))
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
    console.log("sortedCountries", sortedCountries);
    createSelectElement(sortedCountries);
  });
}

function createSelectElement(sortedCountries) {
  STORE = sortedCountries;
  console.log("STORE", STORE);
  // console.log("sortedCountries", sortedCountries);
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
    // clearGraph();
  });
}

function getCovidData() {
  let country1 = `${$("#countries").val()}`;
  let country2 = `${$("#countries2").val()}`;

  let chosenObject1 = STORE.filter(object => object.country === country1);
  let chosenObject2 = STORE.filter(object => object.country === country2);

  console.log('chosenObject1', chosenObject1);
  console.log('chosenObject2', chosenObject2);

  showGraph(chosenObject1, chosenObject2);
}




function showGraph(object1, object2) {

  let country1 = `${$("#countries").val()}`;
  let country2 = `${$("#countries2").val()}`;

  // let numbersDeceased = `%27${object1[0].deceased}%27,%27${object2[0].deceased}%27`;
  // console.log('numbersDeceased', numbersDeceased);

  let numbersDeceased = [object1[0].deceased,object2[0].deceased];

  let numbersInfected = [object1[0].infected, object2[0].infected];
  console.log('numbersInfected', numbersInfected)

  let numbersInfectedJoined = numbersInfected.join();
  console.log(numbersInfectedJoined);

  let countryNames = `%27${object1[0].country}%27,%27${object2[0].country}%27`;
  console.log('countrynames', countryNames);

 
  // let imageURLBeforeReplace = `https://quickchart.io/chart?c={type:%27bar%27,data:{labels:[${countryNames}],datasets:[{label:%27Infected%27,data:[${numbersInfectedJoined}]}]}}`
  // console.log(encodeURIComponent(imageURL));

  let imageURLBeforeReplace = `https://quickchart.io/chart?c={type:%27bar%27,data:{labels:[${countryNames}],datasets:[{label:%27Infected%27,data:[${numbersInfectedJoined}]},{label:%27Deceased%27,data:[${numbersDeceased}]}]}}`
  
  let imageURL = imageURLBeforeReplace.replace(/\s+/g, '');
  
  console.log(imageURL);


  $('#statsDetails').append(`<br>${country1} infected = ${numbersInfected[0]} <br>`);
  $('#statsDetails').append(`${country2} infected = ${numbersInfected[1]} <br>`);
  $('#statsDetails').append(`<br>${country1} deceased = ${numbersDeceased[0]} <br>`)
  $('#statsDetails').append(`${country2} deceased = ${numbersDeceased[1]} <br>`)


  $('#graphDisplay').append(`<img src=${imageURL}>`);
  $('#graphDisplay').show();
  
  $('#statsDetails2').append(`<br>last updated = ${object1[0].lastUpdatedApify}`);
}


//   fetch(URL + '/' + `${$("#countries").val()}` + '/status/' + `${$("#dataType").val()}` + '/date/' + `${$("#afterDate").val()}` + 'T00:00:00Z')
//   .then(response => response.json())
//   .then(responseJsonCovidData => showGraph(responseJsonCovidData))
// }

// function showGraph(responseJsonCovidData) {
//   console.log(responseJsonCovidData);

//   let datesForGraphs = [];
//   let dataSetsForGraph = [];
//   const separateOutDatesAndDatasets = responseJsonCovidData.forEach(element => {
//     datesForGraphs.push(element.Date);
//     if ($("#dataType").val() === 'confirmed') {
//       dataSetsForGraph.push(element.Confirmed);
//     }
//     else if ($("#dataType").val() === 'recovered') {
//       dataSetsForGraph.push(element.Recovered);
//     }
//     else if ($("#dataType").val() === 'deaths') {
//       dataSetsForGraph.push(element.Deaths);
//     }
//   }); 

    
//   let finalDates = [];
//   function datesForGraphFormatted(arrayOfDates) {
//     (arrayOfDates).forEach(date => {
//       let slicedDate = date.slice(0, 10);
//       finalDates.push(`'${slicedDate}'`)
//     });
//   }
//   datesForGraphFormatted(datesForGraphs);


//   let finalNumbers = [];
//   function numbersOfCasesForGraphFormatted(arrayOfNumbersOfCases) {
//     arrayOfNumbersOfCases.forEach(numberOfCases => {
//       finalNumbers.push(`'${numberOfCases}'`)
//     });
//   }
//   numbersOfCasesForGraphFormatted(dataSetsForGraph);

   

//   let imageURL = `${graphURL + finalDates}], datasets:[{label:'${`${$("#dataType").val()}`}', data:[${finalNumbers}],fill:'false'}]}}`


//   $('#graphDisplay').append('<img src="' + imageURL + '">');
//   $('#graphDisplay').show();




 



    
  


function handleSearchCovid19Data() {
  setInitialConditions();
  getListOfCountries();
  handleSubmitForm();
}


$(handleSearchCovid19Data);