// Selecting the necessary DOM elements
const searchBar = document.querySelector('#brewery-search'); // Form element for brewery search
const info = document.querySelector('#info'); // Container to display search results

// Function to find breweries based on user input
const findBrewery = (e) => {
    e.preventDefault(); // Preventing the default form submission behavior
    info.innerHTML = ""; // Clearing previous search results

    // Retrieving values from the search input fields
    const text = document.querySelector('[id=search-bar]').value; // Name search
    const stateText = document.querySelector('[id=state-bar]').value; // State search
    const cityText = document.querySelector('[id=city-bar]').value; // City search

    // Checking if the city field is not empty
    if (cityText != "") {
        // Displaying header for city-based search results
        info.innerHTML += `<h2 class="centre-text result-header">Showing results for ${cityText}</h2>`;
        const theUrl = `https://api.openbrewerydb.org/breweries?by_city=${cityText}`;
        const beerUrl = fetch(theUrl);

        // Fetching and displaying brewery data
        beerUrl
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    data.forEach(brewery => {
                        // Displaying brewery information
                        info.innerHTML += `
                            <div class="brewery-section">
                                <h2>${brewery.name}</h2>
                                <p><strong>website:</strong> <a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a></p>
                                <p><strong>Type:</strong> ${brewery.brewery_type}</p>
                                <p><strong>Address:</strong> ${brewery.street}, ${brewery.city}, ${brewery.state}, ${brewery.country} </p>
                            </div>
                        `;
                    });
                } else {
                    // Displaying message for no results
                    info.innerHTML += "<h2 class='centre-text result-header'>No results found</h2>";
                };
            });

    } else {
        // Displaying header based on search criteria
        if (text && !stateText) {
            info.innerHTML += `<h2 class="centre-text result-header">Showing results for ${text}.</h2>`;
        } else if (stateText && !text) {
            info.innerHTML += `<h2 class="centre-text result-header">Showing results for ${stateText}.</h2>`;
        } else {
            info.innerHTML += `<h2 class="centre-text result-header">Showing results for ${text}, ${stateText}.</h2>`;
        }

        // Constructing the URL for the API based on search criteria
        const theUrl = `https://api.openbrewerydb.org/breweries?by_name=${text}&by_state=${stateText}`;
        const beerUrl = fetch(theUrl);

        // Fetching and displaying brewery data
        beerUrl
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    data.forEach(brewery => {
                        // Displaying brewery information
                        info.innerHTML += `
                            <div class="brewery-section">
                                <h2>${brewery.name}</h2>
                                <p><strong>website:</strong> <a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a></p>
                                <p><strong>Type:</strong> ${brewery.brewery_type}</p>
                                <p><strong>Address:</strong> ${brewery.street}, ${brewery.city}, ${brewery.state}, ${brewery.country} </p>
                            </div>
                        `;
                    });
                } else {
                    // Displaying message for no results
                    info.innerHTML += "<h2 class='centre-text result-header'>No results found</h2>";
                };
            });
    }

    // Resetting the search form
    searchBar.reset();
};

// Event listener for form submission
searchBar.addEventListener('submit', findBrewery);
