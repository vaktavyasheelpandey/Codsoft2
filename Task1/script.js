// Auto-typing effect for travel locations
const locations = ['Taj Mahal', 'Kerala Backwaters', 'Varanasi Ghats'];
let locationIndex = 0;
let charIndex = 0;

function typeLocation() {
    const locationElement = document.querySelector('#home p');
    if (charIndex < locations[locationIndex].length) {
        locationElement.textContent += locations[locationIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeLocation, 100);
    } else {
        setTimeout(eraseLocation, 2000);
    }
}

function eraseLocation() {
    const locationElement = document.querySelector('#home p');
    if (charIndex > 0) {
        locationElement.textContent = locations[locationIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseLocation, 50);
    } else {
        locationIndex = (locationIndex + 1) % locations.length;
        setTimeout(typeLocation, 500);
    }
}

// Start the auto-typing effect
typeLocation();

// Smooth scrolling effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll reveal effect
window.addEventListener('scroll', revealOnScroll);

function revealOnScroll() {
    const elements = document.querySelectorAll('.destination-card, #about, #contact');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
}

// Initial check for elements in view
revealOnScroll();
document.querySelector('#booking form').addEventListener('submit', function (e) {
    e.preventDefault();

    const destination = document.querySelector('#destination').value;
    const departure = document.querySelector('#departure').value;
    const returnDate = document.querySelector('#return').value;
    const passengers = document.querySelector('#passengers').value;

    // Mock flight data
    const flights = [
        {
            route: 'New Delhi to ' + destination,
            departureTime: '10:00 AM',
            arrivalTime: '12:00 PM'
        },
        {
            route: 'Mumbai to ' + destination,
            departureTime: '2:00 PM',
            arrivalTime: '4:00 PM'
        },
        {
            route: 'Bangalore to ' + destination,
            departureTime: '6:00 PM',
            arrivalTime: '8:00 PM'
        }
    ];

    // Display flight results
    const resultsSection = document.createElement('section');
    resultsSection.id = 'flight-results';
    resultsSection.innerHTML = `
        <h2>Available Flights</h2>
        <ul>
            ${flights.map(flight => `
                <li>
                    <strong>Route:</strong> ${flight.route}<br>
                    <strong>Departure Time:</strong> ${flight.departureTime}<br>
                    <strong>Arrival Time:</strong> ${flight.arrivalTime}
                </li>
            `).join('')}
        </ul>
    `;

    // Append results to the main content
    document.querySelector('main').appendChild(resultsSection);
});
