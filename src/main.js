console.log('main.js is connected!');
$(document).ready(function(){

  $landingPage = $('#landingPage');
  $mainPage = $('#mainPage');
  $zip = $('#forZip');
  $submit = $('#forSubmit');
  $showTemp = $('#showTemp');
  $description = $('#weatherDesc');
  $lowTemp = $('#lowTemp');
  $highTemp = $('#highTemp');
  $city = $('#city');
  $submit2 = $('#forSubmit2');
  $zip2 = $('#forZip2');
  $location = $('#location');
  $precipitation = $('#precipitation');
  $humidity = $('#humidity');
  $wind = $('#wind');

  $mainPage.hide();

  if ($zip.val() === '') {
      $zip.attr('placeholder', 'Enter Zip Code');
      $zip.focus();
  }

  $submit.on('click', function(){
    //redirect user to the main page of application
    changePage();
    // pick zip
    let zipCode = $zip.val();
    //make call to open weather
      let url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&units=imperial&APPID=1e62bc06acb4eb924b09235113f7d0cc";
      $.get(url, function(data) {
        console.log(data);
        //append data to the DOM elements
        appData(data);
      });

  });

  if ($zip2.val() === '') {
      $zip2.attr('placeholder', 'Enter Zip Code');
      $zip2.focus();
  }

   $submit2.on('click', function(){
    // pick zip
    let zipCode2 = $zip2.val();
    //make call to open weather
      let url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode2 + ",us&units=imperial&APPID=1e62bc06acb4eb924b09235113f7d0cc";
      $.get(url, function(data) {
        console.log(data);
        //append data to the DOM elements
        appData(data);
      });

  });

  function appData(data) {
    console.log('inside appData', data.main.temp, $showTemp);
    $showTemp.html(data.main.temp);
    if(data.main.temp > 90) {$showTemp.css('color', 'red')};
    if(data.main.temp <= 40) {$showTemp.css('color', 'blue')};
    if((data.main.temp > 40) && (data.main.temp <= 90)) {$showTemp.css('color', 'black')};
    $city.html(data.name);
    $lowTemp.html("<span class='forSpan'>Min</span>" + "\n" + data.main.temp_min);
    $highTemp.html("<span class='forSpan'>Max</span>" + "\n" + data.main.temp_max);
    $description.html(data.weather[0].description);
    $location.html("lat: " + data.coord.lat + " lon: " + data.coord.lon + "");
    $precipitation.html("<span class='precip'>Weather: </span>" + data.weather[0].main);
    $humidity.html("<span class='forSpan'>humidity:</span> " + data.main.humidity + "<span class='forSpan'>%</span> ");
    $wind.html("<span class='forSpan'>wind speed:</span> " + data.wind.speed + "<span class='forSpan'>mph</span> ");
    }

  function changePage() {
    $landingPage.hide();
    $mainPage.show();
  }

});
