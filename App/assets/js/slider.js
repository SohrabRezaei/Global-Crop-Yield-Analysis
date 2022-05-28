//Temperature
var slider = document.getElementById("Temp");
var output = document.getElementById("temperature");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

// Rainfall
var slider = document.getElementById("Rain");
var output = document.getElementById("rainfall");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

//Pesticide
var slider = document.getElementById("Pest");
var output = document.getElementById("pesticide");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}