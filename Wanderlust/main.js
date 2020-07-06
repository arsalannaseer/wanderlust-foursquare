// Foursquare API Info
const clientId = 'B1RCKW15Q4SVDBBZ5DFDNDHJN4TTAIVUDL3DG5CXXMRUOZHH';
const clientSecret = 'SNPP5C2HJ44QJ0YL4WEX35SVO1MYKEZELM3VWP0NXN3VIM3C';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = 'd709eb9bae25e0ac498671b061a9714d';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
    const city = $input.val();
    const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20200115`;
    try{
        const response = await fetch(urlToFetch);
        if(response.ok){
           const jsonResponse = await response.json();
           const venues = jsonResponse.response.groups[0].items.map(paramerter => paramerter.venue);
            console.table(venues);
            return venues;
        }
    }
    catch(error){
        console.log(error);
    }
}

const getForecast = async () => {
    const city = $input.val();
    const urlToFetch = `${weatherUrl}${city}&appid=${openWeatherKey}`;
    console.log(urlToFetch);
    try{
        const response = await fetch(urlToFetch);
        if(response.ok){
            const jsonResponse = await response.json();
            return jsonResponse;
        }
    }
    catch(error){
        console.log(error);
    }

}


// Render functions
const renderVenues = (venues) => {
    $venueDivs.forEach(($venue, index) => {
      const venue = venues[index];
      const venueIcon = venue.categories[0].icon;
      const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
      let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
      $venue.append(venueContent);
    });
    $destination.append(`<h2>${venues[0].location.city}</h2>`);
  }

  const renderForecast = (day) => {
    const weatherContent = createWeatherHTML(day);
    $weatherDiv.append(weatherContent);
  };

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venue => {
      return renderVenues(venue);
  })
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)