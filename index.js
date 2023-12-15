const Hooks = require('vanilla-bat-hooks');

var hooks = new Hooks();
hooks.register('welcome', 'Action example', function() { console.log('hello'); });
hooks.execute('welcome'); // output: hello


