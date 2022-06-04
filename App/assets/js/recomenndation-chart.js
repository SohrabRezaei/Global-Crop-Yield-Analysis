'use strict';

/* Chart.js docs: https://www.chartjs.org/ */

window.chartColors = {
	green: '#75c181',
	gray: '#a9b5c9',
	red:'#8b0000',
	orange:'#ffae25',
	purple:'#542681',
	black:'#080704',
	blue:'#5b92e5',
	yellow:'#ffdb58',
	pink:'#b784a7',
	text: '#252930',
	border: '#e7e9ed',
	borderWidth:1.3
};

//Chart.js Line Chart Example 

var lineChartConfig2 = {
	type: 'line',

	data: {
		labels: [1994,1995,1996,1997,1998,1999,2000,2001,2002,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013],
        datasets: [{
			label: 'World Population',
			fill: false,
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,
			borderWidth: 1,
			maxBarThickness: 16,
			
			data: [
				6540,
				6620,
				6710,
				6790,
				6870,
				6960,
				7040,
				7130,
				7210,
				7300,
				7380,
				7460,
				7550,
				7630,
				7710,
				7790,
				7870
			]
		}, {
			label: 'Undernourished Population',
			backgroundColor: window.chartColors.gray,
			borderColor: window.chartColors.gray,
			
			data: [
				810.7,
				764.9,
				711.3,
				685.5,
				684.4,
				636.8,
				635.8,
				637.4,
				631.2,
				606.9,
				615.1,
				619.6,
				615.0,
				633.4,
				650.3,
				768
			],
			fill: false,
		},
        {
			label: 'World Population',
			fill: false,
			backgroundColor: window.chartColors.blue,
			borderColor: window.chartColors.blue,
			borderWidth: 1,
			maxBarThickness: 16,
			
			data: [
				6540,
				6620,
				6710,
				6790,
				6870,
				6960,
				7040,
				7130,
				7210,
				7300,
				7380,
				7460,
				7550,
				7630,
				7710,
				7790,
				7870
			]
		}]
	},
	options: {
		responsive: true,	
		aspectRatio: 1.5,
		
		legend: {
			display: true,
			position: 'bottom',
			align: 'end',
		},
		
		title: {
			display: true,
			text: 'Top 20 populated countries yield based on different crops',
			
		}, 
		tooltips: {
			mode: 'index',
			intersect: false,
			titleMarginBottom: 5,
			bodySpacing: 5,
			xPadding: 16,
			yPadding: 10,
			borderColor: window.chartColors.border,
			borderWidth: 1,
			backgroundColor: '#fff',
			bodyFontColor: window.chartColors.text,
			titleFontColor: window.chartColors.text
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Year'
				  },
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Yield (hg/ha)'
				  },
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				}
			}]
		}
	}
};


// Generate charts on load
window.addEventListener('load', function(){
	
	var lineChart2 = document.getElementById('canvas-linechart2').getContext('2d');
	window.myLine = new Chart(lineChart2, lineChartConfig2);
	

});	
	
