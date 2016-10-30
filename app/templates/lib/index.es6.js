'use strict';

import d3 from 'd3';
import assign from 'object-assign';
import defaults from './config';

export default class Chart {
	constructor(opts) {
		this.set(opts);
		if (!this.axis) {
			this.margin = {top: 0, right: 0, bottom: 0, left: 0};
		}
		this.init();
	}

	set(opts) {
		assign(this, defaults, opts);
	}

	init() {
	}

	render(data, opts) {
	}

	update(data) {
		this.render(data, {animate: true});
	}

	destroy() {
	}
}
