'use strict';

var d3 = require('d3');
var assign = require('object-assign');
var defaults = require('./config');

function Chart(opts) {
	this.set(opts);
	if (!this.axis) {
		this.margin = {top: 0, right: 0, bottom: 0, left: 0};
	}
	this.init();
}

Chart.prototype = {
	set: function (opts) {
		assign(this, defaults, opts);
	},

	init: function () {
	},

	render: function (data, opts) {
	},

	update: function (data) {
		this.render(data, {animate: true});
	},

	destroy: function () {
	}
};

module.exports = Chart;
