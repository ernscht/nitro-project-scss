/* eslint-disable no-undef */
if (module.hot) {
	module.hot.accept();
}
/* eslint-enable no-undef */

function requireAll(requireContext) {
	return requireContext.keys().map(requireContext);
}

/* eslint-disable no-useless-escape */

// js files
requireAll(require.context('./proto/js', true,	/^.*(js)$/));

// css files
requireAll(require.context('./proto/css', true, /^.*(s?css)$/));
requireAll(require.context('./patterns', true, /[\/\\]proto[\/\\](?:[a-z0-9\-]+).(s?css)$/));

/* eslint-enable no-useless-escape */
