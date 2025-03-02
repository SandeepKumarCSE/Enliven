// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});

// Cursor Click Effect
document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});


// Weather API
const weatherAPIKey = '03314d7feb98f7a09a825e1919f538af';

async function getWeather() {
    const city = document.getElementById('cityInput').value || 'Delhi';
    try {
        const response = await fetch('⁠https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=03314d7feb98f7a09a825e1919f538af&units=metric');
        const data = await response.json();
        
        document.getElementById('weather-info').innerHTML = `
            <div class="weather-detail">
                <h4>${data.name}, ${data.sys.country}</h4>
                <p>🌡️ ${data.main.temp}°C (Feels like ${data.main.feels_like}°C)</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
                <p>🌬️ Wind: ${data.wind.speed} m/s</p>
                ${data.weather[0].description.includes('rain') ? '<p class="alert">⚠️ Rain Alert!</p>' : ''}
            </div>
        `;
    } catch (error) {
        document.getElementById('weather-info').innerHTML = 'Failed to fetch weather data';
    }
}

// Disaster Alerts
class DisasterAlertSystem {
    constructor() {
        this.alertsEndpoint = 'https://gdacs.org/xml/rss.xml';
        this.updateInterval = 300000; // 5 minutes
    }

    init() {
        this.fetchAlerts();
        setInterval(() => this.fetchAlerts(), this.updateInterval);
    }

    async fetchAlerts() {
        try {
            const response = await fetch(
            "https://api.allorigins.win/get?url=${encodeURIComponent('https://gdacs.org/xml/rss.xml')}");
               
            const data = await response.json();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, "text/xml");

            this.processAlerts(xmlDoc);
        } catch (error) {
            this.showError();
        }
    }

    processAlerts(xmlDoc) {
        const items = xmlDoc.getElementsByTagName('item');
        const alertsList = document.getElementById('alerts-list');
        alertsList.innerHTML = '';

        Array.from(items).slice(0, 5).forEach(item => {
            const title = item.getElementsByTagName('title')[0].textContent;
            const description = item.getElementsByTagName('description')[0].textContent;
            const pubDate = new Date(item.getElementsByTagName('pubDate')[0].textContent).toLocaleString();
            
            this.createAlertCard({
                title,
                description,
                date: pubDate,
                severity: this.determineSeverity(title)
            });
        });
    }

    determineSeverity(title) {
        if (title.toLowerCase().includes('red')) return 'critical';
        if (title.toLowerCase().includes('orange')) return 'warning';
        return 'info';
    }

    createAlertCard(alert) {
        const alertHtml = `
            <div class="alert-item ${alert.severity}">
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <h4>${alert.title}</h4>
                    <p>${alert.description}</p>
                    <small>${alert.date}</small>
                </div>
            </div>
        `;
        document.getElementById('alerts-list').insertAdjacentHTML('beforeend', alertHtml);
    }

    showError() {
        document.getElementById('alerts-list').innerHTML = `
            <div class="alert-item info">
                <i class="fas fa-info-circle"></i>
                <div>Unable to load alerts. Please try again later.</div>
            </div>
        `;
    }
}

// nitialize
document.addEventListener('DOMContentLoaded', () => {
    // Initial weather load
    getWeather();
    
    // Start alert system
    const alertSystem = new DisasterAlertSystem();
    alertSystem.init();
});