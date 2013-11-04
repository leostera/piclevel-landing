// auto-exports //

var app = angular.module('website', ['ngRoute', 'ngAnimate']);

require('./controllers/hello');
require('./directives/backgrounds');

require('./config');
require('./routes');