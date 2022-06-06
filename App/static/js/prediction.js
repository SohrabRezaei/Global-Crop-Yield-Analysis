

//Temperature
var tempSlider = document.getElementById("Temp");
var tempOutput = document.getElementById("temperature");
tempOutput.innerHTML = tempSlider.value;

tempSlider.oninput = function() {
  tempOutput.innerHTML = this.value;
}

// Rainfall
var rainSlider = document.getElementById("Rain");
var rainOutput = document.getElementById("rainfall");
rainOutput.innerHTML = rainSlider.value;

rainSlider.oninput = function() {
  rainOutput.innerHTML = this.value;
}

//Pesticide
var pestSlider = document.getElementById("Pest");
var pestOutput = document.getElementById("pesticide");
pestOutput.innerHTML = pestSlider.value;

pestSlider.oninput = function() {
  pestOutput.innerHTML = this.value;
};

d3.select(predictButton).on("click",handleSubmit);

function handleSubmit() {
    let cropInput = d3.select("#cropinput").select("select").property("value");
    let countryInput = d3.select("#countryinput").select("select").property("value");
    let rainfallInput = d3.select("#Rain").property("value");
    let tempInput = d3.select("#Temp").property("value");
    let pestInput = d3.select("#Pest").property("value");
    d3.json(`/api/predict/${countryInput}/${cropInput}/${rainfallInput}/${pestInput}/${tempInput}/`).then(resp => {
        d3.select("#predictionDisplay").html(resp.predicted);
    });
};
