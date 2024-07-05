const apiKey = "2a3d4ec2229044c9849100402241806"; // Replace with your actual API key

document.getElementById('checkButton').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetchTemperature(location);
    } else {
        alert("Please enter a valid location.");
    }
});

function fetchTemperature(location) {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`)
        .then(response => response.json())
        .then(data => {
            if (data.current && data.current.temp_c !== undefined) {
                processTemperature(data.current.temp_c);
            } else {
                alert("Could not fetch temperature for the given location.");
            }
        })
        .catch(error => {
            console.error('Error fetching temperature data:', error);
            alert("Error fetching temperature data.");
        });
}

function processTemperature(temperature) {
    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    // Determine the weather condition
    let weatherCondition;
    if (temperature >= 30) {
        weatherCondition = "It's hot outside.";
    } else if (temperature >= 20) {
        weatherCondition = "The weather is warm.";
    } else if (temperature >= 10) {
        weatherCondition = "The weather is cool.";
    } else {
        weatherCondition = "It's cold outside.";
    }

    const result = `The temperature is ${temperature} degrees Celsius. ${weatherCondition} Current date is ${date} and the time is ${time}.`;

    document.getElementById('result').textContent = result;

    // Voice AI technology to read the message
    if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(result);
        synth.speak(utterance);
    } else {
        console.error('Speech synthesis not supported in this browser.');
    }
}

// Automatically read temperature at regular intervals
function autoReadTemperature() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetchTemperature(location);
    }
}

// Set interval to automatically read temperature every 30 seconds
setInterval(autoReadTemperature, 30000); // 30000 milliseconds = 30 seconds

