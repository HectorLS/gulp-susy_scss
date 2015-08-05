
// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
	sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    sassdoc      = require('sassdoc');
    /*browserSync  = require('browser-sync').create();*/




// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

/* SASS options  */
var sassInput     = './app/scss/**/*.{scss,sass}',
    sassOutput    = './app/css';
    sassOptions   = {
                      errLogToConsole: true,
                      outputStyle: 'expanded'
                    };

/* Autoprefixer Options */
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};


//           $TASKS                   \\
// ___________________________________//



// -----------------------------------------------------------------------------
// Sass compilation
// -----------------------------------------------------------------------------

gulp.task('sass', function() {
  return gulp
    .src(sassInput)  // Find all `.scss` files from the `scss/` folder
    // Initializes sourcemaps
    .pipe(sourcemaps.init())
    // Run Sass on those files
    .pipe(sass(sassOptions).on('error', sass.logError))
    // Writes sourcemaps into the CSS file
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest(sassOutput));
})




// -----------------------------------------------------------------------------
// Sass documentation generation
// -----------------------------------------------------------------------------
gulp.task('sassdoc', function () {
  return gulp
    .src(sassInput)
    .pipe(sassdoc())
    .resume();
});




// -----------------------------------------------------------------------------
// Watchers
// -----------------------------------------------------------------------------

// Watch scss folder for changes
gulp.task('watch', function() {
  return gulp
    // Watches the scss folder for all .scss and .sass files
    // If any file changes, run the sass task
    .watch(sassInput, ['sass'])
    // When there is a change,
    // Log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
})




// -----------------------------------------------------------------------------
// BrowserSync  -- Static Server mode
// -----------------------------------------------------------------------------

/*
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

*/


// -----------------------------------------------------------------------------
// Production build
// -----------------------------------------------------------------------------

gulp.task('prod', ['sassdoc'], function () {
  return gulp
    .src(sassInput)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(sassOutput));
});




// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------
gulp.task('default', ['sass', 'watch' /*, possible other tasks... */]);