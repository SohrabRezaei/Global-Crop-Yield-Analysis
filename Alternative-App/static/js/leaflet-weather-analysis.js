console.log("working");

// Create the map object with a center and zoom level.
let map = L.map("weatherMap").setView([40, 0], 2);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

//layer groups
let rainfall = new L.LayerGroup();
let temperature = new L.LayerGroup();

let overlays = {
    "Rainfall": rainfall,
    "temperature": temperature
  };

L.control.layers(overlays).addTo(map);

//adding meterological analysis to map
L.OWM = L.TileLayer.extend({
	options: {
		appId: '4cb34f3f9247c6b6c21afc3740c43686', /* pass your own AppId as parameter when creating the layer. Get your own AppId at https://www.openweathermap.org/appid */
		baseUrl: "https://{s}.tile.openweathermap.org/map/{layername}/{z}/{x}/{y}.png",
		maxZoom: 18,
		showLegend: true,
		legendImagePath: null,
		legendPosition: 'bottomleft',
		attribution: 'Weather from <a href="https://openweathermap.org/" alt="World Map and worldwide Weather Forecast online">OpenWeatherMap</a>'
	},

	initialize: function (options) {
		L.Util.setOptions(this, options);
		var tileurl = this.options.baseUrl.replace('{layername}', this._owmLayerName);
		tileurl = tileurl + '?appid=' + this.options.appId;

		this._map = null;
		this._legendControl = null;
		this._legendId = null;
		this._owmtileurl = tileurl;
		L.TileLayer.prototype.initialize.call(this, this._owmtileurl, options);
	},

	onAdd: function(map) {
		this._map = map;
		if (this.options.showLegend && this.options.legendImagePath != null) {
			this._legendControl = this._getLegendControl();
			this._legendId = this._legendControl.addLegend(this.options.legendImagePath);
		}
		L.TileLayer.prototype.onAdd.call(this, map);
	},

	onRemove: function(map) {
		if (this._legendControl != null) {
			this._legendControl.removeLegend(this._legendId);
			this._legendControl = null;
			this._legendId = null;
		}
		L.TileLayer.prototype.onRemove.call(this, map);
		this._map = null;
	},

	_getLegendControl: function() {
		if (typeof this._map._owm_legendcontrol == 'undefined' || !this._map._owm_legendcontrol) {
			this._map._owm_legendcontrol = new L.OWM.LegendControl({position: this.options.legendPosition});
			this._map.addControl(this._map._owm_legendcontrol);
		}
		return this._map._owm_legendcontrol;
	}
});

(function () {

	L.OWM.RainClassic = L.OWM.extend({
		_owmLayerName: 'rain_cls'
	});
	L.OWM.rainClassic = function (options) {
		var layer = new L.OWM.RainClassic(options);
		if (layer.options.legendImagePath == null) {
			layer.options.legendImagePath = '../static/images/rain_legend.png';
		}
		return layer;
	};

	L.OWM.Temperature = L.OWM.extend({
		_owmLayerName: 'temp'
	});
	L.OWM.temperature = function (options) {
		var layer = new L.OWM.Temperature(options);
		if (layer.options.legendImagePath == null) {
			layer.options.legendImagePath = '../static/images/temp_legend.png';
		}
		return layer;
	};


}());

L.OWM.LegendControl = L.Control.extend({
	options: {
		position: "bottomleft"
	},

	initialize: function(options) {
		L.Util.setOptions(this, options);
		this._container = L.DomUtil.create('div', 'owm-legend-container');
		this._container.style.display = 'none';
		this._legendCounter = 0;
		this._legendContainer = new Array();
	},

	onAdd: function(map) {
		return this._container;
	},

	addLegend: function(legendImagePath) {
		var legendId = this._legendCounter++;
		this._legendContainer[legendId] = legendImagePath;
		this._redrawLegend();
		this._container.style.display = 'block';
		return legendId;
	},

	removeLegend: function(legendId) {
		if (typeof this._legendContainer[legendId] != 'undefined') {
			delete this._legendContainer[legendId];
		}
		// reset counter if no legend is in collection
		var containerEmpty = true;
		for (var idx in this._legendContainer) {
			containerEmpty = false;
			break;
		}
		if (containerEmpty) {
			this._legendCounter = 0;
			this._container.style.display = 'none';
		}
		this._redrawLegend();
	},

	_redrawLegend: function() {
		this._container.innerHTML = ''; // clear container
		var isLeft = this.options.position.indexOf('left') !== -1;
		var cssFloat = isLeft ? 'left' : 'right';
		for (var idx in this._legendContainer) {
			if (isNaN(idx)) {
				continue;
			}
			var imgPath = this._legendContainer[idx];
			var item = L.DomUtil.create('div', 'owm-legend-item', this._container);
			item.style.cssFloat = cssFloat;
			if (isLeft) {
				item.style.marginRight = '10px';
			} else {
				item.style.marginLeft = '10px';
			}
			item.innerHTML = '<img src="' + imgPath + '" border="0" />';
		}
	}
});

/**
 * Layer for current weather of cities.
 */
L.OWM.Current = L.Layer.extend({

	options: {
		appId: null, // get your free Application ID at www.openweathermap.org
		type: 'city', // available types: 'city'. 'station' is not supported any more
		lang: 'en', // available: 'en', 'de', 'ru', 'fr', 'nl', 'es', 'ca' (not every language is finished yet)
		minZoom: 7,
		interval: 0, // interval for rereading city data in minutes
		progressControl: true, // available: true, false
		imageLoadingUrl: 'owmloading.gif', // URL of loading image relative to HTML document
		imageLoadingBgUrl: null, // URL of background image for progress control
		temperatureUnit: 'C', // available: 'K' (Kelvin), 'C' (Celsius), 'F' (Fahrenheit)
		temperatureDigits: 1,
		speedUnit: 'ms', // available: 'ms' (m/s), 'kmh' (km/h), 'mph' (mph)
		speedDigits: 0,
		popup: true, // available: true, false
		keepPopup: true, // available: true, false
		showOwmStationLink: true, // available: true, false
		showWindSpeed: 'both', // available: 'speed', 'beaufort', 'both'
		showWindDirection: 'both', // available: 'deg', 'desc', 'both'
		showTimestamp: true, // available: true, false
		showTempMinMax: true, // available: true, false
		useLocalTime: true, // available: true, false
		clusterSize: 150,
		imageUrlCity: 'https://openweathermap.org/img/w/{icon}.png',
		imageWidth: 50,
		imageHeight: 50,
		imageUrlStation: 'https://openweathermap.org/img/s/istation.png',
		imageWidthStation: 25,
		imageHeightStation: 25,
		imageUrlPlane: 'https://openweathermap.org/img/s/iplane.png',
		imageWidthPlane: 25,
		imageHeightPlane: 25,
		markerFunction: null, // user defined function for marker creation
		popupFunction: null, // user defined function for popup creation
		caching: true, // use caching of current weather data
		cacheMaxAge: 15, // maximum age of cache content in minutes before it gets invalidated
		keepOnMinZoom: false // keep or remove markers when zoom < minZoom
	},

	initialize: function(options) {
		L.setOptions(this, options);
		this._layer = L.layerGroup();
		this._timeoutId = null;
		this._requests = {};
		this._markers = new Array();
		this._markedMarker = null;
		this._map = null;
		this._urlTemplate = 'https://api.openweathermap.org/data/2.5/box/{type}?{appId}cnt=300&format=json&units=metric&bbox={minlon},{minlat},{maxlon},{maxlat},10';
		this._directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
		this._msbft = [0.3, 1.6, 3.4, 5.5, 8.0, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.7, 37.0, 41.5, 46.2, 51.0, 56.1, 61.3]; // Beaufort scala
		this._tempUnits = { K: 'K', C: '°C', F: 'F'};
		this._progressCtrl = null;
		if (this.options.progressControl) {
			var bgIcon;
			if (this.options.imageLoadingBgUrl) {
				bgIcon = this.options.imageLoadingBgUrl;
			} else {
				bgIcon = this.options.imageUrlCity.replace('{icon}', '10d');
				if (this.options.type != 'city') {
					var bgIcon = this.options.imageUrlStation;
				}
			}
			this._progressCtrl = L.OWM.progressControl({
					type: this.options.type
					, bgImage: bgIcon
					, imageLoadingUrl: this.options.imageLoadingUrl
					, owmInstance: this
			});
		}
		this._cache = L.OWM.currentCache({ maxAge: this.options.cacheMaxAge });
	},

	onAdd: function(map) {
		this._map = map;
		this._map.addLayer(this._layer);
		this._map.on('moveend', this.update, this);
		// add progress control
		if (this._progressCtrl != null) {
			this._map.addControl(this._progressCtrl);
		}
		this.update();
	},

	onRemove: function(map) {
		// clear timeout
		if (this._timeoutId !== null) {
			window.clearTimeout(this._timeoutId);
			this._timeoutId = null;
		}
		// remove progress control
		if (this._progressCtrl != null) {
			this._map.removeControl(this._progressCtrl);
		}
		// remove layer and markers
		this._map.off('moveend', this.update, this);
		this._map.removeLayer(this._layer);
		this._layer.clearLayers();
		this._map = null;
		this._cache.clear();
	},

	getAttribution: function() {
		return 'Weather from <a href="https://openweathermap.org/" '
			+ 'alt="World Map and worldwide Weather Forecast online">OpenWeatherMap</a>';
	},

	update: function() {
		// clear existing timeout
		if (this._timeoutId) {
			window.clearTimeout(this._timeoutId);
			this._timeoutId = null;
		}

		var _this = this;

		// clear requests for all types
		for (var typ in this._requests) {
			var request = this._requests[typ];
			this.fire('owmloadingend', {type: typ});
			request.abort();
		}
		this._requests = {};

		if (this._map.getZoom() < this.options.minZoom) {
			this.fire('owmloadingend', {type: _this.options.type});
			if (!this.options.keepOnMinZoom) {
				this._layer.clearLayers();
			}
			return;
		}

		// try to get cached data first
		var bounds = this._map.getBounds();
		var data = null;
		if (this.options.caching) {
			data = this._cache.get(bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth());
		}
		if (data !== null) {
			// using cached data
			this._processRequestedData(this, data);
		} else {
			// fetch new data from OWM
			this.fire('owmloadingstart', {type: _this.options.type});
			var url = this._urlTemplate
						.replace('{appId}', this.options.appId ? 'APPID=' + this.options.appId + '&' : '')
						.replace('{type}', this.options.type)
						.replace('{minlon}', bounds.getWest())
						.replace('{minlat}', bounds.getSouth())
						.replace('{maxlon}', bounds.getEast())
						.replace('{maxlat}', bounds.getNorth())
						;
			this._requests[this.options.type] = L.OWM.Utils.jsonp(url, function(data) {
				delete _this._requests[_this.options.type];

				if (!_this._map) {
					// Nothing to do if layer is gone but this request is still active
					return;
				}

				if (_this.options.caching) {
					_this._cache.set(data, _this._map.getBounds());
				}
				_this._processRequestedData(_this, typeof data.list == 'undefined' ? new Array() : data.list);
				_this.fire('owmloadingend', {type: _this.options.type});
			});
		}
		if (this.options.interval && this.options.interval > 0) {
			this._timeoutId = window.setTimeout(function() {_this.update()}, 60000*this.options.interval);
		}
	},

	_processRequestedData: function(_this, data) {

		// read all cities
		var stations = {};
		for (var i in data) {
			var stat = data[i];
			if (!_this._map) { // maybe layer is gone while we are looping here
				return;
			}
			// only use cities having a minimum distance of some pixels on the map
			var pt = _this._map.latLngToLayerPoint(new L.LatLng(stat.coord.Lat, stat.coord.Lon));
			var key = '' + (Math.round(pt.x/_this.options.clusterSize)) + "_" + (Math.round(pt.y/_this.options.clusterSize));
			if (!stations[key] || parseInt(stations[key].rang) < parseInt(stat.rang)) {
				stations[key] = stat;
			}
		}

		// hide LayerGroup from map and remove old markers
		var markerWithPopup = null;
		if (_this.options.keepPopup) {
			markerWithPopup = _this._getMarkerWithPopup(_this._markers);
		}
		if (_this._map && _this._map.hasLayer(_this._layer)) {
			_this._map.removeLayer(_this._layer);
		}
		_this._layer.clearLayers();

		// add the cities as markers to the LayerGroup
		_this._markers = new Array();
		for (var key in stations) {
			var marker;
			if (_this.options.markerFunction != null && typeof _this.options.markerFunction == 'function') {
				marker = _this.options.markerFunction.call(_this, stations[key]);
			} else {
				marker = _this._createMarker(stations[key]);
			}
			marker.options.owmId = stations[key].id;
			_this._layer.addLayer(marker);
			_this._markers.push(marker);
			if (_this.options.popup) {
				if (_this.options.popupFunction != null && typeof _this.options.popupFunction == 'function') {
					marker.bindPopup(_this.options.popupFunction.call(_this, stations[key]));
				} else {
					marker.bindPopup(_this._createPopup(stations[key]));
				}
			}
			if (markerWithPopup != null
					&& typeof markerWithPopup.options.owmId != 'undefined'
					&& markerWithPopup.options.owmId == marker.options.owmId) {
				markerWithPopup = marker;
			}
		}

		// add the LayerGroup to the map
		_this._map && _this._map.addLayer(_this._layer);
		if (markerWithPopup != null) {
			markerWithPopup.openPopup();
		}
		_this.fire('owmlayeradd', {markers: _this._markers});
	},

	_getMarkerWithPopup: function(markers) {
		var marker = null;
		for (var idx in markers) {
			var m = markers[idx];
			if (m._popup && m._map && m._map.hasLayer(m._popup)) {
				marker = m;
				break;
			}
		}
		return marker;
	},

	_createPopup: function(station) {
		var showLink = typeof station.id != 'undefined' && this.options.showOwmStationLink;
		var txt = '<div class="owm-popup-name">';
		if (showLink) {
			var typ = 'station';
			if (typeof station.weather != 'undefined') {
				typ = 'city';
			}
			txt += '<a href="https://openweathermap.org/' + typ + '/' + station.id + '" target="_blank" title="'
				+ this.i18n('owmlinktitle', 'Details at OpenWeatherMap') + '">';
		}
		txt += station.name;
		if (showLink) {
			txt += '</a>';
		}
		txt += '</div>';
		if (typeof station.weather != 'undefined' && typeof station.weather[0] != 'undefined') {
			if (typeof station.weather[0].description != 'undefined' && typeof station.weather[0].id != 'undefined') {
				txt += '<div class="owm-popup-description">'
					+ this.i18n('id'+station.weather[0].id, station.weather[0].description + ' (' + station.weather[0].id + ')')
					+ '</div>';
			}
		}
		var imgData = this._getImageData(station);
		txt += '<div class="owm-popup-main"><img src="' + imgData.url + '" width="' + imgData.width
				+ '" height="' + imgData.height + '" border="0" />';
		if (typeof station.main != 'undefined' && typeof station.main.temp != 'undefined') {
			txt += '<span class="owm-popup-temp">' + this._temperatureConvert(station.main.temp)
				+ '&nbsp;' + this._displayTemperatureUnit() + '</span>';
		}
		txt += '</div>';
		txt += '<div class="owm-popup-details">';
		if (typeof station.main != 'undefined') {
			if (typeof station.main.humidity != 'undefined') {
				txt += '<div class="owm-popup-detail">'
					+ this.i18n('humidity', 'Humidity')
					+ ': ' + station.main.humidity + '&nbsp;%</div>';
			}

			if (this.options.showTempMinMax) {
				if (typeof station.main.temp_max != 'undefined' && typeof station.main.temp_min != 'undefined') {
					txt += '<div class="owm-popup-detail">'
						+ this.i18n('temp_minmax', 'Temp. min/max')
						+ ': '
							+ this._temperatureConvert(station.main.temp_min)
						+ '&nbsp;/&nbsp;'
						+ this._temperatureConvert(station.main.temp_max)
						+ '&nbsp;' + this._displayTemperatureUnit() + '</div>';
				}
			}
		}
		if (station.rain != null && typeof station.rain != 'undefined' && typeof station.rain['1h'] != 'undefined') {
			txt += '<div class="owm-popup-detail">'
				+ this.i18n('rain_1h', 'Rain (1h)')
				+ ': ' + station.rain['1h'] + '&nbsp;ml</div>';
		}

		if (typeof station.dt != 'undefined' && this.options.showTimestamp) {
			txt += '<div class="owm-popup-timestamp">';
			txt += '(' + this._convertTimestamp(station.dt) + ')';
			txt += '</div>';
		}
		txt += '</div>';
		return txt;
	},

	_getImageData: function(station) {
		var imageUrl;
		var imageWidth = this.options.imageWidth;
		var imageHeight = this.options.imageHeight;
		var imageUrlTemplate = this.options.imageUrlCity;
		if (station.weather && station.weather[0] && station.weather[0].icon) {
			imageUrl = imageUrlTemplate.replace('{icon}', station.weather[0].icon);
		} else if (station.type && station.type == 1) {
			imageUrl = this.options.imageUrlPlane;
			imageWidth = this.options.imageWidthPlane;
			imageHeight = this.options.imageWidthPLane;
		} else {
			imageUrl = this.options.imageUrlStation;
			imageWidth = this.options.imageWidthStation;
			imageHeight = this.options.imageWidthStation;
		}
		return {url: imageUrl, width: imageWidth, height: imageHeight};
	},

	_createMarker: function(station) {
		var imageData = this._getImageData(station);
		var icon = L.divIcon({
						className: ''
						, iconAnchor: new L.Point(25, imageData.height/2)
						, popupAnchor: new L.Point(0, -10)
						, html: this._icondivtext(station, imageData.url, imageData.width, imageData.height)
					});
		var marker = L.marker([station.coord.Lat, station.coord.Lon], {icon: icon});
		return marker;
	},

	_icondivtext: function(station, imageurl, width, height) {
		var txt = '';
		txt += '<div class="owm-icondiv">'
			+ '<img src="' + imageurl + '" border="0" width="' + width + '" height="' + height + '" />';
		if (typeof station.main != 'undefined' && typeof station.main.temp != 'undefined') {
			txt += '<div class="owm-icondiv-temp">' + this._temperatureConvert(station.main.temp)
				+ '&nbsp;' + this._displayTemperatureUnit() + '</div>';
		}
		txt += '</div>';
		return txt;
	},

	_temperatureConvert: function(tempC) {
		var temp = tempC;
		switch (this.options.temperatureUnit) {
			case 'K':
				temp = (tempC + 273.15);
				break;
			case 'C':
				break;
			case 'F':
				temp = ((tempC + 273.15)*1.8-459.67);
				break;
		}
		return temp.toFixed(this.options.temperatureDigits);
	},

	_displayTemperatureUnit: function() {
		var unit = this._tempUnits['K'];
		if (typeof this._tempUnits[this.options.temperatureUnit] != 'undefined') {
			unit = this._tempUnits[this.options.temperatureUnit];
		}
		return unit;
	},



	i18n: function(key, fallback) {
		var lang = this.options.lang;
		if (typeof L.OWM.Utils.i18n != 'undefined'
				&& typeof L.OWM.Utils.i18n[lang] != 'undefined'
				&& typeof L.OWM.Utils.i18n[lang][key] != 'undefined') {
			return  L.OWM.Utils.i18n[lang][key]
		}
		return fallback;
	}

});
L.OWM.current = function(options) { return new L.OWM.Current(options); };

L.OWM.ProgressControl = L.Control.extend({

	options: {
		position: "topleft",
		type: 'city',
		bgImage: null // bgImage is set in L.OWM.Current when creating this ProgressControll instance
	},

	initialize: function(options) {
		L.Util.setOptions(this, options);
		this._container = L.DomUtil.create('div', 'leaflet-control-layers');
		if (this.options.bgImage != null) {
			this._container.style.backgroundImage ='url(' + this.options.bgImage + ')';
			this._container.style.backgroundRepeat = 'no-repeat';
			this._container.style.backgroundPosition = 'center center';
		}
		L.DomEvent.disableClickPropagation(this._container);
		this._container.innerHTML = '<img src="' + this.options.imageLoadingUrl + '" width="50" height="50" />';
	},

	onAdd: function(map) {
		this._map = map;
		this.options.owmInstance.on('owmloadingstart', this._activate, this);
		this.options.owmInstance.on('owmloadingend', this._deactivate, this);
		return this._container;
	},

	_activate: function(e) {
		if (e.target.options.type == this.options.type) {
			this._container.style.display = 'block';
		}
	},

	_deactivate: function(e) {
		if (e.target.options.type == this.options.type) {
			this._container.style.display = 'none';
		}
	},

	onRemove: function(map) {
		this.options.owmInstance.off('owmloadingstart', this._activate, this);
		this.options.owmInstance.off('owmloadingend', this._deactivate, this);
		this._container.style.display = 'none';
		this._map = null;
	}

});
L.OWM.progressControl = function(options) { return new L.OWM.ProgressControl(options); };

L.OWM.CurrentCache = L.Class.extend({

	options: {
		maxAge: 15 // age in minutes before cache data is invalidated
	},

	initialize: function(options) {
		L.Util.setOptions(this, options);
		this.clear();
	},

	clear: function() {
		this._cachedData = null;
		this._cachedTime = 0;
		this._cachedBBox = {minLon: 181, minLat: 91, maxLon: -181, maxLat: -91};
	},

	get: function(minLon, minLat, maxLon, maxLat) {
		if (this._cachedData == null) {
			// no cached data available
			return null;
		}
		if ((new Date()).getTime() - this._cachedTime > 60000*this.options.maxAge) {
			// cached data is too old
			this.clear();
			return null;
		}
		if (minLon <= this._cachedBBox.minLon || minLat <= this._cachedBBox.minLat
				|| maxLon >= this._cachedBBox.maxLon || maxLat >= this._cachedBBox.maxLat) {
			// new area is outside of cached area
			this.clear();
			return null;
		}

		// clip cached data to bounds
		var clippedStations = new Array();
		var cnt = 0;
		for (var k in this._cachedData.list) {
			var station = this._cachedData.list[k];
			if (station.coord.Lon >= minLon && station.coord.Lon <= maxLon
					&& station.coord.Lat >= minLat && station.coord.Lat <= maxLat) {
				clippedStations[k] = station;
				cnt++;
			}
		}
		return clippedStations;
	},

	set: function(data, bounds) {
		this._cachedData = data;
		this._cachedBBox.minLon = bounds.getWest();
		this._cachedBBox.minLat = bounds.getSouth();
		this._cachedBBox.maxLon = bounds.getEast();
		this._cachedBBox.maxLat = bounds.getNorth();
		this._cachedTime = (new Date()).getTime();
	}

});
L.OWM.currentCache = function(options) { return new L.OWM.CurrentCache(options); };


L.OWM.Utils = {

	callbacks: {},
	callbackCounter: 0,

	jsonp: function(url, callbackFn) {
		var _this = this;
		var elem = document.createElement('script');
		var counter = this.callbackCounter++;
		var callback = 'L.OWM.Utils.callbacks[' + counter + ']';
		var abort = function() {
			if (elem.parentNode) {
				return elem.parentNode.removeChild(elem);
			}
		};

		this.callbacks[counter] = function(data) {
			delete _this.callbacks[counter];
			return callbackFn(data);
		};

		elem.src = '' + url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callback;
		elem.type = 'text/javascript';
		document.getElementsByTagName('body')[0].appendChild(elem);
		return { abort: abort };
	},

};

var raincls = L.OWM.rainClassic({appId: '4cb34f3f9247c6b6c21afc3740c43686'}).addTo(rainfall);
rainfall.addTo(map);

var temp = L.OWM.temperature({appId: '4cb34f3f9247c6b6c21afc3740c43686'}).addTo(temperature);
temperature.addTo(map);

