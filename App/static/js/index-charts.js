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

var lineChartConfig = {
	type: 'line',

	data: {
		labels: [1994,1995,1996,1997,1998,1999,2000,2001,2002,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013],
		
		datasets: [{
			label: 'Maize',
			fill: false,
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,
			borderWidth:window.chartColors.borderWidth,
			pointRadius:0,
			data: [
				30935,
				32522,
				33826,
				35491,
				34004,
				35705,
				36934,
				37656,
				40335,
				44525,
				46473,
				46395,
				48387,
				48793,
				48084,
				48959,
				51856,
				52513,
				53553
			],
		}, {
			label: 'Potatoes',
			backgroundColor: window.chartColors.gray,
			borderColor: window.chartColors.gray,
			borderWidth:window.chartColors.borderWidth,
			pointRadius:0,
			
			data: [180007,
				184900,
				189970,
				191234,
				186578,
				195144,
				201816,
				199832,
				204894,
				215916,
				217934,
				210743,
				224128,
				226607,
				228853,
				229872,
				240134,
				236988,
				239094],
			fill: false,
		},
		{
			label: 'Cassava',
			fill: false,
			backgroundColor: window.chartColors.black,
			borderColor: window.chartColors.black,
			borderWidth:window.chartColors.borderWidth,
			pointRadius:0,
			
			data: [131855,
				136468,
				128341,
				134750,
				140265,
				145240,
				149109,
				163401,
				166093,
				175949,
				176001,
				189459,
				190996,
				196984,
				201286,
				196523,
				201938,
				208977,
				209825
			],
		},
		{
			label: 'Rice, paddy',
			fill: false,
			backgroundColor: window.chartColors.yellow,
			borderColor: window.chartColors.yellow,
			borderWidth:window.chartColors.borderWidth,
			pointRadius:0,

			data: [39382,
				40430,
				40879,
				40223,
				41548,
				42421,
				43748,
				44373,
				45702,
				46903,
				48645,
				48660,
				48776,
				50269,
				51139,
				52115,
				53247,
				53329,
				53792
			],
		},
		{
			label: 'Sorghum',
			fill: false,
			backgroundColor: window.chartColors.blue,
			borderColor: window.chartColors.blue,
			borderWidth:window.chartColors.borderWidth,
			pointRadius:0,

			data: [18007,
				18125,
				17596,
				18901,
				19225,
				19538,
				19459,
				20197,
				20247,
				22200,
				21466,
				21648,
				22880,
				23734,
				24887,
				26745,
				27022,
				28348,
				22637
			],
		},
		{
			label: 'Soybeans',
			fill: false,
			backgroundColor: window.chartColors.red,
			borderColor: window.chartColors.red,
			borderWidth:window.chartColors.borderWidth,
			pointRadius:0,

			data: [15898,
				15836,
				15782,
				16205,
				16614,
				17193,
				16980,
				17621,
				17252,
				17680,
				18528,
				17684,
				17606,
				18049,
				17711,
				18481,
				17882,
				19208,
				19266
			],
		},
		{
			label: 'Sweet potatoes',
			fill: false,
			backgroundColor: window.chartColors.pink,
			borderColor: window.chartColors.pink,
			borderWidth:window.chartColors.borderWidth,
			pointRadius:0,

			data: [137037,
				134762,
				132080,
				135245,
				136827,
				135751,
				141823,
				142096,
				141955,
				148298,
				137016,
				130381,
				149094,
				149692,
				148595,
				149955,
				153091,
				152570,
				158944
			],
		},
		{
			label: 'Wheat',
			fill: false,
			backgroundColor: window.chartColors.orange,
			borderColor: window.chartColors.orange,
			borderWidth:window.chartColors.borderWidth,
			pointRadius:0,

			data: [27507,
				27351,
				28470,
				29858,
				29776,
				30754,
				31260,
				31879,
				31652,
				32993,
				32346,
				31828,
				33016,
				33961,
				33120,
				32208,
				34069,
				34428,
				36092
			],
		},
		{
			label: 'Yams',
			fill: false,
			backgroundColor: window.chartColors.purple,
			borderColor: window.chartColors.purple,
			borderWidth:window.chartColors.borderWidth,
			pointRadius:0,

			data: [150038,
				144645,
				143175,
				150806,
				146304,
				154727,
				159049,
				149183,
				149121,
				160698,
				162859,
				158683,
				161690,
				159423,
				153059,
				161147,
				158659,
				159839,
				156746
			],
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



// Chart.js Bar Chart Example 

var barChartConfig = {
	type: 'line',

	data: {
		labels: [2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
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
		}]
	},
	options: {
		responsive: true,
		aspectRatio: 1.5,
		legend: {
			position: 'bottom',
			align: 'end',
		},
		title: {
			display: true,
			text: 'World Population vs. World Hunger'
		},
		tooltips: {
			mode: 'index',
			intersect: false,
			titleMarginBottom: 10,
			bodySpacing: 10,
			xPadding: 16,
			yPadding: 16,
			borderColor: window.chartColors.border,
			borderWidth: 1,
			backgroundColor: '#fff',
			bodyFontColor: window.chartColors.text,
			titleFontColor: window.chartColors.text,

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
					labelString: 'Population (millions)'
				  },
				gridLines: {
					drawBorder: false,
					color: window.chartColors.borders,
				},			
			}]
		}
		
	}
}







// Generate charts on load
window.addEventListener('load', function(){
	
	var lineChart = document.getElementById('canvas-linechart').getContext('2d');
	window.myLine = new Chart(lineChart, lineChartConfig);
	
	var barChart = document.getElementById('canvas-barchart').getContext('2d');
	window.myBar = new Chart(barChart, barChartConfig);
	

});	
	
