/* Retrieve the HTML blocks for use in the code*/
const miles = document.getElementById("miles");
const vehicle = document.getElementById("vehicle");
const output = document.getElementById("output");
const alternative = document.getElementById("alternative");
const funfactsinfo = document.getElementsByClassName("funfactsinfo");
const funfacts = document.getElementsByClassName("funfacts");
const topbutton = document.getElementById("top")

window.onscroll = function() {scrollFunction()}; /* detects when the user scrolls */

function displayInfo(id) {
    /***************************************************
    * Toggles the visibility of the given container    *
    *   :param id: string id of info box               *
    ***************************************************/
    /* retrieve the provided container with the same id */
    var info = document.getElementById(id);
    
    if (info.style.display === "block") { /* toggles the display tag of the given container between block and none */
        info.style.display = "none";
    } else {
        info.style.display = "block";
    }
}

function calculateCE() {
    /******************************************************** 
    * Calculates the amount of carbon emissions in grams    *
    * and tons based on the user's input                    *  
    ********************************************************/
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
        distance_plural = "" /* used to change "miles" to "mile" if the user inputs one mile */
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
    
    /* display and edit output text with carbon output */
    output.style.display = "block";
    output.textContent = 'Travelling ' + distance + ' mile' + distance_plural + ' by ' + transport + ' would produce ' +  carbon_dioxide_output_grams + ' grams of carbon dioxide or ' + carbon_dioxide_output_tons + ' US tons of carbon dioxide.'; /* edit the output text box with the output variables */

    /* suggest alternative options to the user depending on distance and mode of transport */
    alternative.style.display = "block";
    if (distance <= 2) {
        alternative.textContent = "Maybe try walking instead!";
    } else if (distance <= 10) {
        alternative.textContent = "Maybe try biking instead!";
    } else if (transport == "car" || transport == "truck") {
        alternative.textContent = "Maybe try using public transportation instead!";
    } else if (transport == "plane" && distance <= 500) {
        alternative.textContent = "Maybe try going on a road trip instead!";
    } else {
        alternative.style.display = "none";
    }
    

    /* display and edit fun fact section with carbon output */
    for (let i = 0; i < funfactsinfo.length; i++) {
        funfactsinfo[i].style.display = "block"; /* display all fun facts template information*/
    }
    for (let i = 0; i < funfacts.length; i++) {
        funfacts[i].style.display = "block"; /* display all fun facts */
    }
    funfacts[0].textContent = (Math.round(carbon_dioxide_output_grams/2.1700))/1000 + ' trees' /*USDA citing Arbol Day Foundatio */
    funfacts[1].textContent = carbon_dioxide_output_tons*8 + ' billion'
    funfacts[2].textContent = (Math.round((((carbon_dioxide_output_tons*8)/41.2)*100000)))/1000 + '%'/*((8 billion*co2 output in tons) / 41.2 billion)*100% */ /*Global Carbon Project */
}

function scrollFunction() {
    /************************************************ 
    * If the user scrolls 20 pixels, display back   *
    * to top button                                 *
    ************************************************/
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topbutton.style.display = "block";
  } else {
    topbutton.style.display = "none";
  }
}

function backToTop() {
    /************************************************ 
    * Takes the user back to the top of the page    *
    ************************************************/
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}