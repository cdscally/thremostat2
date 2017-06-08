$( document ).ready(function() {
  var thermostat = new Thermostat();
  var city;

  $('#search-city').on('change paster keyup', function(){
    city = $('#search-city').val();
    $.get('http://api.openweathermap.org/data/2.5/weather?q='+ city +'&units=metric&appid=a012ce56b3fea36ffd408256d4eeb21a', function(data) {
      $('#local-temperature').text(data.main.temp + '℃');
    });
  });

  function updateTemperature() {
    $('#temperature>p').text(thermostat.temperature());
    $('#temperature>p').attr('class', thermostat.currentEnergyUsage());
  }

  function updatePowerSaving() {
    switch(thermostat.isPowerSaving()) {
      case true:
        return 'On';
      case false:
        return 'Off';
    }
  }

  function updateEnergyUsage() {
    $('#energy > p').text(thermostat.currentEnergyUsage());
  }

  function updateThermometer() {
    $('#temperature > p').css("width", thermostat.temperature() + '%');
  }

  updateTemperature();

  $('#temp-up').on('click', function(){
    thermostat.increaseTemperature();
    updateTemperature();
    updateThermometer();
    updateEnergyUsage();
  });

  $('#temp-down').on('click', function() {
    thermostat.decreaseTemperature();
    updateTemperature();
    updateThermometer();
    updateEnergyUsage();
  });

  $('#temp-reset').on('click', function() {
    thermostat.resetTemperature();
    updateTemperature();
    updateThermometer();
    updateEnergyUsage();
  });

  $('#toggle-power-saving').on('click', function() {
    thermostat.togglePowerSaving();
    updateTemperature();
    $('#power_saving > p').text(updatePowerSaving());
  });
});
