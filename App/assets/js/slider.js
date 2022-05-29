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
}