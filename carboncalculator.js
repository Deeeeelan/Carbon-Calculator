function displayInfo(id) {
    var info = document.getElementById(id);
    if (info.style.display === "none") {
        info.style.display = "block";
    } else {
        info.style.display = "none";
    }
}

function calculateCE(transport, miles) {
    if (transport = "car") {
        carbon_dioxide_output = miles * 400
    }   
}