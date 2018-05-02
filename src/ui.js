/* global module */

import * as T from 'terrific';
import $ from 'jquery';

if (module.hot) {
	module.hot.accept();
}

function requireAll(requireContext) {
	return requireContext.keys().map(requireContext);
}

/* eslint-disable no-useless-escape */

// js files
requireAll(require.context('./shared', true,
	/(?:base)[\/\\]([^\/\\]+)[\/\\]js[\/\\]\1\.js$/
));
requireAll(require.context('./patterns', true,
	/(?:atoms|molecules|organisms|helpers)[\/\\]([^\/\\]+)[\/\\]js[\/\\]\1\.js$/
));
requireAll(require.context('./patterns', true,
	/(?:atoms|molecules|organisms|helpers)[\/\\]([^\/\\]+)[\/\\]js[\/\\]decorator[\/\\][^\/\\]+\.js$/
));

// css files
requireAll(require.context('./shared', true,
	/(?:base)[\/\\]([^\/\\]+)[\/\\]css[\/\\]\1\.s?css$/
));
requireAll(require.context('./patterns', true,
	/(?:atoms|molecules|organisms|helpers)[\/\\]([^\/\\]+)[\/\\]css[\/\\]\1\.s?css$/
));
requireAll(require.context('./patterns', true,
	/(?:atoms|molecules|organisms|helpers)[\/\\]([^\/\\]+)[\/\\]css[\/\\]modifier[\/\\][^\/\\]+\.s?css$/
));
/* eslint-enable no-useless-escape */

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
