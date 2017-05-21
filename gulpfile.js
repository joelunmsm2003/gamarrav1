// Los packages que vamos a usar
var gulp  = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	cssnano = require('gulp-cssnano'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	bower = require('gulp-bower'),
	browserSync = require('browser-sync').create();
	modRewrite = require('connect-modrewrite');
	gettext = require('gulp-angular-gettext');


// Compilar SASS, poner auto-prefijos, minimizar
gulp.task('styles', function() {
	return gulp.src('./bootstrap.scss') // ¿Dónde están los archivos fuentes?
		.pipe(plumber(function(error) { // Así podemos ver errores en el terminal
				gutil.log(gutil.colors.red(error.message));
				this.emit('end');
		}))
		.pipe(sourcemaps.init()) // Start Sourcemaps
		.pipe(sass())
		.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
		}))
		.pipe(gulp.dest('./build/css/'))
		//.pipe(rename({suffix: '.min'}))
		//.pipe(cssnano())
		//.pipe(sourcemaps.write('.')) // Creates sourcemaps for minified styles
		//.pipe(gulp.dest('./build/css/'))
});
		
 

gulp.task('index', function() {
	return gulp.src([	
		
	// Grab your custom scripts
	'index.js',

				
	])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat('index.js'))
		.pipe(gulp.dest('./build/js'))
		//.pipe(rename({suffix: '.min'}))
		//.pipe(uglify({mangle: false}))
		//.pipe(sourcemaps.write('.')) // Creates sourcemap for minified JS
		//.pipe(gulp.dest('./dist/js'))
});     

gulp.task('components', function() {
	return gulp.src([	
		
	// Grab your custom scripts
	'components/**/*.js',

				
	])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat('components.js'))
		.pipe(gulp.dest('./build/js'))
		//.pipe(rename({suffix: '.min'}))
		//.pipe(uglify({mangle: false}))
		//.pipe(sourcemaps.write('.')) // Creates sourcemap for minified JS
		//.pipe(gulp.dest('./dist/js'))
});  

gulp.task('services', function() {
	return gulp.src([	
		
	// Grab your custom scripts
	'services/*.js',

				
	])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat('services.js'))
		.pipe(gulp.dest('./build/js'))
		//.pipe(rename({suffix: '.min'}))
		//.pipe(uglify({mangle: false}))
		//.pipe(sourcemaps.write('.')) // Creates sourcemap for minified JS
		//.pipe(gulp.dest('./dist/js'))
});

// JSHint, concat, and minify JavaScript
gulp.task('vendor-js', function() {
	return gulp.src([	
		
	// Grab your custom scripts



	'./bower_components/angular/angular.js',
    './bower_components/angular-ui-router/release/angular-ui-router.js',
    './bower_components/ngstorage/ngStorage.js',
    './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    './node_modules/jquery/dist/jquery.js',
    './node_modules/highcharts/js/highcharts.js',

 

				
	])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('./build/js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(sourcemaps.write('.')) // Creates sourcemap for minified JS
		.pipe(gulp.dest('./build/js'))
}); 

// Update Foundation with Bower and save to /vendor
gulp.task('bower', function() {
	return bower({ cmd: 'update'})
		.pipe(gulp.dest('./bower_components/'))
});  

// Browser-Sync watch files and inject changes
gulp.task('browsersync', function() {
		// Watch files
		var files = [
			'./app/css/*.css', 
			'./app/js/*.js',
			'**/*.php',
			'app/images/**/*.{png,jpg,gif,svg,webp}',
		];

		browserSync.init(files, {
			// Replace with URL of your local site
			proxy: "http://localhost:2000/",
		});
		
		gulp.watch('./app/scss/**/*.scss', ['styles']);
		gulp.watch('./app/js/scripts/*.js', ['site-js']).on('change', browserSync.reload);

});



// Watch files for changes (without Browser-Sync)
gulp.task('watch', function() {

	
	// gulp.watch('./index.js', ['index']);

	// gulp.watch('./services/*.js', ['services']);
	
	// gulp.watch('./components/**/*.js', ['components']);

	// gulp.watch('./components/**/*.html', ['html']);

	// gulp.watch('./components/**/*.scss', ['styles']);

	gulp.watch('_variables.scss', ['styles']);

	gulp.watch('_styles.scss', ['styles']);

	
}); 

// Run styles, site-js and bootstrap-js
gulp.task('default', function() {
	gulp.start('styles', 'components', 'services','index');
});


//Languages 

gulp.task('pot', function () {
    return gulp.src(['./src/component/**/*.html','src/component/**/*.js'])
        .pipe(gettext.extract('template.pot', {
            // options to pass to angular-gettext-tools...
        }))

        .pipe(gulp.dest('./po/'));
});

gulp.task('translations', function () {
    return gulp.src('./po/*.po')
        .pipe(gettext.compile({
            // options to pass to angular-gettext-tools...
            format: 'javascript'
        }))
        .pipe(gulp.dest('./dist/translations/'));
});

gulp.task('html',function(){
    gulp.src('./components/**/*.html')
    .pipe(gulp.dest('./build/html'));
});
