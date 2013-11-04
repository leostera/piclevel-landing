var path = require('path');
var fs = require('fs');
var Builder = require('component-builder');
var str2js  = require('string-to-js');
var less    = require('less');
var utils   = require('./utils');

var convertTemplate = function (builder) {
  // hook into the "before scripts" event
  builder.hook('before scripts', function (pkg, fn) {
    // check if we have .scripts in component.json
    var tmpls = pkg.config.scripts;
    if (!tmpls || !tmpls.length) {
      return fn();
    }


    // translate templates
    tmpls.forEach(function (file){
      // only views
      if (!/views/ig.test(file)) return;

      var start = new Date;

      var ext = path.extname(file);
      var originalFile = file;
      var file = pkg.path(file);

      if(ext === '.js') {
        file = file.replace(/.js$/ig, '.html');
      }

      // if the .html file exists
      if(fs.existsSync(file)) {
        // read the file
        var str = fs.readFileSync(file, 'utf8');
        var fn = str2js(str);
        newFile = file.replace(/.html$/ig,'.js');

        fs.writeFileSync(newFile, fn);
        pkg.addFile('scripts', originalFile.replace(/.html$/ig,'.js'));
        pkg.removeFile('scripts', file);
        var duration = new Date - start;
        var time = ' – '+duration+'ms';
        console.log(' - processed '+originalFile+time);
      } else if(! fs.existsSync(pkg.path(originalFile)) ) {
        console.error('Couldn\t find '+pkg.path(originalFile));
      }
    }.bind(this));

    fn();
  }.bind(this));
}.bind(this);

var compileLess = function (builder) {
  builder.hook('before scripts', function (pkg, fn) {
    // check if we have .styles in component.json
    var styles = pkg.config.styles;
    if (!styles || !styles.length) {
      return fn();
    }


    // translate templates
    styles.forEach(function (file){
      // only styles
      if (!/styles/ig.test(file)) return;

      var start = new Date;

      var ext = path.extname(file);
      var originalFile = file;
      var file = pkg.path(file);
      if(ext === '.css') {
        file = file.replace(/.css$/ig, '.less');
      }

      if(fs.existsSync(file)) {
        // read the file
        var str = fs.readFileSync(file, 'utf8');
        newFile = file.replace(/.less$/ig,'.css');

        less.render(str, function (e, css) {
          if(e) console.error(e);
          fs.writeFileSync(newFile, css);

          var duration = new Date - start;
          var time = ' – '+duration+'ms';
          console.log(' - processed '+originalFile+time);
        }.bind(this));
      } else if(! fs.existsSync(pkg.path(originalFile)) ) {
        console.error('Couldn\t find '+pkg.path(originalFile));
      }

    }.bind(this));

    fn();
  }.bind(this));
}.bind(this);

var start = new Date;

var component = utils.readFileToObject(path.join(__dirname,'component.json'));

if(!component) {
  console.error('There\'s no component.json at '+__dirname);
}


var local = component.local.map(function (l) {
  return __dirname+'/modules/'+l;
}.bind(this));


var dependencies = Object.keys(component.dependencies).map( function (d) {
  return __dirname+'/components/'+d.replace(/\//ig,'-');
}.bind(this));


dependencies = dependencies.concat(local);

var builder = new Builder(__dirname);
console.log('building '+__dirname.split('/').pop());

builder.use(convertTemplate);
builder.use(compileLess);

component.paths.forEach(function (p) {
  builder.addLookup(path.join(__dirname,p));
}.bind(this));

builder.copyAssetsTo(path.join(__dirname,'build'));
builder.build( function (err, obj) {
  if (err) console.error(err);
  if (obj.js) fs.writeFileSync(path.join(__dirname,'build/build.js'), obj.require + obj.js);
  if (obj.css) fs.writeFileSync(path.join(__dirname,'build/build.css'), obj.css);
}.bind(this));

var duration = new Date - start;
var time = '– '+duration+'ms';
console.log('build completed '+time)
this.building = false;