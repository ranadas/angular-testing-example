var gulp = require('gulp'),
    connect = require('gulp-connect'),
    Server = require('karma').Server,
    protractor = require("gulp-protractor").protractor;

var modRewrite = require('connect-modrewrite');

gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    livereload: true,
    port: 8080,
    middleware: function() {
        return [
            modRewrite([
                '!\\.\\w+$ /index.html [L]'
            ])
        ];
    }
  });
});

gulp.task('unit', function (done) {
  var server = new Server({
    configFile: __dirname + '/tests/karma.conf.js',
    singleRun: true
  }, done);
  server.start();
});

gulp.task('e2e', function(done) {
  var args = ['--baseUrl', 'http://127.0.0.1:8080'];
  gulp.src(["./tests/e2e/*.js"])
    .pipe(protractor({
      configFile: "tests/protractor.conf.js",
      args: args
    }))
    .on('error', function(e) { throw e; });
});

// Rerun the task when a file changes
gulp.task('html', function(){
    console.log('Reloading with HTML change...');
    gulp.src('./app/**/*.html').pipe(connect.reload());
});

gulp.task('js', function(){
    console.log('Reloading with JS change...');
    gulp.src('./app/js/*.js').pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('app/js/**/*.js', ['js']);
    gulp.watch('app/*.html', ['html']);
});

gulp.task('default', ['connect','html', 'js', 'watch']);

/** e2e : TODO **/

var protractorOptions = {
    configFile: 'tests/protractor.conf.js'
};
// The protractor task
//var protractor = require('gulp-protractor').protractor;

// Start a standalone server
var webdriver_standalone = require('gulp-protractor').webdriver_standalone;

// Download and update the selenium driver
var webdriver_update = require('gulp-protractor').webdriver_update;

// Downloads the selenium webdriver
gulp.task('webdriver_update', webdriver_update);

// Start the standalone selenium server
// NOTE: This is not needed if you reference the seleniumServerJar in your protractor.conf.js
gulp.task('webdriver_standalone', webdriver_standalone);

// start webserver for e2e tests
//gulp.task('e2e-server', ['install-widgets'], function(){
//    connect.server({
//        port: 9003
//    });
//});

// Setting up the test task
//gulp.task('e2ee', ['connect', 'webdriver_update'], function(cb) {
gulp.task('e2ee', ['connect'], function(cb) {
    gulp.src('tests/e2e/*.js')
        .pipe(protractor(protractorOptions))
        .on('error', function(e) {
            // stop webserver
            connect.serverClose();
            // print test results
            console.log(e);
        })
        .on('end', function(){
            // stop webserver
            connect.serverClose();
            cb();
        });
});
