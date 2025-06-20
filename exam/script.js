$(function () {
  const secretToken = '661c627c3052aa7566430dc199dc1a28';

  const emojiMap = {
    '01d': '☀️', '01n': '🌑', '02d': '🌤️', '02n': '🌥️',
    '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
    '11d': '🌩️', '11n': '🌩️', '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
  };

  function getSymbol(code) {
    return emojiMap[code] || '❓';
  }

  function toggleView(viewID) {
    $('.nav-toggle').removeClass('selected');
    $('.view').removeClass('visible');
    $(`.nav-toggle[data-target="${viewID}"]`).addClass('selected');
    $(`#${viewID}`).addClass('visible');

    if (viewID === 'future') {
      const place = $('#locationField').val().trim();
      if (place) {
        loadForecast(place, true); 
      }
    }
  }

  $('.nav-toggle').on('click', function () {
    toggleView($(this).data('target'));
  });

  $('#lookupBtn').on('click', function () {
    const place = $('#locationField').val().trim();
    if (place) {
      loadCurrent(place);
      loadForecast(place);
    }
  });

  function loadCurrent(city) {
    $.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${secretToken}&units=metric`, function (info) {
      const icon = getSymbol(info.weather[0].icon);
      $('#nowInfo').html(`
        <h2>${info.name}</h2>
        <p>${new Date(info.dt * 1000).toLocaleDateString()}</p>
        <p class="weather-emoji">${icon}</p>
        <p>${info.weather[0].description}, ${info.main.temp}°C (feels like ${info.main.feels_like}°C)</p>
        <p>🌅 Sunrise: ${new Date(info.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>🌇 Sunset: ${new Date(info.sys.sunset * 1000).toLocaleTimeString()}</p>
      `);
      nearbyTowns(info.coord.lat, info.coord.lon);
    }).fail(() => {
      $('#nowInfo').html('<p>❌ Unable to find city. Try again.</p>');
    });
  }

  function nearbyTowns(lat, lon) {
    $.get(`https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=5&appid=${secretToken}&units=metric`, function (data) {
      let output = `<h3>Nearby Areas</h3>`;
      data.list.forEach(location => {
        output += `<p>${getSymbol(location.weather[0].icon)} ${location.name}: ${location.main.temp}°C</p>`;
      });
      $('#surroundingTowns').html(output);
    });
  }

  function showHourlyForecast(slots) {
    const output = slots.map(slot => {
      const time = new Date(slot.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return `
        <div class="hourly">
          <p>${time}</p>
          <p>${getSymbol(slot.weather[0].icon)} ${slot.main.temp}°C</p>
        </div>
      `;
    }).join('');
    $('#hourlyForecast').html(`<h3>Hourly Forecast</h3>${output}`);
  }

  function loadForecast(city, autoSelectToday = false) {
    $.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${secretToken}&units=metric`, function (data) {
      const byDate = {};
      data.list.forEach(slot => {
        const day = slot.dt_txt.split(' ')[0];
        if (!byDate[day]) byDate[day] = [];
        byDate[day].push(slot);
      });

      let content = '';
      let index = 0;
      $('#futureSummary').html('');
      $('#hourlyForecast').html('');

      Object.keys(byDate).slice(0, 5).forEach(day => {
        const summary = byDate[day][0];
        const dateStr = new Date(day).toLocaleDateString();

        const div = $(`
          <div class="forecast-day" data-day="${day}">
            <h3>${dateStr}</h3>
            <p class="weather-emoji">${getSymbol(summary.weather[0].icon)}</p>
            <p>${summary.weather[0].description}, ${summary.main.temp}°C</p>
          </div>
        `);

        div.on('click', function () {
          $('.forecast-day').removeClass('selected');
          $(this).addClass('selected');
          showHourlyForecast(byDate[day]);
        });

        $('#futureSummary').append(div);

        if (autoSelectToday && index === 0) {
          setTimeout(() => div.trigger('click'), 0);
        }

        index++;
      });
    });
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      $.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${secretToken}&units=metric`, function (data) {
        $('#locationField').val(data.name);
        loadCurrent(data.name);
        loadForecast(data.name);
      });
    });
  }
});
