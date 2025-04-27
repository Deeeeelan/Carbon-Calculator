
// Taken from the google maps API

async function initMap(coords) {;
    const placePicker = document.getElementById("place-picker");
    const infowindowContent = document.getElementById("infowindow-content");
    const infowindow = new google.maps.InfoWindow();
    const bounds = new google.maps.LatLngBounds();

    const markersArray = [];
    
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 34.0549, lng: -118.2426 },
        zoom: 10,
        //mapId: "Map",
    });

    placePicker.addEventListener('gmpx-placechange', () => {
        const place = placePicker.value;
    
        if (!place.location) {
          window.alert(
            "No details available for input: '" + place.name + "'"
          );
          infowindow.close();
          marker.position = null;
          return;
        }
    
        if (place.viewport && map.innerMap) {
          map.innerMap.fitBounds(place.viewport);
        } else {
          map.center = place.location;
          map.zoom = 17;
        }
        try {
            marker.position = place.location;
            infowindowContent.children["place-name"].textContent = place.displayName;
            infowindowContent.children["place-address"].textContent = place.formattedAddress;
            infowindow.open(map.innerMap, marker);
        } catch (error) {
            console.warn("Could not find marker: " + error);
        }
      });
    

    // initialize services
    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();
    // build request 
    var origin1 = { lat: 34.0549, lng: -118.2426 }; // LA default
    // Wrap getCurrentPosition in a Promise
    const getCurrentPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };
    try {
        const position = await getCurrentPosition();
        origin1 = { lat: position.coords.latitude, lng: position.coords.longitude };
    } catch (error) {
        console.error("Error getting location:", error);
    }
    var destinationA = { lat: 32.7157, lng: -117.1611 }; // San Diego defaults
    if (coords) {
        destinationA = coords
    }
    const request = {
        origins: [origin1],
        destinations: [destinationA],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
    };
    
    // get distance matrix response
    service.getDistanceMatrix(request).then((response) => {
        
        // show on map
        const originList = response.originAddresses;
        const destinationList = response.destinationAddresses;
        if (
            response.rows[0] &&
            response.rows[0].elements[0] &&
            response.rows[0].elements[0].status === "OK"
        ) {
            const distance = response.rows[0].elements[0].distance.value;
            document.getElementById("miles").value = Math.round(distance/0.01609)/100000;
        } else {
            alert("No route could be calculated.");
        }
        

        deleteMarkers(markersArray);
        
        const showGeocodedAddressOnMap = (asDestination) => {
        const handler = ({ results }) => {
            map.fitBounds(bounds.extend(results[0].geometry.location));
            markersArray.push(
                new google.maps.Marker({
                    map,
                    position: results[0].geometry.location,
                    label: asDestination ? "B" : "A",
                }),
            );
        };
        return handler;
        };
         
        for (let i = 0; i < originList.length; i++) {
            const results = response.rows[i].elements;
           
            geocoder
                .geocode({ address: originList[i] })
                .then(showGeocodedAddressOnMap(false));

            for (let j = 0; j < results.length; j++) {
                geocoder
                .geocode({ address: destinationList[j] })
                .then(showGeocodedAddressOnMap(true));
            }
            
        }
        
    });
    }

    function deleteMarkers(markersArray) {
    for (let i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
    }

    markersArray = [];
}

function set_location() {
    const placePicker = document.getElementById("place-picker");
    const place = placePicker.value;

    if (!place || ( place && !place.location)) {
        alert("Please select a valid location.");
        return;
    }

    // Extract the selected place's coordinates
    const coords = {
        lat: place.location.lat(),
        lng: place.location.lng(),
    };

    console.log("Selected destination:", coords);

    // Reinitialize the map with the new destination
    initMap(coords);
}

// Add event listener for the place-picker
document.getElementById("place-picker").addEventListener("gmpx-placechange", () => {
    set_location();
});

window.initMap = initMap;
