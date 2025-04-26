/* Retrieve the input values for miles and vehicle*/
const miles = document.getElementById("miles");
const vehicle = document.getElementById("vehicle");
const output = document.getElementById("output");
const funfacts = document.getElementByClassName("funfacts")

function displayInfo(id) {
    /* displayInfo(id): toggles the visibility of the given container   *
    *               id: string id of info box                          */
    /* retrieve the provided container with the same id */
    var info = document.getElementById(id);
    
    if (info.style.display === "block") { /* toggles the display tag of the given container between block and none */
        info.style.display = "none";
    } else {
        info.style.display = "block";
    }
}

function calculateCE() {
    /* calculateCE: Calculates the amount of carbon emissions in *
    *               grams and tons based on the user's input    */
    /* retrive input values*/
    distance = miles.value;
    transport = vehicle.value;
    
    /*Define variables*/
    var carbon_dioxide_output_grams = 0;
    var carbon_dioxide_output_tons = 0;
    var distance_plural = "s"

    if (distance <= 0) { /* distance values that are not positive are not accepted */
        alert("That's not a valid input.");
        return;
    }
    if (distance == 1) {
        distance_plural = ""
    }
    if (transport == "car") { /* cars emit 400 grams of CO2 per mile */
        carbon_dioxide_output_grams = distance * 400;
    } else if (transport == "truck") { /* trailer trucks emit 1617 grams of CO2 per mile */
        carbon_dioxide_output_grams = distance * 1617;
    } else if (transport == "train") { /* trains emit 177 grams of CO2 per mile */
        carbon_dioxide_output_grams = distance * 177;
    } else if (transport == "plane") { /* planes emit 24176 grams of CO2 per mile */
        carbon_dioxide_output_grams = distance * 24176;
    }

    carbon_dioxide_output_tons = carbon_dioxide_output_grams/907200*10000; /* converts grams to tons by dividing by 907200, multiplied by 10000 in order to round the value */
    carbon_dioxide_output_tons = Math.round(carbon_dioxide_output_tons)/10000; /* rounds value to the nearest integer, then divide by 10000 to round by 4 decimal places*/
    
    output.style.display = "block";
    output.textContent = 'Travelling ' + distance + ' mile' + distance_plural + ' by ' + transport + ' would produce ' + carbon_dioxide_output_grams + ' grams of carbon dioxide or ' + carbon_dioxide_output_tons + ' US tons of carbon dioxide' /* edit the output text box with the output variables */

    for (let i = 0; i < funfacts.length; i++) {
        funfacts[i].style.display = "block";
    }
    funfacts[0].textContent = 'It would take' + carbon_dioxide_output_grams/21700 + 'trees to convert all that carbon dioxide into oxygen in 1 year'
}