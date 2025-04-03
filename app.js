
const map = L.map('map').setView([28.6139, 77.2090], 13);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

const locations = {
  "Connaught Place": [28.6328, 77.2197],
  "New Delhi": [28.6139, 77.2090],
  "Nizamuddin": [28.5892, 77.2476],
  "Lodhi Colony": [28.5809, 77.2225]
};


Object.entries(locations).forEach(([name, coords]) => {
  L.marker(coords).addTo(map)
    .bindPopup(`<b>${name}</b>`);
});

let carIcon;
try {
  carIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/744/744465.png',
    iconSize: [40, 40]
  });
} catch (e) {

  carIcon = L.divIcon({ html: '🚗', className: 'car-marker' });
}

const carMarker = L.marker([28.6139, 77.2090], { 
  icon: carIcon,
  title: "Your Car"
}).addTo(map);


function simulateRide() {
  let lat = 28.6328;
  let lng = 77.2197;
  
  const interval = setInterval(() => {
    lat -= 0.001; 
    lng += 0.001; 
    carMarker.setLatLng([lat, lng]);
    map.panTo([lat, lng]);
    

    if (lat < 28.5892) clearInterval(interval);
  }, 500);
}

function simulateRide() {
  let lat = 28.6139; 
  let lng = 77.2090;
  
  const interval = setInterval(() => {
    lat += 0.001; 
    lng += 0.001;
    carMarker.setLatLng([lat, lng]);
    map.panTo([lat, lng]);
    if (lat > 28.6169) clearInterval(interval);
  }, 1000);
}

function saveRide(start, end) {
  const ride = { start, end, date: new Date() };
  const rides = JSON.parse(localStorage.getItem('rides') || '[]');
  rides.push(ride);
  localStorage.setItem('rides', JSON.stringify(rides));
  updateRideHistory();
}

function updateRideHistory() {
  const rides = JSON.parse(localStorage.getItem('rides') || '[]');
  const list = document.getElementById('rides-list');
  list.innerHTML = rides.map(ride => 
    `<li>${ride.date.toLocaleString()}: ${ride.start} → ${ride.end}</li>`
  ).join('');
}

window.onload = () => {
    simulateRide();
    saveRide("Connaught Place", "India Gate"); 
  };
