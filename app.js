// Function to fetch weather data based on city name
function fetchWeather(cityName) {
    const apiKey = '2b405bd0d7fe4982adc172247241105';
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not available for this city.');
            }
            return response.json();
        })
        .then(data => {
            // Log the entire data object to inspect its properties
            console.log(data);

            const temperature = data.current.temp_c;
            const condition = data.current.condition.text;
            const iconUrl = data.current.condition.icon;

            // Update DOM with weather information
            const weatherContainer = document.getElementById('weather');
            weatherContainer.innerHTML = `
                <div>
                    <img src="${iconUrl}" alt="Weather Icon">
                </div>
                <div>
                    <h2>${temperature} ℃</h2>
                    <h4>${condition}</h4>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error.message);
            // Handle error - display a message or take other action
            const weatherContainer = document.getElementById('weather');
            weatherContainer.innerHTML = `<p>${error.message}</p>`;
        });
}

// Event listener for form submission
document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const cityName = document.getElementById('search').value.trim();
    if (cityName) {
        fetchWeather(cityName);
    } else {
        alert('Please enter a city name');
    }
});
