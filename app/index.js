'use strict';
const superb = require('superb');
const normalizeUrl = require('normalize-url');
const humanizeUrl = require('humanize-url');
const yeoman = require('yeoman-generator');
const _s = require('underscore.string');
const moduleName = require('./module-name');

const UND = undefined;

module.exports = class extends yeoman.Base {
	constructor(a, b) {
		super(a, b);

		this.option('skip-tests', {
			type: 'boolean',
			desc: 'Do not include a test suite'
		});

		this.option('org', {
			type: 'string',
			desc: 'Publish to a GitHub organization account'
		});
	}
	init() {
		return this.prompt([{
			name: 'moduleName',
			message: 'What do you want to name your module?',
			default: _s.slugify(this.appname),
			filter: x => moduleName.slugify(x)
		}, {
			name: 'moduleDescription',
			message: 'What is your module description?',
			default: `My ${superb()} module`
		}, {
			name: 'githubUsername',
			message: 'What is your GitHub username?',
			store: true,
			validate: x => x.length > 0 ? true : 'You have to provide a username',
			when: () => !this.options.org
		}, {
			name: 'website',
			message: 'What is the URL of your website?',
			store: true,
			validate: x => x.length > 0 ? true : 'You have to provide a website URL',
			filter: x => normalizeUrl(x)
		}, {
			name: 'ava',
			message: 'Do you need a test suite?',
			type: 'confirm',
			default: Boolean(this.options.coveralls || this.options.coverage),
			when: () => (this.options['skip-tests'] === UND)
		}]).then(props => {
			const ava = props['ava' || 'skip-tests'] || this.options['skip-tests'];
			const repoName = moduleName.repoName(props.moduleName);

			const tpl = {
				moduleName: props.moduleName,
				moduleDescription: props.moduleDescription,
				camelModuleName: _s.camelize(repoName),
				githubUsername: this.options.org || props.githubUsername,
				repoName,
				name: this.user.git.name(),
				email: this.user.git.email(),
				website: props.website,
				humanizedWebsite: humanizeUrl(props.website),
				ava
			};

			const mv = (from, to) => {
				this.fs.move(this.destinationPath(from), this.destinationPath(to));
			};

			this.fs.copyTpl([
				`${this.templatePath()}/**`,
				'!**/test.js'
			], this.destinationPath(), tpl);

			if (props.ava) {
				this.fs.copyTpl(this.templatePath('test.js'), this.destinationPath('test.js'), tpl);
			}

			mv('editorconfig', '.editorconfig');
			mv('gitattributes', '.gitattributes');
			mv('gitignore', '.gitignore');
			mv('travis.yml', '.travis.yml');
			mv('_package.json', 'package.json');
		});
	}
	git() {
		this.spawnCommandSync('git', ['init']);
	}
	install() {
		this.installDependencies({bower: false});
	}
};
