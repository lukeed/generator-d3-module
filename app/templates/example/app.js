'use strict';

var Chart = require('../lib');
var $ = require('./help');

var c1;

function init() {
	c1 = new Chart({
		target: '#c1',
	});

	c1.render($.gen(24));
}

window.update = function () {
	c1.update($.gen(24));
};

$.on(document, 'DOMContentLoaded', init);
