var gulp = require("gulp");
var del = require("del");
var tsc = require("gulp-typescript");
var tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');
var tsProject = tsc.createProject("tsconfig.json");

/**
* Remove build directory.
*/
gulp.task('clean', function() {
	del(['build']);
});

gulp.task('tslint', function() {
return gulp.src('src/**/*.ts')
.pipe(tslint())
.pipe(tslint.report('prose', {
emitError: false
}));
})

/**
* Compile TypeScript sources and create sourcemaps in build directory.
*/
gulp.task("compile", () => {
var tsResult = gulp.src('src/**/*.ts')
.pipe(sourcemaps.init())
.pipe(tsc(tsProject));
return tsResult.js
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('build'));
});

/**
* Copy all resources that are not TypeScript files into build directory.
*/
gulp.task("resources", () => {
return gulp.src(["app/**/*"])
.pipe(gulp.dest("build"))
});

gulp.task('html', function () {
return gulp.src('src/**/*.html')
.pipe(gulp.dest('build'));
});

gulp.task('css', function () {
return gulp.src('src/**/*.css')
.pipe(gulp.dest('build'));
});

/**
* Copy all required libraries into build directory.
'primeui/primeui-ng-all.js',
'primeui/primeui-ng-all.css',
'primeui/themes/delta/theme.css',
'font-awesome-4.5.0/css/font-awesome.min.css',
'primeng/*'
*/
gulp.task("libs", () => {
return gulp.src([
'es6-shim/es6-shim.min.js',
'systemjs/dist/system-polyfills.js',
'angular2/bundles/angular2-polyfills.js',
'systemjs/dist/system.src.js',
'rxjs/bundles/Rx.js',
'angular2/bundles/angular2.dev.js',
'angular2/bundles/router.dev.js',
'ng2-bootstrap/bundles/ng2-bootstrap.js',
'moment/moment.js',
'bootstrap/dist/css/bootstrap.min.css',
'primeui/primeui-ng-all.js',
'primeui/primeui-ng-all.css',
'primeui/themes/delta/theme.css',
'primeng/*'


], {cwd: "node_modules/**"})
.pipe(gulp.dest("build/lib"));
});

/**
* Build the project.
*/
gulp.task("build", ['compile', 'tslint', 'html', 'css', 'resources', 'libs'], () => {
console.log("Building the project ...")
});
