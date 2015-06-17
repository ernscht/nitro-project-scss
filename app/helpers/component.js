var fs = require('fs'),
	hbs = require('hbs'),
	path = require('path'),
	merge = require('merge'),
	cfg = require('../core/config.js');

module.exports = function(name, data) {

	var lastArgument = arguments[arguments.length - 1],
		componentData = lastArgument && lastArgument.data ? lastArgument.data.root : {}; // default component data from controller & view

	for (var key in cfg.nitro.components) {
		if (cfg.nitro.components.hasOwnProperty(key)) {
			var component = cfg.nitro.components[key];
			if (component.hasOwnProperty('path')) {
				var templateFilename = name.toLowerCase(),
					templatePath = path.join(
						cfg.nitro.base_path,
						component.path,
						'/',
						name,
						'/',
						templateFilename + '.' + cfg.nitro.view_file_extension
					);

				if (fs.existsSync(templatePath)) { // TODO: existsSynch marked as deprecated - https://nodejs.org/api/fs.html#fs_fs_existssync_path
					var jsonFilename = ('string' === typeof data) ? data.toLowerCase() + '.json' : templateFilename + '.json',
						jsonPath = path.join(
							cfg.nitro.base_path,
							component.path,
							'/',
							name,
							'/_data/',
							jsonFilename
						);
					if (fs.existsSync(jsonPath)) {
						merge.recursive(componentData, JSON.parse(fs.readFileSync(jsonPath, 'utf8')));
					}


					if (componentData._query) {
						merge.recursive(componentData, componentData._query);
					}

					return new hbs.handlebars.SafeString(
						hbs.handlebars.compile(
							fs.readFileSync(templatePath, 'utf8')
						)(componentData)
					);
				}
			}
		}

	}

	throw new Error('Component ' + name + ' not found.');
};
