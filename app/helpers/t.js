/**
 * Simple Handlebars Translation Helper
 *
 * @dependency: https://www.npmjs.com/package/i18next
 * http://i18next.com/
 *
 * @examples
 * translation file in project/locales/default/translation.json
 *
 * {{t "test.example"}}
 * {{t "test.interpolation1" "alphabet" "a" "l" "p"}}
 * {{t "test.interpolation2" "alphabet" "e" "t"}}
 * {{t "test.interpolation3" word="alphabet" one="a"}}
 */
var i18n = require('i18next'),
	hbs = require('hbs');

var options = {
	fallbackLng: 'default',
	resGetPath: 'project/locales/__lng__/__ns__.json',
	debug: false
};
i18n.init(options);

module.exports = function(key) {

	var interpolationPrefix = '{',
		interpolationSuffix = '}',
		args = [].slice.call(arguments),
		values = args.slice(1, -1),
		hash = args.slice(-1)[0].hash,
		result = i18n.t.apply(i18n, args), // default translations
		regExp;

	// custom replaces from arguments
	values.forEach(function(item, index) {
		if (typeof item === 'string') {
			regExp = new RegExp('\\' + interpolationPrefix + (index+1) + '\\' + interpolationSuffix, 'g');
			result = result.replace(regExp, item);
		}
		else if (typeof item === 'object') {
			for (var key in item) {
				if (item.hasOwnProperty(key)) {
					regExp = new RegExp('\\' + interpolationPrefix + key + '\\' + interpolationSuffix, 'g');
					result = result.replace(regExp, item[key]);
				}
			}
		}
	});
	// custom replaces from hash
	if (Object.keys(hash).length !== 0) {
		for (var name in hash) {
			if (hash.hasOwnProperty(name)) {
				regExp = new RegExp('\\' + interpolationPrefix + name + '\\' + interpolationSuffix, 'g');
				result = result.replace(regExp, hash[name]);
			}
		}
	}

	return new hbs.handlebars.SafeString(result);
};
