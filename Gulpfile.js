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