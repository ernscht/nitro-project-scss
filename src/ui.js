/* global module */

import * as T from 'terrific';
import $ from 'jquery';

import './shared/base/security/js/security';
import './shared/base/reset/css/reset.scss';
import './shared/base/document/css/document.scss';

import './patterns/atoms/box';
import './patterns/atoms/button';
import './patterns/atoms/cta';
import './patterns/atoms/icon';
import './patterns/atoms/image';
import './patterns/atoms/loader';
import './patterns/molecules/example';

if (module.hot) {
	module.hot.accept();
}

// custom code
console.log('I\'m from the entry point'); // eslint-disable-line

$(document).ready(() => {
	const application = new T.Application();
	application.registerModules();
	application.start();
});

// Uncomment one of the following lines to see error handling
// require('unknown-module')
// } syntax-error
